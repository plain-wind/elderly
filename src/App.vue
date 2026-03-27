<script setup lang="ts">
import { routerLoading } from '@/router';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import Test from './components/Test.vue';
</script>

<template>
  <router-view></router-view>
  <LoadingSpinner v-if="routerLoading" loading-text="加载中..." />
  <!-- <Test /> -->
</template>

<style lang="scss">
@use '@/assets/scss/global.scss' as *;
</style>
