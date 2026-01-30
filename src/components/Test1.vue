<template>
  <div class="dashboard-container">
    <header class="header">
      <div class="now-time">{{ currentTime }}</div>
      <h1 class="title">智慧养老院数据监控中心</h1>
    </header>

    <main class="main-content">
      <section class="panel-column">
        <div class="data-card stat-grid">
          <div class="stat-item" v-for="item in stats" :key="item.label">
            <span class="label">{{ item.label }}</span>
            <span class="value" :class="{ 'warning': item.warning }">{{ item.value }}</span>
          </div>
        </div>

        <div class="data-card">
          <h3 class="card-title">体征数据异常趋势</h3>
          <div ref="lineChartRef" class="chart-box"></div>
        </div>

        <div class="data-card">
          <h3 class="card-title">电子围栏实时记录</h3>
          <div class="scroll-list">
            <div v-for="item in dzwlData" :key="item.id" class="list-item">
              <span class="tag">越界</span>
              <span class="name">{{ item.name }}</span>
              <span class="time">{{ item.time }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="panel-column center-column">
        <div class="video-container">
          <div class="video-placeholder">
            <div class="video-overlay">区域 A-01 实时监控 (模拟)</div>
            <div class="scanning-line"></div>
          </div>
        </div>

        <div class="data-card">
          <h3 class="card-title">今日警报类型分布</h3>
          <div ref="pieChartRef" class="chart-box"></div>
        </div>
      </section>

      <section class="panel-column">
        <div class="data-card">
          <h3 class="card-title">实时监测预警</h3>
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
        </div>

        <div class="data-card">
          <h3 class="card-title">今日活动完成率</h3>
          <div ref="gaugeChartRef" class="chart-box"></div>
        </div>

        <div class="data-card">
          <h3 class="card-title">智能设备状态</h3>
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
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';

// 响应式数据
const currentTime = ref(new Date().toLocaleString());
setInterval(() => {
  currentTime.value = new Date().toLocaleString();
}, 1000);

const stats = ref([
  { label: '老年人总数', value: '156' },
  { label: '管理员总数', value: '12' },
  { label: '监护人总数', value: '240' },
  { label: '体征异常人数', value: '5', warning: true },
]);

// 初始数据
const dzwlData = ref([
  { id: 1, name: '王秀英', time: '13:00:01' },
  { id: 2, name: '李大爷', time: '14:20:05' },
  { id: 3, name: '张婆婆', time: '15:10:32' },
]);

const jcyjData = ref([
  { id: 1, title: '检测到跌倒', name: '王秀英', address: '5号楼3单元301', time: '13:00:01' },
  { id: 2, title: '检测到烟雾', name: '李明', address: '8号楼3单元201', time: '13:15:20' },
  { id: 3, title: '心率异常', name: '刘志强', address: '8号楼2单元202', time: '13:45:10' },
]);

// 图表实例引用
const lineChartRef = ref(null);
const pieChartRef = ref(null);
const gaugeChartRef = ref(null);

onMounted(() => {
  initLineChart();
  initPieChart();
  initGaugeChart();
});

const initLineChart = () => {
  const chart = echarts.init(lineChartRef.value);
  chart.setOption({
    grid: { top: 30, bottom: 30, left: 40, right: 10 },
    xAxis: { type: 'category', data: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'], axisLabel: { color: '#ccc' } },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: '#222' } }, axisLabel: { color: '#ccc' } },
    series: [{
      data: [2, 5, 3, 8, 4, 5],
      type: 'line',
      smooth: true,
      itemStyle: { color: '#00f2ff' },
      areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(0,242,255,0.3)' }, { offset: 1, color: 'transparent' }]) }
    }]
  });
};

const initPieChart = () => {
  const chart = echarts.init(pieChartRef.value);
  chart.setOption({
    tooltip: { trigger: 'item' },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      data: [
        { value: 10, name: '跌倒警报', itemStyle: { color: '#ff4d4f' } },
        { value: 5, name: '围栏警报', itemStyle: { color: '#ffa940' } },
        { value: 20, name: '心率预警', itemStyle: { color: '#00f2ff' } }
      ],
      label: { color: '#fff' }
    }]
  });
};

