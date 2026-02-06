<script setup lang="ts">
import { Star } from '@element-plus/icons-vue';
defineProps<{
  rating: number;
}>()
</script>

<template>
  <div class="rating-stars">
    <el-icon v-for="(star, index) in rating" :key="index">
      <Star />
    </el-icon>
  </div>
</template>

<style scoped lang="scss">
.rating-stars {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  .el-icon {
    color: #ffc107;
    font-size: 16px;
  }
}
</style>