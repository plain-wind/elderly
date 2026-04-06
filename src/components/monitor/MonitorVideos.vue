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
  gap: 10px;
  height: 100%;
}
</style>
