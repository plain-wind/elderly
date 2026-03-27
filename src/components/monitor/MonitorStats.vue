<template>
  <DataCard class="stat-grid">
    <div class="stat-item" v-for="item in stats" :key="item.label">
      <span class="label">{{ item.label }}</span>
      <span class="value" :class="{ warning: item.warning }">{{ item.value }}</span>
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
</script>

<style scoped lang="scss">
/* 统计项样式 */
.stat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.stat-item {
  background: var(--stats-item-bg);
  border: 1px solid var(--stats-item-border);
  box-shadow: var(--stats-item-shadow);
  border-radius: 6px;
  padding: 10px;
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
