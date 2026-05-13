<script setup lang="ts"></script>

<template>
  <div class="container">
    <Video src="http://localhost:5000/video_feed" />
    <Video />
    <!-- <div class="video-container">
      <video src="/videos/video.mp4" autoplay muted loop />
    </div> -->
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

.video-container {
  height: 100%;
  background: var(--video-bg);
  border: 1px solid var(--video-border);
  border-radius: 8px;
  box-shadow: var(--video-shadow);
  position: relative;
  overflow: hidden;
  cursor: zoom-in;
  position: relative;

  video {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: fill;
    transform: scaleY(1.2);
  }
}
</style>
