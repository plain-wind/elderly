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
</style>
