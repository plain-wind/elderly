<script setup lang="ts">
import ActiveItem from '@/components/ActiveItem.vue';
import { ActiveStatus as Status } from '@/types';

interface Active {
  id: number;
  imgSrc: string;
  activeName: string;
  date: string;
  position: string;
  personNum: number;
  status: Status;
}

const status = ref(Status.All);

const activeAll = ref<Active[]>([
  {
    id: 1,
    imgSrc: '/src/assets/imgs/active/active5.png',
    activeName: '名医讲堂',
    date: '2026-02-05',
    position: '檀园嘉苑社区居委会会议室',
    personNum: 20,
    status: Status.Open,
  },
  {
    id: 2,
    imgSrc: '/src/assets/imgs/active/active1.png',
    activeName: '手工制作课堂',
    date: '2026-02-10',
    position: '阳光小区活动中心',
    personNum: 15,
    status: Status.Open,
  },
  {
    id: 3,
    imgSrc: '/src/assets/imgs/active/active2.png',
    activeName: '棋牌娱乐活动',
    date: '2026-02-08',
    position: '和谐社区老年活动室',
    personNum: 25,
    status: Status.Open,
  },
  {
    id: 4,
    imgSrc: '/src/assets/imgs/active/active3.png',
    activeName: '户外健步走',
    date: '2026-02-01',
    position: '明珠公园',
    personNum: 30,
    status: Status.Close,
  },
  {
    id: 5,
    imgSrc: '/src/assets/imgs/active/active7.png',
    activeName: '音乐欣赏会',
    date: '2026-01-28',
    position: '绿城小区多功能厅',
    personNum: 40,
    status: Status.Close,
  },
  {
    id: 6,
    imgSrc: '/src/assets/imgs/active/active6.png',
    activeName: '书法教学',
    date: '2026-01-25',
    position: '幸福里社区文化室',
    personNum: 12,
    status: Status.Close,
  },
  {
    id: 7,
    imgSrc: '/src/assets/imgs/active/active4.png',
    activeName: '健康体检',
    date: '2026-02-15',
    position: '檀园嘉苑社区卫生服务站',
    personNum: 50,
    status: Status.Open,
  },
  {
    id: 8,
    imgSrc: '/src/assets/imgs/active/active8.png',
    activeName: '茶艺品鉴',
    date: '2026-02-12',
    position: '阳光小区茶艺室',
    personNum: 8,
    status: Status.Open,
  },
]);

const activeList = ref<Active[]>([]);

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
    activeList.value = activeAll.value.filter(item => item.status === val);
  }
}

// 初始化时根据 status 过滤数据
handleStatusChange(status.value);
</script>

<template>
  <div class="active-list">
    <div class="change-status">
      <el-radio-group size="large" v-model="status" @change="handleStatusChange">
        <el-radio-button value="all">全部</el-radio-button>
        <el-radio-button value="open">进行中</el-radio-button>
        <el-radio-button value="close">已结束</el-radio-button>
      </el-radio-group>
    </div>
    <div class="content">
      <active-item v-for="item in activeList" :key="item.id" :imgSrc="item.imgSrc" :activeName="item.activeName"
        :date="item.date" :position="item.position" :personNum="item.personNum" :status="item.status" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.active-list {
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