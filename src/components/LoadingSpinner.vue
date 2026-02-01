<template>
  <div ref="loadingRef" class="loading-overlay">
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">{{ loadingText || '加载中' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  loadingText?: string;
}>();

// const loadingRef = ref<HTMLDivElement | null>(null);

// onBeforeUnmount(() => {
//   console.log('组件卸载前', loadingRef.value);
//   loadingRef.value?.classList.add('end');
// });

// onUnmounted(() => {
//   // 组件卸载时，移除结束类名
//   console.log('组件卸载时', loadingRef.value);
//   loadingRef.value?.classList.remove('end');
// });
</script>

<style scoped lang="scss">
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(2px);
  transition: all 0.3s ease-in-out;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(68, 128, 63, 0.1);
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid #f0f7f0;
  border-top: 4px solid #44803f;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  font-size: 16px;
  color: #44803f;
  font-weight: 500;
  margin: 0;
}

// .end {
//   // 放大一点
//   transform: scale(1.2);
//   opacity: 0.8;
// }

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>