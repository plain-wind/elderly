<script setup lang="ts">
import Test1 from '@/components/Test1.vue'
</script>

<template>
  <!-- <router-view></router-view> -->
  <Test1></Test1>
</template>

<style lang="scss">
@use '@/assets/scss/global.scss' as *;

#app {
  /* 基础品牌色 */
  --el-color-primary: #44803f;
  --el-color-primary-light-3: #82d780;
  --el-color-success: #44803f;

  /* 圆角与阴影 */
  --el-border-radius-base: 14px;
  --el-box-shadow-light: 0 10px 30px rgba(68, 128, 63, 0.08);

  /* 输入框全局重写 */
  --el-input-bg-color: #f9fbf9;
  --el-input-border-color: #eef2ee;
  --el-input-hover-border-color: #44803f;
}
</style>
