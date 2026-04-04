<template>
  <DataCard title="实时监测预警">
    <div class="alert-list">
      <div v-for="item in jcyjData" :key="item.id" class="alert-item" @click="goDetail(item)">
        <div class="alert-header">
          <span class="alert-type">{{ item.title }}</span>
          <span class="alert-name">{{ item.name }}</span>
        </div>
        <p class="alert-addr">{{ item.address }}</p>
        <p class="alert-time">{{ item.time }}</p>
      </div>
    </div>
  </DataCard>

  <div id="geofence-records-target"></div>

  <DataCard title="智能设备状态">
    <div ref="deviceChartRef" class="device-status-chart"></div>
  </DataCard>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import * as echarts from 'echarts';
import DataCard from '@/components/DataCard.vue';

interface AlertItem { id: number; title: string; name: string; address: string; time: string; }
type ThemeMode = 'bright' | 'dark';
const props = defineProps<{ jcyjData: AlertItem[]; theme: ThemeMode }>();

const router = useRouter();
const deviceChartRef = ref<HTMLDivElement | null>(null);
let deviceChart: echarts.ECharts | null = null;

const goDetail = (item: AlertItem) => {
  router.push({ name: 'detail', query: { name: item.name, address: item.address, phone: 13745678901, sonphone: 13745678902 } });
};

const getPieColors = (theme: ThemeMode) => {
  if (theme === 'dark') {
    return {
      colors: ['#00f2ff', '#7cb5ec', '#2f7dcf', '#4de27a'],
      label: '#d8f7ff'
    };
  }

  return {
    colors: ['#73d8ff', '#4cc6ff', '#5c96ff', '#74dca2'],
    label: '#e2f5ff'
  };
};

const initDeviceChart = async () => {
  await nextTick();
  if (!deviceChartRef.value) return;

  if (deviceChart) {
    deviceChart.dispose();
    deviceChart = null;
  }

  const palette = getPieColors(props.theme);
  deviceChart = echarts.init(deviceChartRef.value);
  deviceChart.setOption({
    color: palette.colors,
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    legend: {
      top: 0,
      right: 0,
      orient: 'vertical',
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 8,
      textStyle: { color: palette.label, fontSize: 12 }
    },
    series: [
      {
        name: '设备状态',
        type: 'pie',
        radius: ['30%', '70%'],
        center: ['36%', '52%'],
        avoidLabelOverlap: true,
        itemStyle: { borderColor: 'rgba(0,0,0,0)', borderWidth: 2 },
        label: { show: false },
        labelLine: { show: false },
        data: [
          { value: 1, name: '智能手表' },
          { value: 1, name: '智能小车' },
          { value: 1, name: '智能药盒' },
          { value: 1, name: '智能拐杖' }
        ]
      }
    ]
  });
};

const handleResize = () => {
  if (deviceChart) {
    deviceChart.resize();
  }
};

onMounted(() => {
  initDeviceChart();
  window.addEventListener('resize', handleResize);
});

watch(
  () => props.theme,
  () => {
    initDeviceChart();
  }
);

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  if (deviceChart) {
    deviceChart.dispose();
    deviceChart = null;
  }
});
</script>

<style scoped lang="scss">
.alert-list {
  flex: 1;
  overflow-y: auto;
  font-size: 14px;

  .alert-item {
    background: var(--alert-item-bg);
    margin-bottom: 8px;
    padding: 8px;
    border: 1px solid var(--alert-item-border);
    border-left: 3px solid var(--alert-left-border);
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;

    &:hover {
      background: var(--alert-item-hover);
      transform: translateX(2px);
    }

    .alert-header {
      display: flex;
      justify-content: space-between;
      color: var(--alert-header);
    }

    .alert-addr,
    .alert-time {
      color: var(--alert-text);
      opacity: 0.86;
    }
  }
}

.device-status-chart {
  height: 220px;
}
</style>
