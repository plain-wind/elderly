<template>
  <div class="app-layout">
    <div class="brand-area">
      <div class="glow-sphere"></div>

      <div class="nature-deco">
        <div class="sun"></div>
        <div class="leaf leaf-1"></div>
        <div class="leaf leaf-2"></div>
      </div>

      <div class="brand-content">
        <h1 class="floating-text">智慧康养</h1>
        <p class="fade-in-text">让科技更有温度，让晚年更自在</p>
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
// 1. 定义动画关键帧 (必须写在最外面或确保被调用)
@keyframes rotate-shine {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse-soft {
  0% {
    transform: scale(1);
    opacity: 0.05;
  }

  50% {
    transform: scale(1.1);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.05;
  }
}

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
    overflow: hidden;

    // 刚才没看到的旋转动画，现在用这个独立的球体层实现
    .glow-sphere {
      position: absolute;
      width: 150%;
      height: 150%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 60%);
      top: -25%;
      left: -25%;
      animation: rotate-shine 20s infinite linear;
      z-index: 1;
    }

    .brand-content {
      z-index: 2;
      text-align: center;

      .floating-text {
        font-size: 3.5rem;
        letter-spacing: 4px;
        margin-bottom: 1rem;
        animation: float 4s ease-in-out infinite; // 文字浮动动画
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
    border-radius: 40px 0 0 40px;
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.05);
    z-index: 5;
  }
}

.nature-deco {
  position: absolute;
  inset: 0;
  z-index: 1;

  .sun {
    position: absolute;
    width: 400px;
    height: 400px;
    background: white;
    opacity: 0.05;
    border-radius: 50%;
    top: -100px;
    left: -100px;
    animation: pulse-soft 6s infinite ease-in-out; // 太阳呼吸动画
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

  .leaf-2 {
    width: 100px;
    height: 100px;
    top: 20%;
    right: 15%;
    opacity: 0.05;
  }
}

// 路由过渡动画
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>