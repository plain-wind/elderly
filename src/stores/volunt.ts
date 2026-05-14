import { defineStore } from 'pinia';
import { VoluntStatus as Status, Volunt } from '@/types';
import { voluntaryApi } from '@/api';
import type { voluntaryItem } from '@/types/response';

export const useVoluntStore = defineStore('volunt', () => {
  const status = ref<Status>(Status.All);
  const voluntAll = ref<Volunt[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const voluntList = computed(() => {
    if (status.value === Status.All) {
      return voluntAll.value;
    }
    return voluntAll.value.filter((item) => item.status === status.value);
  });

  const convertVoluntaryItemToVolunt = (item: voluntaryItem): Volunt => {
    const statusValue = Number(item.hasPass);
    const mappedStatus = statusValue === 1
      ? Status.Pass
      : statusValue === 2
        ? Status.Reject
        : Status.Examine;

    return {
      id: String(item.id),
      imgSrc: item.image || '',
      activeName: item.name,
      name: item.userName,
      position: item.place,
      status: mappedStatus,
    };
  };

  // 校验值是否为合法的 Status
  const isStatus = (val: unknown): val is Status => {
    return Object.values(Status).includes(val as Status);
  };

  const fetchVolunts = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await voluntaryApi.getList();
      console.log('志愿列表响应:', response);
      voluntAll.value = response.list.map((item) => convertVoluntaryItemToVolunt(item));
    } catch (err) {
      const message = err instanceof Error ? err.message : '加载志愿列表失败';
      error.value = message;
      ElMessage.error(message);
    } finally {
      isLoading.value = false;
    }
  };

  const handleStatusChange = (val: unknown) => {
    if (!isStatus(val)) {
      return;
    }
    status.value = val;
  };

  const reset = () => {
    voluntAll.value = [];
    status.value = Status.All;
    error.value = null;
  };

  return {
    status,
    voluntAll,
    voluntList,
    isLoading,
    error,
    fetchVolunts,
    handleStatusChange,
    reset,
  };
});
