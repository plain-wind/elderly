<script setup lang="ts">

</script>

<template>
  <div class="app-layout">
    <div class="brand-area">
      <div class="nature-deco">
        <div class="sun"></div>
        <div class="leaf leaf-1"></div>
        <div class="leaf leaf-2"></div>
      </div>
      <div class="brand-content">
        <h1>智慧康养</h1>
        <p>让科技更有温度，让晚年更自在</p>
      </div>
    </div>

    <div class="view-area">
      <router-view v-slot="{ Component }">
        <transition name="fade-slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-layout {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #fdfdfb;
  overflow: hidden;

  .brand-area {
    flex: 1.2;
    background: linear-gradient(135deg, #44803f 0%, #1d4d2d 100%);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;

    .brand-content {
      z-index: 2;
      text-align: center;

      h1 {
        font-size: 3.5rem;
        letter-spacing: 4px;
        margin-bottom: 1rem;
      }

      p {
        opacity: 0.8;
        font-weight: 300;
        letter-spacing: 2px;
      }
    }
  }

  .view-area {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 40px 0 0 40px; // 向内凹陷的圆角感
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.05);
    z-index: 5;
  }
}

// 简单的 CSS 图形装饰
.nature-deco {
  position: absolute;
  inset: 0;
  overflow: hidden;

  .sun {
    position: absolute;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    top: -50px;
    left: -50px;
  }

  .leaf {
    position: absolute;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 80% 0 80% 0;
    transform: rotate(-45deg);
  }

  .leaf-1 {
    width: 200px;
    height: 200px;
    bottom: 10%;
    right: 10%;
  }
}

// 路由切换动画
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

// 响应式处理
@media (max-width: 768px) {
  .brand-area {
    display: none !important;
  }

  .view-area {
    background: #f9f9f9;
  }
}
</style>