<template>
  <div class="dashboard-container">
    <header class="header">
      <div class="now-time">{{ currentTime }}</div>
      <h1 class="title">智慧养老院数据监控中心</h1>
    </header>

    <main class="main-content">
      <PanelColumn>
        <DataCard class="stat-grid">
          <div class="stat-item" v-for="item in stats" :key="item.label">
            <span class="label">{{ item.label }}</span>
            <span class="value" :class="{ 'warning': item.warning }">{{ item.value }}</span>
          </div>
        </DataCard>

        <DataCard title="体征数据异常趋势">
          <div ref="lineChartRef" class="chart-box"></div>
        </DataCard>

        <DataCard title="今日活动完成率">
          <div ref="gaugeChartRef" class="chart-box-small"></div>
        </DataCard>

        <DataCard title="今日警报类型分布">
          <div ref="pieChartRef" class="chart-box-small"></div>
        </DataCard>
      </PanelColumn>

      <PanelColumn>
        <div class="video-container">
          <div class="video-header">
            <span class="live-tag">LIVE</span> 实时监控：A区大厅
          </div>
          <div class="video-placeholder">
            <div class="scanning-line"></div>
            <div class="video-overlay-info">1080P | H.265 | 30FPS</div>
          </div>
        </div>

        <div class="map-container">
          <div id="amap-container"></div>
          <div class="map-overlay">
            <div class="map-status">
              <span class="dot"></span> 电子围栏监控：活跃
            </div>
          </div>
        </div>
      </PanelColumn>

      <PanelColumn>

        <DataCard title="实时监测预警">
          <div class="alert-list">
            <div v-for="item in jcyjData" :key="item.id" class="alert-item">
              <div class="alert-header">
                <span class="alert-type">{{ item.title }}</span>
                <span class="alert-name">{{ item.name }}</span>
              </div>
              <p class="alert-addr">{{ item.address }}</p>
              <p class="alert-time">{{ item.time }}</p>
            </div>
          </div>
        </DataCard>
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
        <DataCard title="智能设备状态">
          <div class="device-status">
            <div class="device-item">
              <p>在线设备</p>
              <h2 style="color: #00f2ff">128</h2>
            </div>
            <div class="device-item">
              <p>异常故障</p>
              <h2 style="color: #ff4d4f">2</h2>
            </div>
          </div>
        </DataCard>
      </PanelColumn>
    </main>
  </div>
</template>

<script setup lang="ts">
import PanelColumn from '@/components/PanelColumn.vue';
import DataCard from '@/components/DataCard.vue';
import * as echarts from 'echarts';
import AMapLoader from '@amap/amap-jsapi-loader';

const currentTime = ref(new Date().toLocaleString());
setInterval(() => { currentTime.value = new Date().toLocaleString(); }, 1000);

// --- 模拟数据 (恢复之前的版本) ---
const stats = ref([
  { label: '老年人总数', value: '156' },
  { label: '管理员总数', value: '12' },
  { label: '监护人总数', value: '240' },
  { label: '体征异常人数', value: '5', warning: true },
]);

const dzwlData = ref([
  { id: 1, name: '王秀英', time: '13:00:01', lnglat: [116.3974, 39.9092] },
  { id: 2, name: '李大爷', time: '14:20:05', lnglat: [116.3980, 39.9100] },
  { id: 3, name: '张婆婆', time: '15:10:32', lnglat: [116.3965, 39.9085] },
]);

const jcyjData = ref([
  { id: 1, title: '检测到跌倒', name: '王秀英', address: '5号楼3单元301', time: '13:00:01' },
  { id: 2, title: '检测到烟雾', name: '李明', address: '8号楼3单元201', time: '13:15:20' },
  { id: 3, title: '心率异常', name: '刘志强', address: '8号楼2单元202', time: '13:45:10' },
]);

const lineChartRef = ref(null);
const pieChartRef = ref(null);
const gaugeChartRef = ref(null);
const map = shallowRef(null);
let charts: echarts.ECharts[] = [];

