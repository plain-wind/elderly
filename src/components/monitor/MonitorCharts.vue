<template>
  <div class="monitor-charts">
    <DataCard title="体征数据异常趋势">
      <div ref="lineChartRef" class="chart-box"></div>
    </DataCard>
    <DataCard title="今日活动完成数量">
      <div ref="gaugeChartRef" class="chart-box-small"></div>
    </DataCard>
    <DataCard title="今日警报类型分布">
      <div ref="pieChartRef" class="chart-box-small"></div>
    </DataCard>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import * as echarts from 'echarts';
import Highcharts from 'highcharts';
import highcharts3d from 'highcharts/highcharts-3d';
import DataCard from '@/components/DataCard.vue';

const hc3d = highcharts3d as any;
if (typeof hc3d === 'function') {
  hc3d(Highcharts);
} else if (hc3d && typeof hc3d.default === 'function') {
  hc3d.default(Highcharts);
} else {
  // side-effect import may already have applied 3D support
  console.warn('highcharts3d module did not export a function; assuming side effect import.');
}

const lineChartRef = ref<HTMLDivElement | null>(null);
const gaugeChartRef = ref<HTMLDivElement | null>(null);
const pieChartRef = ref<HTMLDivElement | null>(null);
let charts: echarts.ECharts[] = [];
let highchartsPie: Highcharts.Chart | null = null;

const initCharts = async () => {
  if (!lineChartRef.value || !gaugeChartRef.value || !pieChartRef.value) return;

  const checkSize = (el: HTMLDivElement) => el.clientWidth > 0 && el.clientHeight > 0;
  if (!checkSize(lineChartRef.value) || !checkSize(gaugeChartRef.value) || !checkSize(pieChartRef.value)) {
    await new Promise(resolve => setTimeout(resolve, 100));
    if (!lineChartRef.value || !gaugeChartRef.value || !pieChartRef.value) return;
  }

  if (!checkSize(lineChartRef.value) || !checkSize(gaugeChartRef.value) || !checkSize(pieChartRef.value)) {
    console.warn('chart container still zero size');
    return;
  }

  const line = echarts.init(lineChartRef.value);
  line.setOption({
    grid: { top: 30, bottom: 20, left: 30, right: 10 },
    xAxis: { type: 'category', data: ['03-07', '03-08', '03-09', '03-10', '03-11', '03-12'], axisLabel: { color: '#ccc', fontSize: 10 } },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: '#222' } }, axisLabel: { color: '#ccc' } },
    series: [{ data: [2, 5, 3, 8, 4, 5], type: 'line', smooth: true, itemStyle: { color: '#00f2ff' }, areaStyle: { color: 'rgba(0,242,255,0.2)' } }]
  });

  const activityChart = echarts.init(gaugeChartRef.value);
  activityChart.setOption({
    grid: { top: 30, bottom: 20, left: 30, right: 10 },
    color: ['#00f2ff', '#ff4d4f', '#ffa940', '#7cb5ec'],
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: { type: 'category', data: ['散步', '体操', '太极', '唱歌'], axisLine: { lineStyle: { color: '#4f5d73' } }, axisLabel: { color: '#ccc' } },
    yAxis: { type: 'value', name: '完成次数', min: 0, axisLine: { lineStyle: { color: '#4f5d73' } }, splitLine: { lineStyle: { color: '#222' } }, axisLabel: { color: '#ccc' } },
    series: [{
      name: '今日完成数量',
      type: 'bar',
      barMaxWidth: 36,
      barGap: '25%',
      data: [26, 18, 14, 10],
      itemStyle: { borderRadius: [4, 4, 0, 0], color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#00f2ff' }, { offset: 1, color: '#004a8a' }]) },
      label: { show: true, position: 'top', color: '#fff', fontSize: 11 }
    }]
  });

  highchartsPie = Highcharts.chart(pieChartRef.value as HTMLElement, {
    chart: {
      type: 'pie',
      options3d: { enabled: true, alpha: 45, beta: 0 },
      backgroundColor: 'transparent',
      height: pieChartRef.value.clientHeight,
      width: pieChartRef.value.clientWidth
    },
    title: { text: '' },
    tooltip: { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        depth: 35,
        dataLabels: { enabled: true, format: '{point.name}' }
      }
    },
    series: [{
      name: 'Share',
      type: 'pie',
      data: [
        ['跌倒警报', 10],
        ['围栏警报', 5],
        ['心率预警', 17]
      ]
    }]
  });

  charts = [line, activityChart];
};

onMounted(() => {
  initCharts();
  window.addEventListener('resize', () => {
    charts.forEach(c => c.resize());
    if (highchartsPie) highchartsPie.reflow();
  });
});

onUnmounted(() => {
  charts.forEach(c => c.dispose());
  if (highchartsPie) {
    highchartsPie.destroy();
    highchartsPie = null;
  }
});
</script>

<style scoped lang="scss">
.monitor-charts {
  display: flex;
  gap: 10px;
  flex-direction: column;
}

.chart-box {
  height: 160px;
}

.chart-box-small {
  height: 180px;
}
</style>
