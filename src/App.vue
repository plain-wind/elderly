<script setup lang="ts">
import { routerLoading } from '@/router';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
</script>

<template>
  <router-view></router-view>
  <LoadingSpinner v-if="routerLoading" loading-text="加载中..." />
</template>

<style lang="scss">
@use '@/assets/scss/global.scss' as *;
</style>
