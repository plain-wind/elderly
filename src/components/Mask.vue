<script setup lang="ts">

</script>

<template>
  <div class="mask">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.mask {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
</style>