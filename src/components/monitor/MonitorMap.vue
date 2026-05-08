<template>
  <div class="monitor-map-container">
    <div class="video-box">
      <video id="v" src="/videos/diedao.webm" autoplay muted />
      <video src="/videos/fire.mp4" autoplay muted style="transform: scaleY(1.2);" />
    </div>

    <div class="map-container">
      <div id="amap-container"></div>
      <div class="map-overlay">
        <div class="map-status"><span class="dot"></span> 电子围栏监控：活跃</div>
        <div class="map-controls">
          <el-button size="small" type="primary" @click="startFourSelect" v-if="!isFourSelecting">四点围栏</el-button>
          <el-button size="small" type="success" @click="confirmFour" v-if="isFourSelecting">保存</el-button>
          <el-button size="small" type="warning" @click="cancelFour" v-if="isFourSelecting">取消</el-button>
        </div>
      </div>
    </div>

    <teleport v-if="hasTeleportTarget" to="#geofence-records-target">
      <DataCard title="电子围栏实时记录">
        <div class=" scroll-list">
          <div v-for="item in dzwlDisplayData" :key="item.id" class="list-item clickable"
            @click="focusElder(item.lnglat)">
            <span class="tag tag--outside">越界</span>
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
import AMapLoader from '@amap/amap-jsapi-loader';
import DataCard from '@/components/DataCard.vue';
import Video from '@/components/Video.vue';
import { useGeofenceStore } from '@/stores/geofence';







interface DzwlItem { id: number; name: string; time: string; lnglat: [number, number]; }

const map = ref<AMap.Map | null>(null);
const amapLib = ref<any>(null);
const geofences = ref<any[]>([]);
const hasTeleportTarget = ref(false);
let targetCheckTimer: number | null = null;
const isFourSelecting = ref(false);
const fourMarkers = ref<any[]>([]);
const fourPolygon = ref<any>(null);
let mapClickHandler: any = null;

const geofenceStore = useGeofenceStore();

const personMarkers = ref<any[]>([]);
const returnRoutes = ref<any[]>([]);
let currentWalking: any = null;

const dzwlData = ref<DzwlItem[]>([
  { id: 1, name: '王秀英', time: '13:00:01', lnglat: [116.3974, 39.9092] },
  { id: 2, name: '李大爷', time: '14:20:05', lnglat: [116.3980, 39.9100] },
  { id: 3, name: '张婆婆', time: '15:10:32', lnglat: [116.3965, 39.9085] }
]);

const dzwlDisplayData = computed<DzwlItem[]>(() => {
  return dzwlData.value.filter(item => !geofenceStore.isInsideFence(item.lnglat));
});

const normalizePoint = (point: any): [number, number] | null => {
  if (!point) return null;
  if (Array.isArray(point) && point.length >= 2) {
    const lng = Number(point[0]);
    const lat = Number(point[1]);
    if (Number.isFinite(lng) && Number.isFinite(lat)) return [lng, lat];
    return null;
  }
  const lng = Number(point.lng ?? point.getLng?.());
  const lat = Number(point.lat ?? point.getLat?.());
  if (!Number.isFinite(lng) || !Number.isFinite(lat)) return null;
  return [lng, lat];
};

const getPathCenter = (path: any[] | null | undefined): [number, number] | null => {
  if (!path?.length) return null;
  const points = path
    .map((p: any) => normalizePoint(p))
    .filter(Boolean) as [number, number][];
  if (!points.length) return null;
  const sum = points.reduce(
    (acc, cur) => [acc[0] + cur[0], acc[1] + cur[1]],
    [0, 0] as [number, number]
  );
  return [sum[0] / points.length, sum[1] / points.length];
};

const toLngLatPath = (path: any[] | null | undefined): [number, number][] => {
  if (!path?.length) return [];
  return path
    .map((p: any) => normalizePoint(p))
    .filter(Boolean) as [number, number][];
};

const getGeofenceCenter = (): [number, number] | null => {
  return geofenceStore.getFenceCenter();
};

