<script setup lang="ts">
import ActiveItem from '@/components/ActiveItem.vue';
import UpdateActive from '@/components/UpdateActive.vue';
import { useActiveStore } from '@/stores/active';
import type { Active } from '@/types';
import { storeToRefs } from 'pinia';

const activeStore = useActiveStore();
const { activeList, status, isLoading, error } = storeToRefs(activeStore);
const { handleStatusChange, fetchActivities } = activeStore;

// 添加活动弹窗控制变量
const isOpen = ref(false);

// 挂载时加载数据
onMounted(() => {
  fetchActivities();
});

// 处理添加活动完成
const handleAddActive = () => {
  isOpen.value = false;
  // Store 中已经自动重新加载列表
};
</script>

<template>
  <div class="active-list">
    <div class="active-top">
      <div class="change-status">
        <el-radio-group size="large" v-model="status" @change="handleStatusChange">
          <el-radio-button value="all">全部</el-radio-button>
          <el-radio-button value="open">进行中</el-radio-button>
          <el-radio-button value="close">已结束</el-radio-button>
        </el-radio-group>
      </div>
      <el-button size="large" type="primary" @click="isOpen = true">添加活动</el-button>
    </div>

    <!-- 错误提示 -->
    <div v-if="error" class="error-banner">
      <p>{{ error }}</p>
    </div>

    <div class="content">
      <!-- 加载状态 -->
      <div v-if="isLoading" class="loading-container">
        <p>加载中...</p>
      </div>

      <!-- 活动列表 -->
      <template v-else>
        <active-item v-for="item in activeList" :key="item.id" :id="item.id" :imgSrc="item.imgSrc"
          :activeName="item.activeName" :startTime="item.startTime" :endTime="item.endTime" :position="item.position"
          :personNum.number="Number(item.personNum)" :status="item.status" />

        <!-- 无活动提示 -->
        <div v-if="activeList.length === 0" class="empty-state">
          <p>暂无活动</p>
        </div>
      </template>
    </div>

    <teleport to="#app">
      <update-active v-model:isOpen="isOpen" @update="handleAddActive" />
    </teleport>
  </div>
</template>

<style scoped lang="scss">
.active-list {
  display: flex;
  flex-direction: column;
  gap: 30px;

  .active-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .el-radio-group {
    :deep(.el-radio-button) {
      .el-radio-button__inner {
        font-size: 16px;
        padding: 15px 30px;
      }
    }
  }

  .error-banner {
    padding: 12px 16px;
    background-color: #fef0f0;
    border: 1px solid #fde2e2;
    border-radius: 4px;
    color: #f56c6c;

    p {
      margin: 0;
      font-size: 14px;
    }
  }

  .content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    min-height: 300px;

    .loading-container {
      grid-column: 1 / -1;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 300px;

      p {
        font-size: 16px;
        color: #999;
      }
    }

    .empty-state {
      grid-column: 1 / -1;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 300px;
      color: #999;

      p {
        font-size: 16px;
      }
    }
  }
}
</style>
