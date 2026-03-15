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
        <h2 style="color: #00f2ff">64</h2>
      </div>
      <div class="device-item">
        <p><span class="device-icon">🚗</span>智能小车</p>
        <h2 style="color: #00f2ff">32</h2>
      </div>
      <div class="device-item">
        <p><span class="device-icon">💊</span>智能药盒</p>
        <h2 style="color: #00f2ff">18</h2>
      </div>
      <div class="device-item">
        <p><span class="device-icon">🦯</span>智能拐杖</p>
        <h2 style="color: #00f2ff">14</h2>
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
    background: rgba(245, 34, 45, 0.1);
    margin-bottom: 8px;
    padding: 8px;
    border-left: 3px solid #f5222d;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: rgba(245, 34, 45, 0.2);
    }

    .alert-header {
      display: flex;
      justify-content: space-between;
      color: #ff4d4f;
    }
  }
}

.device-status {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  text-align: center;

  .device-item {
    background: rgba(0, 242, 255, 0.1);
    padding: 10px;
    border-radius: 4px;

    p {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
      font-weight: 600;
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
