<script setup lang="ts">
import { Status } from '@/types';

defineProps<{
  imgSrc: string;
  activeName: string;
  name: string;
  position: string;
  examine: Status;
}>();
</script>

<template>
  <div class="volunteer-item">
    <div class="volunteer-img">
      <img :src="imgSrc" alt="">
    </div>
    <div class="volunteer-info">
      <div class="volunteer-active-name">
        {{ activeName }}
      </div>
      <div class="volunteer-name">
        发布人：{{ name }}
      </div>
      <div class="volunteer-position">
        任务地点：{{ position }}
      </div>
      <div class="volunteer-btn">
        <el-button type="primary" size="large" @click="() => {
          $router.push({
            name: 'volunteerDetail',
            query: {
              imgSrc,
              activeName,
              name,
              position,
              examine,
            },
          });
        }">查看详情</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.volunteer-item {
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

  .volunteer-img {
    flex-shrink: 0;
    height: 250px;
    overflow: hidden;
    border-radius: 10px;

    img {
      width: 200px;
    }
  }

  .volunteer-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .volunteer-active-name {
      font-size: 35px;
      font-weight: 500;
      color: #44803f;
    }

    .volunteer-name,
    .volunteer-position {
      font-size: 16px;
      color: #918d8d;
    }
  }

  .volunteer-btn {
    align-self: flex-end;
    margin-top: 2em;
  }
}
</style>
