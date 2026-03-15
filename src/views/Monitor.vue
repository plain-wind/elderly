<template>
  <div class="dashboard-container">
    <header class="header">
      <div class="now-time">{{ currentTime }}</div>
      <h1 class="title">智护银龄数据监控中心</h1>
      <button
        style="position: absolute; right: 30px; padding: 10px; background-color: rgb(0, 155, 171); color: #fff; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;"
        @click="isMonitor = !isMonitor">
        {{ isMonitor ? '切换到地图' : '切换到监控' }}
      </button>
    </header>

    <main class="main-content">
      <PanelColumn>
        <MonitorStats :stats="stats" />
        <MonitorCharts />
      </PanelColumn>

      <PanelColumn>
        <MonitorMap :isMonitor="isMonitor" />
      </PanelColumn>

      <PanelColumn>
        <MonitorAlerts :jcyjData="jcyjData" />
      </PanelColumn>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PanelColumn from '@/components/PanelColumn.vue';
import MonitorStats from '@/components/monitor/MonitorStats.vue';
import MonitorCharts from '@/components/monitor/MonitorCharts.vue';
import MonitorMap from '@/components/monitor/MonitorMap.vue';
import MonitorAlerts from '@/components/monitor/MonitorAlerts.vue';

const currentTime = ref(new Date().toLocaleString());
setInterval(() => { currentTime.value = new Date().toLocaleString(); }, 1000);

const isMonitor = ref(true);

const stats = ref([
  { label: '老年人总数', value: '156' },
  { label: '管理员总数', value: '12' },
  { label: '监护人总数', value: '240' },
  { label: '体征异常人数', value: '5', warning: true }
]);

const jcyjData = ref([
  { id: 1, title: '检测到跌倒', name: '王秀英', address: '5号楼3单元301', time: '13:00:01' },
  { id: 2, title: '检测到烟雾', name: '李明', address: '8号楼3单元201', time: '13:15:20' },
  { id: 3, title: '心率异常', name: '刘志强', address: '8号楼2单元202', time: '13:45:10' }
]);
</script>

<style scoped lang="scss">
.dashboard-container {
  background: #050d19;
  color: #fff;
  min-height: 100vh;
  padding: 10px;
  font-family: sans-serif;
  overflow: hidden;

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
}

.chart-box {
  height: 160px;
}

.chart-box-small {
  height: 180px;
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
</style>
