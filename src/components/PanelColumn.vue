<template>
  <section class="panel-column">
    <slot></slot>
  </section>
</template>

<style scoped lang="scss">
.panel-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
}
</style>