const initMap = () => {
  window._AMapSecurityConfig = { securityJsCode: import.meta.env.VITE_AMAP_SECURITY };
  AMapLoader.load({ key: import.meta.env.VITE_AMAP_KEY, version: '2.0' }).then((AMap) => {
    map.value = new AMap.Map('amap-container', {
      viewMode: '3D', pitch: 45, zoom: 17, center: [116.3974, 39.9092], theme: 'amap://styles/darkblue'
    });
    const polygon = new AMap.Polygon({
      path: [[116.397, 39.911], [116.399, 39.911], [116.401, 39.909], [116.398, 39.907]],
      strokeColor: '#00f2ff', fillColor: '#00f2ff', fillOpacity: 0.1, strokeStyle: 'dashed'
    });
    map.value.add(polygon);
  });
};

const focusElder = (lnglat) => { if (map.value) map.value.setZoomAndCenter(18, lnglat, false, 500); };

const initCharts = () => {
  // 趋势图
  const line = echarts.init(lineChartRef.value);
  line.setOption({
    grid: { top: 30, bottom: 20, left: 30, right: 10 },
    xAxis: { type: 'category', data: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'], axisLabel: { color: '#ccc', fontSize: 10 } },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: '#222' } }, axisLabel: { color: '#ccc' } },
    series: [{ data: [2, 5, 3, 8, 4, 5], type: 'line', smooth: true, itemStyle: { color: '#00f2ff' }, areaStyle: { color: 'rgba(0,242,255,0.2)' } }]
  });

  // --- 2. 仪表盘 (优化：减小半径，精简刻度) ---
  const gauge = echarts.init(gaugeChartRef.value);
  gauge.setOption({
    series: [{
      type: 'gauge',
      radius: '110%',          // 关键：从 95% 缩小到 80%，留出边距
      center: ['50%', '55%'],  // 关键：稍微上移，防止底部文字溢出
      startAngle: 210,
      endAngle: -30,
      splitNumber: 5,          // 减少大刻度数量
      progress: { show: true, width: 8, itemStyle: { color: '#00f2ff' } },
      axisLine: { lineStyle: { width: 8, color: [[1, 'rgba(0,242,255,0.1)']] } },
      axisTick: { show: false }, // 隐藏小刻度，更清爽
      splitLine: { length: 10, distance: -3, lineStyle: { color: '#fff', width: 1 } },
      axisLabel: { distance: 12, color: '#666', fontSize: 10 }, // 调小文字
      detail: {
        valueAnimation: true,
        formatter: '{value}%',
        color: '#00f2ff',
        fontSize: 16,
        offsetCenter: [0, '40%']
      },
      data: [{ value: 85, name: '' }]
    }]
  });

  // 饼图
  const pie = echarts.init(pieChartRef.value);
  pie.setOption({
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(5, 13, 25, 0.9)',
      borderColor: '#00f2ff',
      textStyle: { color: '#fff' }
    },
    legend: {
      orient: 'vertical',
      right: '5%',
      top: 'center',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: '#ccc', fontSize: 10 }
    },
    series: [{
      name: '警报类型',
      type: 'pie',
      // 这里的 radius 第一个参数是内圆，第二个是外圆，形成环形感
      radius: ['50%', '80%'],
      // 这里的 center 第一个参数是水平位置，第二个是垂直位置
      center: ['35%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 4,
        borderColor: '#050d19',
        borderWidth: 2
      },
      label: {
        show: false, // 侧边栏窄，建议隐藏线上文字，改用 Legend
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 12,
          fontWeight: 'bold',
          color: '#00f2ff'
        }
      },
      labelLine: { show: false },
      data: [
        { value: 10, name: '跌倒警报', itemStyle: { color: '#ff4d4f' } },
        { value: 5, name: '围栏警报', itemStyle: { color: '#ffa940' } },
        { value: 20, name: '心率预警', itemStyle: { color: '#00f2ff' } }
      ]
    }]
  });
  charts.push(line, gauge, pie);
};

