<script setup lang="ts">
const props = defineProps<{
  src?: string;
}>()
const videoContainerRef = ref<HTMLElement | null>(null);

const toggleFullscreen = async () => {
  const el = videoContainerRef.value;
  if (!el || !document) return;

  const isCurrentFullscreen = document.fullscreenElement === el;
  try {
    if (!document.fullscreenElement) {
      await el.requestFullscreen();
      return;
    }
    if (isCurrentFullscreen) {
      await document.exitFullscreen();
    }
  } catch (err) {
    console.warn('Fullscreen toggle failed:', err);
  }
};
// --- 摄像头选择功能 ---
const cameras = ref<Array<{ id: number; label: string; location: string; resolution?: string; codec?: string; fps?: string }>>([
  { id: 1, label: '厅堂摄像头A', location: 'A区大厅', resolution: '1080P', codec: 'H.265', fps: '30FPS' },
  { id: 2, label: '走廊摄像头B', location: 'A区走廊', resolution: '720P', codec: 'H.264', fps: '25FPS' },
  { id: 3, label: '门口摄像头C', location: '西门', resolution: '4K', codec: 'H.265', fps: '30FPS' },
]);

const selectedCamera = ref<number>(cameras.value[0].id);
const currentCamera = computed(() => cameras.value.find(c => c.id === selectedCamera.value) || cameras.value[0]);

const onCameraChange = (id: number) => {
  // 这里可扩展为切换实际视频流（例如更新 video 元素的 src 或调用后端接口）
  selectedCamera.value = id;
};
</script>

<template>
  <div ref="videoContainerRef" class="video-container" @dblclick="toggleFullscreen">
    <div class="video-header">
      <span class="live-tag">LIVE</span>
      <span class="video-title">实时监控：</span>
      <el-select v-model="selectedCamera" size="small" placeholder="选择摄像头" style="width:220px; margin-left:8px"
        @change="onCameraChange">
        <el-option v-for="cam in cameras" :key="cam.id" :label="cam.label + ' - ' + cam.location" :value="cam.id" />
      </el-select>
    </div>
    <div class="video-placeholder">
      <template v-if="src">
        <img ref="video" :src="src" alt="Video Placeholder" class="video-frame" />
      </template>
      <template v-else>
        <div class="scanning-line"></div>
      </template>
      <div class="video-overlay-info">{{ currentCamera?.resolution || '1080P' }} | {{ currentCamera?.codec ||
        'H.265' }} | {{ currentCamera?.fps || '30FPS' }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.video-container {
  height: 100%;
  background: var(--video-bg);
  border: 1px solid var(--video-border);
  border-radius: 8px;
  box-shadow: var(--video-shadow);
  position: relative;
  overflow: hidden;
  cursor: zoom-in;
}

.video-container:fullscreen {
  width: 100vw;
  height: 100vh;
  border-radius: 0;
  border: none;
  cursor: zoom-out;
}

.video-header {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 5;
  font-size: 12px;
}

.live-tag {
  background: #ff8058;
  color: #fff;
  padding: 2px 5px;
  border-radius: 2px;
  animation: blink 1.5s infinite;
  margin-right: 5px;
}

.video-placeholder {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--video-placeholder);
  overflow: hidden;
}

.video-frame {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.scanning-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background: var(--video-line);
  box-shadow: 0 0 16px var(--video-line-shadow);
  animation: scan 4s linear infinite;
}

.video-overlay-info {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 10px;
  color: var(--video-info);
  text-shadow: 0 0 8px var(--video-info-shadow);
}

@keyframes scan {
  from {
    top: 0;
  }

  to {
    top: 100%;
  }
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>