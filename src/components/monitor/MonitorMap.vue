<template>
  <div style="height: 100%;">
    <div class="video-box" v-show="isMonitor">
      <template v-for="index in 4" :key="index">
        <Video />
      </template>
    </div>

    <div v-show="!isMonitor" class="map-container">
      <div id="amap-container"></div>
      <div class="map-overlay">
        <div class="map-status"><span class="dot"></span> 电子围栏监控：活跃</div>
        <div class="map-controls">
          <el-button size="small" type="primary" @click="startRectSelect"
            v-if="!isSelecting && !isFourSelecting">矩形框选</el-button>
          <el-button size="small" type="primary" @click="startFourSelect"
            v-if="!isSelecting && !isFourSelecting">四点围栏</el-button>
          <el-button size="small" type="success" @click="confirmRect" v-if="isSelecting">保存</el-button>
          <el-button size="small" type="warning" @click="cancelRect" v-if="isSelecting">取消</el-button>
          <el-button size="small" type="success" @click="confirmFour" v-if="isFourSelecting">保存</el-button>
          <el-button size="small" type="warning" @click="cancelFour" v-if="isFourSelecting">取消</el-button>
        </div>
      </div>
    </div>

    <teleport v-if="hasTeleportTarget" to="#geofence-records-target">
      <DataCard title="电子围栏实时记录">
        <div class="scroll-list">
          <div v-for="item in dzwlData" :key="item.id" class="list-item clickable" @click="focusElder(item.lnglat)">
            <span class="tag">越界</span>
            <span class="name">{{ item.name }}</span>
            <span class="time">{{ item.time }}</span>
          </div>
        </div>
        <p class="hint">点击记录快速定位</p>
      </DataCard>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick, watch } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';
import DataCard from '@/components/DataCard.vue';
import Video from '@/components/Video.vue';

interface DzwlItem { id: number; name: string; time: string; lnglat: [number, number]; }

const props = defineProps<{ isMonitor: boolean; }>();

const map = ref<AMap.Map | null>(null);
const amapLib = ref<any>(null);
const isSelecting = ref(false);
const currentDrawObj = ref<any>(null);
const geofences = ref<any[]>([]);
const hasTeleportTarget = ref(false);
let targetCheckTimer: number | null = null;
let mouseTool: any = null;
const isFourSelecting = ref(false);
const fourMarkers = ref<any[]>([]);
const fourPolygon = ref<any>(null);
let mapClickHandler: any = null;

const dzwlData = ref<DzwlItem[]>([
  { id: 1, name: '王秀英', time: '13:00:01', lnglat: [116.3974, 39.9092] },
  { id: 2, name: '李大爷', time: '14:20:05', lnglat: [116.3980, 39.9100] },
  { id: 3, name: '张婆婆', time: '15:10:32', lnglat: [116.3965, 39.9085] }
]);

const initMap = async () => {
  if (map.value) return;
  const container = document.getElementById('amap-container');
  if (!container) {
    console.warn('Map container div not exist');
    return;
  }

  if (!container.clientWidth || !container.clientHeight) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  if (!container.clientWidth || !container.clientHeight) {
    console.warn('Map container still zero size, postpone init');
    return;
  }

  window._AMapSecurityConfig = { securityJsCode: import.meta.env.VITE_AMAP_SECURITY };
  const AMap = await AMapLoader.load({ key: import.meta.env.VITE_AMAP_KEY, version: '2.0' });
  amapLib.value = AMap;
  map.value = new AMap.Map('amap-container', { viewMode: '3D', pitch: 45, zoom: 17, center: [116.3974, 39.9092], theme: 'amap://styles/darkblue' });
  const polygon = new AMap.Polygon({ path: [[116.397, 39.911], [116.399, 39.911], [116.401, 39.909], [116.398, 39.907]], strokeColor: '#00f2ff', fillColor: '#00f2ff', fillOpacity: 0.1, strokeStyle: 'dashed' });
  map.value?.add(polygon);
};

const startRectSelect = async () => {
  if (!map.value) return;
  isSelecting.value = true;
  if (!amapLib.value) {
    amapLib.value = await AMapLoader.load({ key: import.meta.env.VITE_AMAP_KEY, version: '2.0', plugins: ['AMap.MouseTool'] });
  }
  if (!amapLib.value.MouseTool) {
    await AMapLoader.load({ key: import.meta.env.VITE_AMAP_KEY, version: '2.0', plugins: ['AMap.MouseTool'] });
  }
  mouseTool = new amapLib.value.MouseTool(map.value);
  mouseTool.on('draw', (e: any) => { currentDrawObj.value = e.obj; });
  mouseTool.rectangle();
};

const confirmRect = () => {
  if (!currentDrawObj.value || !map.value) return;
  const path = currentDrawObj.value.getPath ? currentDrawObj.value.getPath() : null;
  if (path) {
    const polygon = new amapLib.value.Polygon({ path, strokeColor: '#ffae00', fillColor: '#ffae00', fillOpacity: 0.15 });
    map.value.add(polygon);
    geofences.value.push({ polygon, path });
  }
  if (currentDrawObj.value && currentDrawObj.value.close) currentDrawObj.value.close();
  if (mouseTool && mouseTool.close) mouseTool.close();
  currentDrawObj.value = null;
  isSelecting.value = false;
};