onMounted(async () => {
  await nextTick();
  initMap();
  initCharts();
  window.addEventListener('resize', () => charts.forEach(c => c.resize()));
});

onUnmounted(() => {
  charts.forEach(c => c.dispose());
  if (map.value) map.value.destroy();
});
</script>

<style scoped lang="scss">
.dashboard-container {
  background: #050d19;
  color: #fff;
  min-height: 100vh;
  padding: 10px;
  font-family: sans-serif;
  overflow: hidden;
}

.header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #1a2a44, transparent);
}

.title {
  font-size: 26px;
  color: #00f2ff;
  letter-spacing: 4px;
  text-shadow: 0 0 10px rgba(0, 242, 255, 0.5);
}

.now-time {
  position: absolute;
  left: 20px;
  color: #00f2ff;
  letter-spacing: 2px;
  font-size: 16px;
}

.main-content {
  display: grid;
  grid-template-columns: 320px 1fr 320px;
  gap: 15px;
  height: calc(100vh - 90px);
  margin-top: 10px;
}

/* 统计项样式 */
.stat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.stat-item {
  background: rgba(0, 242, 255, 0.1);
  padding: 10px;
  text-align: center;

  .value {
    font-size: 22px;
    font-weight: bold;
    color: #00f2ff;
    display: block;

    &.warning {
      color: #ff4d4f;
    }
  }
}


.chart-box {
  height: 140px;
}

.chart-box-small {
  height: 160px;
}

.video-container {
  height: 40%;
  background: #000;
  border: 1px solid #1a2a44;
  position: relative;
  overflow: hidden;
}

.video-header {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 5;
  font-size: 12px;
}

.live-tag {
  background: #ff4d4f;
  padding: 2px 5px;
  border-radius: 2px;
  animation: blink 1.5s infinite;
  margin-right: 5px;
}

.video-placeholder {
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, #1a2a44, #000);
}

.scanning-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background: rgba(0, 242, 255, 0.4);
  animation: scan 4s linear infinite;
}

.video-overlay-info {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 10px;
  color: #666;
}

.map-container {
  flex: 1;
  position: relative;
  border: 1px solid rgba(0, 242, 255, 0.3);
}

#amap-container {
  width: 100%;
  height: 100%;
}

.map-overlay {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
}

.map-status {
  background: rgba(5, 13, 25, 0.8);
  padding: 5px 12px;
  border: 1px solid #00f2ff;
  font-size: 12px;
  color: #00f2ff;
}

.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #00f2ff;
  border-radius: 50%;
  box-shadow: 0 0 8px #00f2ff;
  margin-right: 5px;
}

/* 列表样式修复 */
.scroll-list {
  flex: 1;
  overflow-y: auto;
}

.list-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 13px;
}

.tag {
  background: #f5222d;
  padding: 2px 4px;
  border-radius: 2px;
  font-size: 10px;
}

.clickable:hover {
  background: rgba(0, 242, 255, 0.1);
  cursor: pointer;
}

.hint {
  font-size: 10px;
  color: #666;
  text-align: right;
  margin-top: 30px;
}

.alert-list {
  flex: 1;
  overflow-y: auto;
}

.alert-item {
  background: rgba(245, 34, 45, 0.1);
  margin-bottom: 8px;
  padding: 8px;
  border-left: 3px solid #f5222d;
}

.alert-header {
  display: flex;
  justify-content: space-between;
  color: #ff4d4f;
  font-weight: bold;
  font-size: 14px;
}

.alert-addr,
.alert-time {
  font-size: 13px;
  margin: 2px 0;
  color: #ccc;
}

.device-status {
  display: flex;
  justify-content: space-around;
  text-align: center;
}

.device-item h2 {
  margin: 5px 0 0;
}

@keyframes scan {
  from {
    top: 0;
  }

  to {
    top: 100%;
  }
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>