<script setup lang="ts">
import { ActiveStatus } from '@/types';
import { useActiveStore } from '@/stores/active';

defineProps<{
  id: string;
  imgSrc: string;
  activeName: string;
  startTime: string;
  endTime: string;
  position: string;
  personNum: number;
  status: ActiveStatus;
}>();

const activeStore = useActiveStore();
const { deleteActivity, fetchActivities } = activeStore;

const handleDelete = async (id: string) => {
  try {
    await deleteActivity(id);
    ElMessage.success('活动删除成功');
    // 这里可以触发父组件刷新列表，例如通过 emit 或直接调用 store 方法
    // emit('refresh'); // 如果使用事件
    await fetchActivities(); // 直接调用 store 方法刷新列表
  } catch (err) {
    console.error('删除活动失败:', err);
    ElMessage.error('活动删除失败');
  }
};
</script>

<template>
  <div class="active-item">
    <div class="active-img">
      <img :src="imgSrc" alt="" />
    </div>
    <div class="active-info">
      <div class="active-active-name">
        {{ activeName }}
      </div>
      <div class="active-date">开始时间：{{ startTime }}</div>
      <div class="active-date">结束时间：{{ endTime }}</div>
      <div class="active-position">活动地点：{{ position }}</div>
      <div class="active-person-num">活动人数：{{ personNum }}</div>
      <div class="active-btn">
        <el-button type="primary" size="large" @click="
          () => {
            $router.push({
              name: 'activeDetail',
              query: {
                id
              },
            });
          }
        ">查看详情</el-button>
        <el-button type="danger" size="large" @click="handleDelete(id)">删除活动</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.active-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(68, 128, 63, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(68, 128, 63, 0.15);
  }

  .active-img {
    flex-shrink: 0;
    width: 200px;
    height: 250px;
    overflow: hidden;
    border-radius: 10px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .active-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .active-active-name {
      font-size: 35px;
      font-weight: 500;
      color: #44803f;
    }

    .active-date,
    .active-position,
    .active-person-num {
      font-size: 16px;
      color: #918d8d;
    }
  }

  .active-btn {
    align-self: flex-end;
    margin-top: 2em;
  }
}
</style>
