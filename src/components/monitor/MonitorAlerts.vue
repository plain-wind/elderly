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
    <div class="device-status">
      <div class="device-item">
        <p><span class="device-icon">⌚</span>智能手表</p>
        <h2 class="device-num">64</h2>
      </div>
      <div class="device-item">
        <p><span class="device-icon">🚗</span>智能小车</p>
        <h2 class="device-num">32</h2>
      </div>
      <div class="device-item">
        <p><span class="device-icon">💊</span>智能药盒</p>
        <h2 class="device-num">18</h2>
      </div>
      <div class="device-item">
        <p><span class="device-icon">🦯</span>智能拐杖</p>
        <h2 class="device-num">14</h2>
      </div>
    </div>
  </DataCard>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import DataCard from '@/components/DataCard.vue';

interface AlertItem { id: number; title: string; name: string; address: string; time: string; }
const props = defineProps<{ jcyjData: AlertItem[] }>();

const router = useRouter();

const goDetail = (item: AlertItem) => {
  router.push({ name: 'detail', query: { name: item.name, address: item.address, phone: 13745678901, sonphone: 13745678902 } });
};
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

.device-status {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  text-align: center;

  .device-item {
    background: var(--device-item-bg);
    padding: 10px;
    border: 1px solid var(--device-item-border);
    box-shadow: var(--device-item-shadow);
    border-radius: 6px;

    p {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
      font-weight: 600;
      color: var(--device-label);
    }

    .device-num {
      color: var(--device-value);
      text-shadow: 0 0 12px var(--device-value-shadow);
    }

    .device-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      font-size: 16px;
      line-height: 1;
    }
  }
}
</style>