const replaceGeofence = (
  path: [number, number][],
  style: { strokeColor: string; fillColor: string; fillOpacity: number; strokeStyle?: string }
) => {
  if (!map.value || !amapLib.value || path.length < 3) return;

  geofences.value.forEach(fence => {
    try {
      fence.polygon?.setMap(null);
    } catch (e) { }
  });
  geofences.value = [];

  const polygon = new amapLib.value.Polygon({ path, ...style });
  map.value.add(polygon);
  geofences.value = [{ polygon, path, center: getPathCenter(path) }];
};

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
  const initialFencePath = [...geofenceStore.fencePoints];
  replaceGeofence(initialFencePath, { strokeColor: '#00f2ff', fillColor: '#00f2ff', fillOpacity: 0.1, strokeStyle: 'dashed' });
  renderPersonMarkers();
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

const clearPersonMarkers = () => {
  personMarkers.value.forEach(m => { try { m.setMap(null); } catch (e) { } });
  personMarkers.value = [];
};

const renderPersonMarkers = () => {
  if (!map.value || !amapLib.value) return;
  clearPersonMarkers();

  const runnerHtml = `
    <div class="person-marker">
      <div class="runner">
        <span class="head"></span>
        <span class="body"></span>
        <span class="leg left"></span>
        <span class="leg right"></span>
      </div>
    </div>
  `;

  dzwlData.value.forEach(item => {
    if (!item.lnglat || item.lnglat.length < 2) return;
    const marker = new amapLib.value.Marker({
      position: item.lnglat,
      content: runnerHtml,
      title: item.name
    });
    marker.setMap(map.value!);
    personMarkers.value.push(marker);
  });
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
    const normalizedPath = toLngLatPath(path);
    if (normalizedPath.length === 4) {
      geofenceStore.setFencePoints(normalizedPath);
      replaceGeofence(normalizedPath, { strokeColor: '#ff4d4f', fillColor: '#ff4d4f', fillOpacity: 0.12 });
    }
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

const clearReturnRoutes = () => {
  returnRoutes.value.forEach(r => { try { r.setMap(null); } catch (e) { } });
  returnRoutes.value = [];
};

const drawReturnRoute = async (from: [number, number]) => {
  if (!map.value || !amapLib.value) return;
  const to = getGeofenceCenter();
  if (!to || to.length < 2) return;

  // 清除之前的路线和路径规划
  clearReturnRoutes();
  if (currentWalking && currentWalking.clear) {
    currentWalking.clear();
    currentWalking = null;
  }

  try {
    // 加载步行路径规划服务
    if (!amapLib.value.Walking) {
      await AMapLoader.load({
        key: import.meta.env.VITE_AMAP_KEY,
        version: '2.0',
        plugins: ['AMap.Walking']
      });
    }

    // 创建步行规划实例
    currentWalking = new amapLib.value.Walking({
      map: map.value,
      panel: false
    });

    // 计算路线
    currentWalking.search(
      new amapLib.value.LngLat(from[0], from[1]),
      new amapLib.value.LngLat(to[0], to[1]),
      (status: string, result: any) => {
        if (status === 'complete' && result.routes && result.routes.length > 0) {
          // 获取第一条路线的路径
          const route = result.routes[0];
          const path = route.steps.map((step: any) => {
            return step.path.map((point: any) => {
              return [point.lng, point.lat];
            });
          }).flat();

          // 绘制路线
          const line = new amapLib.value.Polyline({
            path: path,
            strokeColor: '#52c41a',
            strokeWeight: 3,
            strokeStyle: 'dashed'
          });
          map.value?.add(line);
          returnRoutes.value.push(line);
        }
      }
    );
  } catch (error) {
    console.error('路径规划失败:', error);
    // 失败时绘制直线作为备选
    const line = new amapLib.value.Polyline({
      path: [from, to],
      strokeColor: '#52c41a',
      strokeWeight: 3,
      strokeStyle: 'dashed'
    });
    map.value.add(line);
    returnRoutes.value.push(line);
  }
};

const focusElder = async (lnglat: [number, number] | null) => {
  if (!map.value || !lnglat || lnglat.length < 2) return;
  geofenceStore.setUserCoordinate(lnglat);
  map.value.setZoomAndCenter(18, lnglat, false, 500);
  await drawReturnRoute(lnglat);
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
  await initMap();

  const v = document.getElementById('v');
  // 两分12到两分22
  const start = 120 + 12, end = 120 + 22;
  // 初始跳转到开始时间
  v.currentTime = start;

  // 监听播放，超出范围就暂停/循环
  v.addEventListener('timeupdate', () => {
    if (v.currentTime >= end) {
      v.pause();         // 到点暂停
      v.currentTime = start; // 如需循环，打开这行
    }
  });
});