const cancelRect = () => {
  if (mouseTool && mouseTool.close) mouseTool.close();
  if (currentDrawObj.value && currentDrawObj.value.setMap) currentDrawObj.value.setMap(null);
  currentDrawObj.value = null;
  isSelecting.value = false;
};

const getLngLatFromEvent = (e: any) => {
  if (!e) return null;
  if (e.lnglat) {
    const ll = e.lnglat;
    return Array.isArray(ll) ? ll : [ll.lng ?? ll.getLng?.(), ll.lat ?? ll.getLat?.()];
  }
  if (e.lng && e.lat) return [e.lng, e.lat];
  return null;
};

const startFourSelect = async () => {
  if (!map.value) return;
  isFourSelecting.value = true;
  if (!amapLib.value) { amapLib.value = await AMapLoader.load({ key: import.meta.env.VITE_AMAP_KEY, version: '2.0' }); }
  cleanupFourTemp();
  mapClickHandler = (e: any) => {
    const lnglat = getLngLatFromEvent(e) as [number, number];
    if (!lnglat) return;
    addFourMarker(lnglat);
  };
  try { map.value.on('click', mapClickHandler); } catch (err) { }
};

const addFourMarker = (lnglat: [number, number]) => {
  if (!amapLib.value || !map.value || fourMarkers.value.length >= 4) return;
  const marker = new amapLib.value.Marker({ position: lnglat, draggable: true });
  marker.setMap(map.value);
  marker.on('dragend', () => updateFourPolygon());
  fourMarkers.value.push(marker);
  updateFourPolygon();
  if (fourMarkers.value.length === 4) { try { map.value.off('click', mapClickHandler); } catch (err) { } mapClickHandler = null; }
};

const updateFourPolygon = () => {
  if (!map.value) return;
  const path = fourMarkers.value.map(m => {
    const p = m.getPosition ? m.getPosition() : (m.getLngLat ? m.getLngLat() : null);
    if (!p) return null;
    return Array.isArray(p) ? p : [p.lng ?? p.getLng?.(), p.lat ?? p.getLat?.()];
  }).filter(Boolean) as [number, number][];
  if (!path.length) return;
  if (!fourPolygon.value) {
    fourPolygon.value = new amapLib.value.Polygon({ path, strokeColor: '#00ff88', fillColor: '#00ff88', fillOpacity: 0.12 });
    map.value.add(fourPolygon.value);
  } else {
    fourPolygon.value.setPath(path);
  }
};

const confirmFour = () => {
  if (!fourPolygon.value || !map.value) return;
  const path = fourPolygon.value.getPath ? fourPolygon.value.getPath() : null;
  if (path) {
    const polygon = new amapLib.value.Polygon({ path, strokeColor: '#ff4d4f', fillColor: '#ff4d4f', fillOpacity: 0.12 });
    map.value.add(polygon);
    geofences.value.push({ polygon, path });
  }
  cleanupFourTemp();
  isFourSelecting.value = false;
};

const cancelFour = () => { cleanupFourTemp(); isFourSelecting.value = false; };

const cleanupFourTemp = () => {
  try { if (map.value && mapClickHandler) map.value.off('click', mapClickHandler); } catch (err) { }
  mapClickHandler = null;
  fourMarkers.value.forEach(m => { try { m.setMap(null); } catch (e) { } });
  fourMarkers.value = [];
  if (fourPolygon.value) { try { fourPolygon.value.setMap(null); } catch (e) { } }
  fourPolygon.value = null;
};

const focusElder = (lnglat: [number, number] | null) => {
  if (!map.value || !lnglat || lnglat.length < 2) return;
  map.value.setZoomAndCenter(18, lnglat, false, 500);
};

onMounted(async () => {
  hasTeleportTarget.value = !!document.getElementById('geofence-records-target');
  targetCheckTimer = window.setInterval(() => {
    if (document.getElementById('geofence-records-target')) {
      hasTeleportTarget.value = true;
      if (targetCheckTimer !== null) window.clearInterval(targetCheckTimer);
    }
  }, 100);

  await nextTick();
  if (!props.isMonitor) {
    await initMap();
  }
});

watch(() => props.isMonitor, async (value) => {
  if (!value) {
    await nextTick();
    await initMap();
  }
});

onUnmounted(() => {
  if (targetCheckTimer !== null) window.clearInterval(targetCheckTimer);
  cleanupFourTemp();
  if (mouseTool && mouseTool.close) mouseTool.close();
  if (map.value) map.value.destroy();
});
</script>

<style lang="scss" scoped>
.video-box {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.map-container {
  height: 100%;
  flex: 1;
  position: relative;
  border: 1px solid rgba(0, 242, 255, 0.3);

  #amap-container {
    width: 100%;
    height: 100%;
  }

  .map-overlay {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 10;

    .map-status {
      background: rgba(5, 13, 25, 0.8);
      padding: 5px 12px;
      border: 1px solid #00f2ff;
      font-size: 12px;
      color: #00f2ff;
    }
  }
}

/* 列表样式修复 */
.scroll-list {
  flex: 1;
  overflow-y: auto;

  .list-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 13px;

    .tag {
      background: #f5222d;
      padding: 2px 4px;
      border-radius: 2px;
      font-size: 10px;
    }
  }

  .clickable:hover {
    background: rgba(0, 242, 255, 0.1);
    cursor: pointer;
  }
}

.hint {
  font-size: 10px;
  color: #666;
  text-align: right;
  margin-top: 30px;
}
</style>
