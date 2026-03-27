<template>
  <div class="dashboard-container" :class="`theme-${theme}`">
    <header class="header">
      <div class="now-time">{{ currentTime }}</div>
      <h1 class="title">智护银龄数据监控中心</h1>
      <div class="header-actions">
        <button class="switch-btn" @click="toggleTheme">
          {{ theme === 'bright' ? '切换暗色主题' : '切换亮蓝主题' }}
        </button>
        <button class="switch-btn" @click="isMonitor = !isMonitor">
          {{ isMonitor ? '切换到地图' : '切换到监控' }}
        </button>
      </div>
    </header>

    <main class="main-content">
      <PanelColumn>
        <MonitorStats :stats="stats" />
        <MonitorCharts :theme="theme" />
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

type ThemeMode = 'bright' | 'dark';

const currentTime = ref(new Date().toLocaleString());
setInterval(() => { currentTime.value = new Date().toLocaleString(); }, 1000);

const isMonitor = ref(true);
const savedTheme = localStorage.getItem('monitor-theme');
const theme = ref<ThemeMode>(savedTheme === 'dark' ? 'dark' : 'bright');

const toggleTheme = () => {
  theme.value = theme.value === 'bright' ? 'dark' : 'bright';
  localStorage.setItem('monitor-theme', theme.value);
};

