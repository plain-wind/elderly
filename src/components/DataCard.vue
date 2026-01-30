<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="data-card">
    <h3 v-if="title" class="card-title">
      {{ title }}
    </h3>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.data-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 242, 255, 0.2);
  padding: 10px;
  border-radius: 4px;

  .card-title {
    font-size: 16px;
    margin-bottom: 10px;
    border-left: 3px solid #00f2ff;
    padding-left: 8px;
  }
}
</style>