<script setup lang="ts">
import ActiveItem from '@/components/ActiveItem.vue';
import UpdateActive from '@/components/UpdateActive.vue';
import { useActiveStore } from '@/stores/active';
import type { Active } from '@/types';
import { storeToRefs } from 'pinia';

const activeStore = useActiveStore();
const { handleStatusChange } = activeStore;
const { status, activeList, activeAll } = storeToRefs(activeStore);

// 添加活动弹窗控制变量
const isOpen = ref(false);

// 初始化时根据 status 过滤数据
handleStatusChange(status.value);
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

    <div class="content">
      <active-item v-for="item in activeList" :key="item.id" :id="item.id" :imgSrc="item.imgSrc"
        :activeName="item.activeName" :date="item.date" :position="item.position"
        :personNum.number="Number(item.personNum)" :status="item.status" />
    </div>

    <teleport to="#app">
      <update-active v-model:isOpen="isOpen" @update="(active: Active) => activeAll.push(active)" />
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

  .content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
}
</style>