const stats = ref([
  { label: '老年人总数', value: '156' },
  { label: '管理员总数', value: '1' },
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
  --dashboard-bg: radial-gradient(circle at 50% -10%, rgba(115, 194, 255, 0.24), transparent 45%), linear-gradient(180deg, #0c2a88 0%, #0a2375 35%, #07195a 100%);
  --dashboard-text: #d9eeff;
  --grid-line: rgba(124, 183, 255, 0.08);
  --grid-opacity: 0.28;
  --center-glow: rgba(111, 225, 255, 0.14);
  --header-border: rgba(146, 209, 255, 0.55);
  --header-bg: linear-gradient(180deg, rgba(79, 155, 255, 0.35) 0%, rgba(30, 91, 206, 0.18) 100%);
  --header-shadow: inset 0 0 30px rgba(86, 167, 255, 0.25), 0 8px 24px rgba(3, 17, 62, 0.35);
  --title-color: #e9f7ff;
  --title-shadow: rgba(146, 209, 255, 0.85);
  --time-color: #8fd1ff;
  --switch-bg: linear-gradient(180deg, rgba(84, 184, 255, 0.88), rgba(35, 119, 233, 0.95));
  --switch-color: #ecf8ff;
  --switch-border: rgba(174, 226, 255, 0.8);
  --switch-shadow: rgba(98, 193, 255, 0.4);
  --dot-color: #81d9ff;
  --dot-shadow: 0 0 8px #81d9ff;

  --card-bg: linear-gradient(180deg, rgba(12, 45, 132, 0.72), rgba(5, 26, 91, 0.76));
  --card-border: rgba(170, 224, 255, 0.62);
  --card-shadow: inset 0 0 30px rgba(66, 154, 255, 0.22), 0 14px 28px rgba(2, 11, 44, 0.45);
  --card-corner: rgba(198, 238, 255, 0.96);
  --card-title: #f1fbff;
  --card-title-bar: #9de1ff;
  --card-title-shadow: rgba(161, 226, 255, 0.7);

  --stats-item-bg: linear-gradient(180deg, rgba(109, 187, 255, 0.32), rgba(47, 117, 226, 0.26));
  --stats-item-border: rgba(186, 231, 255, 0.52);
  --stats-item-shadow: inset 0 0 14px rgba(175, 229, 255, 0.22);
  --stats-label: #dbf1ff;
  --stats-value: #d8f4ff;
  --stats-value-shadow: rgba(173, 233, 255, 0.9);
  --warning-color: #ff9a73;

  --alert-item-bg: linear-gradient(180deg, rgba(255, 167, 117, 0.22), rgba(255, 127, 90, 0.16));
  --alert-item-border: rgba(255, 191, 155, 0.46);
  --alert-left-border: #ff8f61;
  --alert-item-hover: rgba(255, 151, 108, 0.32);
  --alert-header: #ffb089;
  --alert-text: #ffeadf;

  --device-item-bg: linear-gradient(180deg, rgba(120, 190, 255, 0.28), rgba(35, 98, 208, 0.26));
  --device-item-border: rgba(180, 228, 255, 0.5);
  --device-item-shadow: inset 0 0 12px rgba(182, 231, 255, 0.2);
  --device-label: #d7edff;
  --device-value: #e0f6ff;
  --device-value-shadow: rgba(182, 237, 255, 0.95);

  --map-border: rgba(176, 229, 255, 0.58);
  --map-shadow: inset 0 0 30px rgba(96, 183, 255, 0.2), 0 10px 22px rgba(3, 18, 66, 0.35);
  --map-status-bg: rgba(7, 30, 95, 0.84);
  --map-status-border: rgba(191, 235, 255, 0.88);
  --map-status-text: #e8f8ff;
  --map-status-shadow: rgba(170, 232, 255, 0.8);
  --list-border: rgba(166, 223, 255, 0.34);
  --list-text: #eef9ff;
  --list-hover: rgba(139, 213, 255, 0.24);
  --hint-color: #b8ddff;

  --video-bg: radial-gradient(circle at 50% 30%, #0f348a, #041245 72%);
  --video-border: rgba(177, 227, 255, 0.58);
  --video-shadow: inset 0 0 28px rgba(107, 195, 255, 0.2), 0 10px 20px rgba(2, 16, 53, 0.36);
  --video-placeholder: radial-gradient(circle, #3a7be0 5%, #0d2f8c 42%, #030f39 100%);
  --video-line: rgba(137, 219, 255, 0.5);
  --video-line-shadow: rgba(137, 219, 255, 0.7);
  --video-info: #d7f0ff;
  --video-info-shadow: rgba(167, 228, 255, 0.7);

  --chart-axis: #aedbff;
  --chart-line-color: rgba(134, 193, 255, 0.4);
  --chart-split: rgba(140, 192, 255, 0.18);
  --chart-name: #95cbff;
  --chart-line: #6fe1ff;
  --chart-area: rgba(111, 225, 255, 0.2);
  --chart-bar-start: #83deff;
  --chart-bar-end: #246dd6;
  --chart-pie-1: #73d8ff;
  --chart-pie-2: #4cc6ff;
  --chart-pie-3: #5c96ff;
  --chart-label: #e2f5ff;

  position: relative;
  background: var(--dashboard-bg);
  color: var(--dashboard-text);
  min-height: 100vh;
  padding: 10px 12px 12px;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
  overflow: hidden;

  &.theme-dark {
    --dashboard-bg: radial-gradient(circle, #1a2a44, #000);
    --dashboard-text: #b7d8e4;
    --grid-line: rgba(0, 242, 255, 0.04);
    --grid-opacity: 0.06;
    --center-glow: transparent;
    --header-border: rgba(0, 242, 255, 0.26);
    --header-bg: linear-gradient(180deg, rgba(7, 23, 38, 0.96) 0%, rgba(5, 17, 31, 0.6) 100%);
    --header-shadow: inset 0 0 18px rgba(0, 242, 255, 0.06), 0 10px 26px rgba(0, 0, 0, 0.62);
    --title-color: #00f2ff;
    --title-shadow: transparent;
    --time-color: #00f2ff;
    --switch-bg: linear-gradient(180deg, rgba(0, 144, 163, 0.9), rgba(0, 87, 116, 0.96));
    --switch-color: #eaffff;
    --switch-border: rgba(128, 240, 255, 0.48);
    --switch-shadow: transparent;
    --dot-color: #00f2ff;
    --dot-shadow: none;

    --card-bg: linear-gradient(180deg, rgba(6, 22, 36, 0.94), rgba(3, 13, 24, 0.97));
    --card-border: rgba(0, 242, 255, 0.2);
    --card-shadow: 0 12px 24px rgba(0, 0, 0, 0.55);
    --card-corner: rgba(120, 236, 255, 0.7);
    --card-title: #e5fdff;
    --card-title-bar: #00f2ff;
    --card-title-shadow: transparent;

    --stats-item-bg: rgba(0, 242, 255, 0.1);
    --stats-item-border: rgba(0, 242, 255, 0.26);
    --stats-item-shadow: none;
    --stats-label: #b8ecff;
    --stats-value: #00f2ff;
    --stats-value-shadow: transparent;
    --warning-color: #d62a37;

    --alert-item-bg: linear-gradient(180deg, rgba(95, 19, 28, 0.52), rgba(67, 12, 20, 0.6));
    --alert-item-border: rgba(198, 60, 76, 0.44);
    --alert-left-border: #b6172a;
    --alert-item-hover: rgba(124, 23, 36, 0.56);
    --alert-header: #ff5b67;
    --alert-text: #fff;

    --device-item-bg: linear-gradient(180deg, rgba(11, 40, 58, 0.78), rgba(7, 28, 42, 0.82));
    --device-item-border: rgba(0, 242, 255, 0.24);
    --device-item-shadow: none;
    --device-label: #c5f2ff;
    --device-value: #00f2ff;
    --device-value-shadow: transparent;

    --map-border: rgba(0, 242, 255, 0.26);
    --map-shadow: inset 0 0 16px rgba(0, 242, 255, 0.09), 0 10px 22px rgba(0, 0, 0, 0.55);
    --map-status-bg: rgba(2, 10, 18, 0.9);
    --map-status-border: rgba(0, 242, 255, 0.85);
    --map-status-text: #00f2ff;
    --map-status-shadow: transparent;
    --list-border: rgba(0, 242, 255, 0.2);
    --list-text: #cbf6ff;
    --list-hover: rgba(0, 242, 255, 0.1);
    --hint-color: #749ab7;

    --video-bg: radial-gradient(circle at 50% 30%, #0d1f35, #01040a 74%);
    --video-border: rgba(0, 242, 255, 0.24);
    --video-shadow: 0 8px 18px rgba(0, 0, 0, 0.58);
    --video-placeholder: radial-gradient(circle, #143252 5%, #071629 42%, #000306 100%);
    --video-line: rgba(0, 242, 255, 0.38);
    --video-line-shadow: transparent;
    --video-info: #9ccfe0;
    --video-info-shadow: transparent;

    --chart-axis: #a2d9ea;
    --chart-line-color: rgba(0, 242, 255, 0.35);
    --chart-split: rgba(0, 242, 255, 0.15);
    --chart-name: #8bc4d6;
    --chart-line: #00f2ff;
    --chart-area: rgba(0, 242, 255, 0.2);
    --chart-bar-start: #00f2ff;
    --chart-bar-end: #004a8a;
    --chart-pie-1: #00f2ff;
    --chart-pie-2: #7cb5ec;
    --chart-pie-3: #2f7dcf;
    --chart-label: #d8f7ff;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      repeating-linear-gradient(0deg, var(--grid-line) 0, var(--grid-line) 1px, transparent 1px, transparent 32px),
      repeating-linear-gradient(90deg, var(--grid-line) 0, var(--grid-line) 1px, transparent 1px, transparent 32px);
    opacity: var(--grid-opacity);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 42%, var(--center-glow), transparent 44%);
    pointer-events: none;
  }

  .header {
    position: relative;
    z-index: 2;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--header-border);
    border-radius: 12px;
    background: var(--header-bg);
    box-shadow: var(--header-shadow);
  }

  .title {
    font-size: 26px;
    color: var(--title-color);
    letter-spacing: 4px;
    text-shadow: 0 0 16px var(--title-shadow);
  }

  .now-time {
    position: absolute;
    left: 20px;
    color: var(--time-color);
    letter-spacing: 2px;
    font-size: 14px;
  }

  .header-actions {
    position: absolute;
    right: 20px;
    display: flex;
    gap: 10px;
  }

  .switch-btn {
    padding: 8px 14px;
    background: var(--switch-bg);
    color: var(--switch-color);
    border: 1px solid var(--switch-border);
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    letter-spacing: 1px;
    box-shadow: 0 0 14px var(--switch-shadow);
  }

  .main-content {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 320px 1fr 320px;
    gap: 15px;
    height: calc(100vh - 90px);
    margin-top: 10px;
  }

  @media (max-width: 1366px) {
    .main-content {
      grid-template-columns: 280px 1fr 280px;
      gap: 10px;
    }
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
  background: var(--dot-color);
  border-radius: 50%;
  box-shadow: var(--dot-shadow);
  margin-right: 5px;
}
</style>
