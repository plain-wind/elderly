import { defineStore } from 'pinia';
import { ActiveStatus as Status, type Active } from '@/types';
import { activityApi } from '@/api';
import { convertActivityItemsToActives } from '@/utils/converter';
import type { AddActivityRequest } from '@/types/request';

export const useActiveStore = defineStore('active', () => {
  // 状态
  const status = ref<Status>(Status.All);
  const allActives = ref<Active[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // 计算属性：根据 status 过滤
  const activeList = computed(() => {
    if (status.value === Status.All) {
      return allActives.value;
    }
    return allActives.value.filter(item => item.status === status.value);
  });

  // 校验值是否为合法的 Status
  const isStatus = (val: unknown): val is Status => {
    return Object.values(Status).includes(val as Status);
  };

  // 从API加载活动列表
  const fetchActivities = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await activityApi.getList();
      allActives.value = convertActivityItemsToActives(response.list);
    } catch (err) {
      const message = err instanceof Error ? err.message : '加载活动列表失败';
      error.value = message;
      ElMessage.error(message);
    } finally {
      isLoading.value = false;
    }
  };

  // 添加活动
  const addActivity = async (data: AddActivityRequest) => {
    try {
      const result = await activityApi.add(data);
      // 添加活动后重新加载列表
      await fetchActivities();
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : '添加活动失败';
      error.value = message;
      throw err;
    }
  };

  // 更新活动
  const updateActivity = async (data: AddActivityRequest & { id: string }) => {
    try {
      const result = await activityApi.update(data);
      // 更新活动后重新加载列表
      await fetchActivities();
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : '更新活动失败';
      error.value = message;
      throw err;
    }
  };

  // 删除活动
  const deleteActivity = async (id: string) => {
    try {
      const result = await activityApi.delete(id);
      // 删除活动后重新加载列表
      await fetchActivities();
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : '删除活动失败';
      error.value = message;
      throw err;
    }
  };

  // 处理状态变更
  const handleStatusChange = (val: unknown) => {
    if (!isStatus(val)) {
      return;
    }
    status.value = val;
    // activeList 通过 computed 自动更新
  };

  // 重置状态
  const reset = () => {
    allActives.value = [];
    status.value = Status.All;
    error.value = null;
  };

  return {
    // 状态
    status,
    allActives,
    activeList,
    isLoading,
    error,

    // 方法
    fetchActivities,
    addActivity,
    updateActivity,
    deleteActivity,
    handleStatusChange,
    reset,
  };
});
