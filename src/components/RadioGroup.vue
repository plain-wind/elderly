<script setup lang="ts">
const props = withDefaults(defineProps<{
  label: string;
  modelValue: string;
}>(), {
});

</script>

<template>
  <div class="input-field">
    <label>{{ label }}</label>
    <div class="role-selector">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>