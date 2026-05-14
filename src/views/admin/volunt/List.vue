<script setup lang="ts">
import VoluntItem from '@/components/VoluntItem.vue';
import { useVoluntStore } from '@/stores/volunt';
import { storeToRefs } from 'pinia';

const voluntStore = useVoluntStore();
const { handleStatusChange, fetchVolunts } = voluntStore;
const { status, voluntList, isLoading, error } = storeToRefs(voluntStore);

onMounted(async () => {
  await fetchVolunts();
});
</script>

<template>
  <div class="volunteer-list">
    <div class="change-status">
      <el-radio-group size="large" v-model="status" @change="handleStatusChange">
        <el-radio-button value="all">全部</el-radio-button>
        <el-radio-button value="examine">待审核</el-radio-button>
        <el-radio-button value="pass">审核通过</el-radio-button>
        <el-radio-button value="reject">审核拒绝</el-radio-button>
      </el-radio-group>
    </div>
    <div v-if="error" class="error-banner">
      <p>{{ error }}</p>
    </div>
    <div class="content">
      <div v-if="isLoading" class="loading-container">
        <p>加载中...</p>
      </div>
      <template v-else>
        <volunt-item v-for="item in voluntList" :key="item.id" :id="item.id" :imgSrc="item.imgSrc"
          :activeName="item.activeName" :name="item.name" :position="item.position" :status="item.status" />
        <div v-if="voluntList.length === 0" class="empty-state">
          <p>暂无志愿</p>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.volunteer-list {
  display: flex;
  flex-direction: column;
  gap: 30px;

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
