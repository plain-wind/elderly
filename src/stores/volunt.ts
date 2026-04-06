import { defineStore } from 'pinia';
import { VoluntStatus as Status, Volunt } from '@/types';

export const useVoluntStore = defineStore('volunt', () => {
  const status = ref<Status>(Status.All);
  const voluntAll = ref<Volunt[]>([
    {
      id: 4,
      imgSrc: '/imgs/volunteer/volunteer6.png',
      activeName: '购物',
      name: '赵光明',
      position: '和谐社区12号楼3单元202',
      status: Status.Pass,
    },
    {
      id: 5,
      imgSrc: '/imgs/volunteer/volunteer1.png',
      activeName: '维修家电',
      name: '陈师傅',
      position: '明珠花园6号楼2单元401',
      status: Status.Reject,
    },
    {
      id: 6,
      imgSrc: '/imgs/volunteer/volunteer2.png',
      activeName: '做饭',
      name: '刘阿姨',
      position: '绿城小区9号楼1单元602',
      status: Status.Examine,
    },
    {
      id: 1,
      imgSrc: '/imgs/volunteer/volunteer3.png',
      activeName: '浇花',
      name: '张桂兰',
      position: '檀园嘉苑12号楼1单元101',
      status: Status.Examine,
    },
    {
      id: 2,
      imgSrc: '/imgs/volunteer/volunteer5.png',
      activeName: '打扫卫生',
      name: '李建国',
      position: '阳光小区5号楼2单元302',
      status: Status.Examine,
    },
    {
      id: 3,
      imgSrc: '/imgs/volunteer/volunteer4.png',
      activeName: '陪伴聊天',
      name: '王淑芬',
      position: '幸福里8号楼1单元501',
      status: Status.Pass,
    },
  ]);
  const voluntList = ref<Volunt[]>([]);

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
      voluntList.value = voluntAll.value;
    } else {
      voluntList.value = voluntAll.value.filter((item) => item.status === val);
    }
  };

  return { status, voluntList, handleStatusChange };
});
