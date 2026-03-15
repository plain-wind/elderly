<script setup lang="ts">
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
  <div class="video-container">
    <div class="video-header">
      <span class="live-tag">LIVE</span>
      <span class="video-title">实时监控：</span>
      <el-select v-model="selectedCamera" size="small" placeholder="选择摄像头" style="width:220px; margin-left:8px"
        @change="onCameraChange">
        <el-option v-for="cam in cameras" :key="cam.id" :label="cam.label + ' - ' + cam.location" :value="cam.id" />
      </el-select>
    </div>
    <div class="video-placeholder">
      <div class="scanning-line"></div>
      <div class="video-overlay-info">{{ currentCamera?.resolution || '1080P' }} | {{ currentCamera?.codec ||
        'H.265' }} | {{ currentCamera?.fps || '30FPS' }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.video-container {
  height: 100%;
  background: #000;
  border: 1px solid #1a2a44;
  position: relative;
  overflow: hidden;
}

.video-header {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 5;
  font-size: 12px;
}

.live-tag {
  background: #ff4d4f;
  padding: 2px 5px;
  border-radius: 2px;
  animation: blink 1.5s infinite;
  margin-right: 5px;
}

.video-placeholder {
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, #1a2a44, #000);
}

.scanning-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background: rgba(0, 242, 255, 0.4);
  animation: scan 4s linear infinite;
}

.video-overlay-info {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 10px;
  color: #666;
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