onUnmounted(() => {
  if (targetCheckTimer !== null) window.clearInterval(targetCheckTimer);
  cleanupFourTemp();
  clearReturnRoutes();
  if (map.value) map.value.destroy();
});
</script>

<style lang="scss" scoped>
.monitor-map-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 10px;
}

.video-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  flex: 1;
  overflow: hidden;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 1px solid var(--video-border);
    border-radius: 8px;
    box-shadow: var(--video-shadow);
  }
}

.map-container {
  flex: 1;
  position: relative;
  border: 1px solid var(--map-border);
  border-radius: 8px;
  box-shadow: var(--map-shadow);

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
      background: var(--map-status-bg);
      padding: 5px 12px;
      border: 1px solid var(--map-status-border);
      border-radius: 4px;
      font-size: 12px;
      color: var(--map-status-text);
      text-shadow: 0 0 10px var(--map-status-shadow);
    }
  }

  $person-color: #ff0000;

  /* 地图人物跑步动画（Marker 内容在 map 容器外，需用 :deep() 让样式生效） */
  :deep(.person-marker) {
    width: 28px;
    height: 36px;
    transform: translate(-50%, -100%);
    pointer-events: none;
  }

  :deep(.person-marker .runner) {
    position: relative;
    width: 100%;
    height: 100%;
    animation: run 0.6s steps(2) infinite;
  }

  :deep(.person-marker .head) {
    position: absolute;
    top: 0;
    left: 50%;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: $person-color;
    transform: translateX(-50%);
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.25);
  }

  :deep(.person-marker .body) {
    position: absolute;
    top: 10px;
    left: 50%;
    width: 6px;
    height: 12px;
    background: $person-color;
    transform: translateX(-50%);
    border-radius: 3px;
  }

  :deep(.person-marker .leg) {
    position: absolute;
    bottom: 0;
    width: 4px;
    height: 12px;
    background: $person-color;
    border-radius: 2px;
    transform-origin: top;
  }

  :deep(.person-marker .leg.left) {
    left: 30%;
    animation: leg-left 0.6s ease-in-out infinite;
  }

  :deep(.person-marker .leg.right) {
    left: 60%;
    animation: leg-right 0.6s ease-in-out infinite;
  }

  @keyframes leg-left {
    0% {
      transform: rotate(25deg);
    }

    50% {
      transform: rotate(-25deg);
    }

    100% {
      transform: rotate(25deg);
    }
  }

  @keyframes leg-right {
    0% {
      transform: rotate(-25deg);
    }

    50% {
      transform: rotate(25deg);
    }

    100% {
      transform: rotate(-25deg);
    }
  }

  @keyframes run {

    0%,
    100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-2px);
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
    border-bottom: 1px solid var(--list-border);
    font-size: 13px;
    color: var(--list-text);

    .tag {
      padding: 2px 4px;
      border-radius: 2px;
      font-size: 10px;
    }

    .tag--outside {
      background: #f5222d;
      color: #fff;
    }

  }

  .clickable:hover {
    background: var(--list-hover);
    cursor: pointer;
  }
}

.hint {
  font-size: 10px;
  color: var(--hint-color);
  text-align: right;
  margin-top: 30px;
}
</style>
