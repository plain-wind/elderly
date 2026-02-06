<script setup lang="ts">
import VolunteerItem from '@/components/VolunteerItem.vue';
import { Status } from '@/types';

interface Volunteer {
  id: number;
  imgSrc: string;
  activeName: string;
  name: string;
  position: string;
  examine: Status;
}

const status = ref(Status.All);

const volunteerAll = ref<Volunteer[]>([
  {
    id: 4,
    imgSrc: '/src/assets/imgs/volunteer/volunteer6.png',
    activeName: '购物',
    name: '赵光明',
    position: '和谐社区12号楼3单元202',
    examine: Status.Pass,
  },
  {
    id: 5,
    imgSrc: '/src/assets/imgs/volunteer/volunteer1.png',
    activeName: '维修家电',
    name: '陈师傅',
    position: '明珠花园6号楼2单元401',
    examine: Status.Reject,
  },
  {
    id: 6,
    imgSrc: '/src/assets/imgs/volunteer/volunteer2.png',
    activeName: '做饭',
    name: '刘阿姨',
    position: '绿城小区9号楼1单元602',
    examine: Status.Examine,
  },
  {
    id: 1,
    imgSrc: '/src/assets/imgs/volunteer/volunteer3.png',
    activeName: '浇花',
    name: '张桂兰',
    position: '檀园嘉苑12号楼1单元101',
    examine: Status.Examine,
  },
  {
    id: 2,
    imgSrc: '/src/assets/imgs/volunteer/volunteer5.png',
    activeName: '打扫卫生',
    name: '李建国',
    position: '阳光小区5号楼2单元302',
    examine: Status.Examine,
  },
  {
    id: 3,
    imgSrc: '/src/assets/imgs/volunteer/volunteer4.png',
    activeName: '陪伴聊天',
    name: '王淑芬',
    position: '幸福里8号楼1单元501',
    examine: Status.Pass,
  },
]);

const volunteerList = ref<Volunteer[]>([]);

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
    volunteerList.value = volunteerAll.value;
  } else {
    volunteerList.value = volunteerAll.value.filter(item => item.examine === val);
  }
}

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
      <volunteer-item v-for="item in volunteerList" :key="item.id" :imgSrc="item.imgSrc" :activeName="item.activeName"
        :name="item.name" :position="item.position" :examine="item.examine" />
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