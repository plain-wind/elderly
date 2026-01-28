<script setup lang="ts">
const props = defineProps<{
  type: 'button' | 'submit' | 'reset'
}>();
</script>

<template>
  <button :type="type" class="btn">
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<style scoped lang="scss">
.btn {
  width: 100%;
  height: 56px;
  background: #44803f;
  color: #fff;
  border: none;
  border-radius: 14px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 8px 20px rgba(68, 128, 63, 0.2);

  &:hover {
    background: #356632;
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(68, 128, 63, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
}
</style>