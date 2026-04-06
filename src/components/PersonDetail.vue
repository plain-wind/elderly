<script setup lang="ts">
import Mask from './Mask.vue';
import { Close } from '@element-plus/icons-vue';

defineProps<{
  isOpen: boolean;
}>();

const person = {
  name: '王磊',
  account: '13115569855',
  password: '123456',
};
</script>

<template>
  <Mask v-show="isOpen">
    <div class="person-detail-box">
      <div class="person-detail-top">
        <el-icon class="person-icon" @click="$emit('update:isOpen', false)">
          <Close />
        </el-icon>
      </div>
      <div class="person-detail">
        <h2>个人信息</h2>
        <img src="/imgs/user.webp" alt="用户头像" width="60px" />
        <p><strong>姓名：</strong>{{ person.name }}</p>
        <p><strong>账号：</strong>{{ person.account }}</p>
        <p><strong>密码：</strong>{{ person.password }}</p>
      </div>
    </div>
  </Mask>
</template>

<style scoped lang="scss">
.person-detail-box {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;

  .person-detail-top {
    display: flex;
    justify-content: flex-end;

    .person-icon {
      font-size: 24px;
      color: #999;
      cursor: pointer;
      transition: color 0.3s ease;

      &:hover {
        color: #333;
      }
    }
  }

  .person-detail {
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
      margin-bottom: 20px;
      color: #44803f;
    }

    img {
      margin-bottom: 20px;
      border-radius: 50%;
      border: 2px solid #44803f;
    }

    p {
      font-size: 16px;
      margin-bottom: 10px;

      strong {
        color: #44803f;
      }
    }
  }
}
</style>
