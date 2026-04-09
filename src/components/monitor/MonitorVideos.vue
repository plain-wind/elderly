<script setup lang="ts"></script>

<template>
  <div class="container">
    <Video src="http://localhost:5000/video_feed" />
    <Video />
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex: 1;
  min-height: 260px;

  :deep(.video-container) {
    flex: 1;
  }
}
</style>
