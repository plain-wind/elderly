<script setup lang="ts">
import VoluntItem from '@/components/VoluntItem.vue';
import { useVoluntStore } from '@/stores/volunt';
import { storeToRefs } from 'pinia';

const voluntStore = useVoluntStore();
const { handleStatusChange } = voluntStore;
const { status, voluntList } = storeToRefs(voluntStore);

// 初始化时根据 status 过滤数据
handleStatusChange(status.value);
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
    <div class="content">
      <volunt-item
        v-for="item in voluntList"
        :key="item.id"
        :id="item.id"
        :imgSrc="item.imgSrc"
        :activeName="item.activeName"
        :name="item.name"
        :position="item.position"
        :status="item.status"
      />
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

  .content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
}
</style>
