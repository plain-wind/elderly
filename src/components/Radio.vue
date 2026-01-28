<script setup lang="ts">
const props = withDefaults(defineProps<{
  value: string;
  size?: 'small' | 'medium' | 'large';
}>(), {
  size: 'medium',
});
</script>

<template>
  <label :class="`size-${props.size}`">
    <input type="radio" :value="props.value" />
    <slot></slot>
  </label>
</template>

<style scoped lang="scss"></style>