const initGaugeChart = () => {
  const chart = echarts.init(gaugeChartRef.value);
  chart.setOption({
    series: [{
      type: 'gauge',
      radius: '90%', // 适当缩小半径，留出边距
      center: ['50%', '55%'], // 中心点稍微下移
      startAngle: 200,
      endAngle: -20,
      splitNumber: 5, // 减少大刻度数量，避免拥挤
      progress: {
        show: true,
        width: 12,
        itemStyle: { color: '#00f2ff' }
      },
      axisLine: {
        lineStyle: { width: 12, color: [[1, 'rgba(0,242,255,0.1)']] }
      },
      axisTick: { show: false }, // 隐藏小刻度，防止视觉混乱
      splitLine: {
        distance: 6, // 刻度线向内缩
        length: 5,
        lineStyle: { color: '#fff', width: 2 }
      },
      axisLabel: {
        distance: 18, // 标签距离圆环的距离
        color: '#ccc',
        fontSize: 10
      },
      anchor: { show: false },
      title: { show: false }, // 隐藏原本的标题，改用下面的 detail
      detail: {
        valueAnimation: true,
        formatter: '{value}%',
        color: '#00f2ff',
        fontSize: 24,
        fontWeight: 'bold',
        offsetCenter: [0, '30%'] // 关键：将数字下移，避开指针中心
      },
      data: [{ value: 85 }]
    }]
  });
};
</script>

<style scoped>
.dashboard-container {
  background: #050d19;
  color: #fff;
  min-height: 100vh;
  padding: 10px;
  font-family: 'PingFang SC', sans-serif;
  overflow: hidden;
}

.header {
  height: 60px;
  background: linear-gradient(to bottom, #1a2a44 0%, transparent 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 20px;
}

.title {
  font-size: 28px;
  letter-spacing: 4px;
  color: #00f2ff;
  text-shadow: 0 0 10px rgba(0, 242, 255, 0.5);
}

.now-time {
  position: absolute;
  left: 20px;
  font-size: 16px;
  color: #00f2ff;
  font-family: monospace;
}

.main-content {
  display: grid;
  grid-template-columns: 350px 1fr 350px;
  gap: 15px;
  height: calc(100vh - 100px);
}

.panel-column {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.data-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 242, 255, 0.2);
  padding: 15px;
  border-radius: 4px;
  position: relative;
}

.card-title {
  font-size: 16px;
  margin-bottom: 12px;
  color: #fff;
  border-left: 4px solid #00f2ff;
  padding-left: 10px;
}

.stat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.stat-item {
  background: rgba(0, 242, 255, 0.1);
  padding: 10px;
  text-align: center;
}

.stat-item .label {
  font-size: 12px;
  display: block;
  color: #ccc;
}

.stat-item .value {
  font-size: 22px;
  font-weight: bold;
  color: #00f2ff;
}

.stat-item .value.warning {
  color: #ff4d4f;
}

.chart-box {
  height: 180px;
}

.video-container {
  height: 400px;
  background: #000;
  border: 2px solid #1a2a44;
  position: relative;
  overflow: hidden;
}

.video-placeholder {
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, #1a2a44 0%, #000 100%);
}

.video-overlay {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.5);
  padding: 4px 8px;
  font-size: 12px;
}

.scanning-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background: rgba(0, 242, 255, 0.5);
  top: 0;
  animation: scan 3s linear infinite;
}

@keyframes scan {
  from {
    top: 0;
  }

  to {
    top: 100%;
  }
}

.scroll-list .list-item {
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
}

.alert-addr {
  font-size: 12px;
  color: #aaa;
  margin: 4px 0;
}

.alert-time {
  font-size: 11px;
  color: #666;
}

.device-status {
  display: flex;
  justify-content: space-around;
  text-align: center;
}
</style>