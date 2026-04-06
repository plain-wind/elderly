<script setup lang="ts">
defineProps<{
  title?: string;
}>();
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
  position: relative;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  box-shadow: var(--card-shadow);
  padding: 10px;
  border-radius: 8px;
  height: 300px;
  overflow: hidden;

  .card-title {
    font-size: 16px;
    margin-bottom: 10px;
    color: var(--card-title);
    border-left: 3px solid var(--card-title-bar);
    padding-left: 8px;
    text-shadow: 0 0 10px var(--card-title-shadow);
  }
}
</style>
