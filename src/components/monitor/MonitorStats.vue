<template>
  <DataCard class="stat-grid">
    <div class="stat-item" v-for="(item, index) in stats" :key="item.label">
      <span class="label">{{ item.label }}</span>
      <span class="value" :class="{ warning: item.warning }">{{
        animatedValues[index] ?? item.value
        }}</span>
    </div>
  </DataCard>
</template>

<script setup lang="ts">
import DataCard from '@/components/DataCard.vue';

interface StatItem {
  label: string;
  value: string;
  warning?: boolean;
}

const props = defineProps<{ stats: StatItem[] }>();

const animatedValues = ref<string[]>([]);

const DURATION_MS = 1200;
let frameId: number | null = null;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const getDecimals = (value: number) => {
  const decimal = value.toString().split('.')[1];
  return decimal ? decimal.length : 0;
};

const animateStats = () => {
  if (frameId !== null) {
    cancelAnimationFrame(frameId);
    frameId = null;
  }

  const targets = props.stats.map((item) => Number(item.value));
  const start = performance.now();

  const tick = (now: number) => {
    const progress = Math.min((now - start) / DURATION_MS, 1);
    const eased = easeOutCubic(progress);

    animatedValues.value = props.stats.map((item, index) => {
      const target = targets[index];
      if (Number.isNaN(target)) {
        return item.value;
      }

      const decimals = getDecimals(target);
      const current = target * eased;
      if (decimals > 0) {
        return current.toFixed(decimals);
      }
      return Math.round(current).toString();
    });

    if (progress < 1) {
      frameId = requestAnimationFrame(tick);
    }
  };

  frameId = requestAnimationFrame(tick);
};

onMounted(() => {
  animateStats();
});

watch(
  () => props.stats,
  () => {
    animateStats();
  },
  { deep: true }
);

onBeforeUnmount(() => {
  if (frameId !== null) {
    cancelAnimationFrame(frameId);
  }
});
</script>

<style scoped lang="scss">
/* 统计项样式 */
.stat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  min-height: 150px;
}

.stat-item {
  background: var(--stats-item-bg);
  border: 1px solid var(--stats-item-border);
  box-shadow: var(--stats-item-shadow);
  border-radius: 6px;
  padding: 3px;
  text-align: center;

  .label {
    color: var(--stats-label);
    font-size: 13px;
  }

  .value {
    font-size: 22px;
    font-weight: bold;
    color: var(--stats-value);
    display: block;
    text-shadow: 0 0 12px var(--stats-value-shadow);

    &.warning {
      color: var(--warning-color);
    }
  }
}
</style>
