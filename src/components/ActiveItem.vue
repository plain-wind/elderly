<script setup lang="ts">
import { activeApi } from '@/api';
import { useActiveStore } from '@/stores/active';
import { storeToRefs } from 'pinia';

defineProps<{
  id: number;
  image: string;
  name: string;
  startTime: string;
  endTime: string;
  place: string;
  numberOfApplicants: number;
}>();

const activeStore = useActiveStore();
const { handleStatusChange } = activeStore;
const { activeAll, status } = storeToRefs(activeStore);

const removeHandle = async (id: number) => {
  try {
    await activeApi.remove(id);
    // 更新本地数据
    activeAll.value = activeAll.value.filter((item) => item.id !== id);
    handleStatusChange(status.value);
    ElMessage.success('删除成功');
  } catch (error) {
    ElMessage.error('删除失败');
  }
};
</script>

<template>
  <div class="active-item">
    <div class="active-img">
      <img :src="image" alt="" />
    </div>
    <div class="active-info">
      <div class="active-active-name">
        {{ name }}
      </div>
      <div class="active-date">活动日期：{{ startTime }} - {{ endTime }}</div>
      <div class="active-position">活动地点：{{ place }}</div>
      <div class="active-person-num">活动人数：{{ numberOfApplicants }}</div>
      <div class="active-btn">
        <el-button type="primary" size="large" @click="
          () => {
            $router.push({
              name: 'activeDetail',
              query: {
                id,
              },
            });
          }
        ">
          查看详情
        </el-button>
        <el-button type="danger" size="large" @click="removeHandle(id)">
          删除活动
        </el-button>
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
    height: 250px;
    overflow: hidden;
    border-radius: 10px;

    img {
      width: 200px;
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
