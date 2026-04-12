import { defineStore } from 'pinia';
import { ActiveStatus as Status } from '@/types';
import type { Active } from '@/types';
import { activeApi } from '@/api';

export const useActiveStore = defineStore('active', () => {
  const status = ref(Status.All);

  const activeAll = ref<Active[]>([]);

  const activeList = ref<Active[]>([]);

  const getActiveAll = async () => {
    activeAll.value = (await activeApi.get()).map((item) => ({
      ...item,
      status: new Date(item.endTime).getTime() > Date.now() ? Status.Close : Status.Open,
    }));
  };

  // 校验值是否为合法的 Status
  const isStatus = (val: unknown): val is Status => {
    return Object.values(Status).includes(val as Status);
  };

  const handleStatusChange = (val: unknown) => {
    if (!isStatus(val)) {
      return;
    }
    status.value = val;
    if (val === Status.All) {
      activeList.value = activeAll.value;
    } else {
      activeList.value = activeAll.value.filter((item) => item.status === val);
    }
  };

  return {
    status,
    activeList,
    activeAll,
    getActiveAll,
    handleStatusChange,
  };
});
