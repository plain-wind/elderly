<script setup lang="ts">
import { ActiveStatus } from '@/types';

defineProps<{
  imgSrc: string;
  activeName: string;
  date: string;
  position: string;
  personNum: number;
  status: ActiveStatus;
}>();
</script>

<template>
  <div class="active-item">
    <div class="active-img">
      <img :src="imgSrc" alt="">
    </div>
    <div class="active-info">
      <div class="active-active-name">
        {{ activeName }}
      </div>
      <div class="active-date">
        活动日期：{{ date }}
      </div>
      <div class="active-position">
        活动地点：{{ position }}
      </div>
      <div class="active-person-num">
        活动人数：{{ personNum }}
      </div>
      <div class="active-btn">
        <el-button type="primary" size="large" @click="() => {
          $router.push({
            name: 'activeDetail',
            query: {
              imgSrc,
              activeName,
              date,
              position,
              status,
            },
          });
        }">查看详情</el-button>
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
