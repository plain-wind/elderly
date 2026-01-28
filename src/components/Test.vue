<script setup lang="ts">
const handleLogin = (e: Event) => {
  e.preventDefault();
}
</script>

<template>
  <div class="login-container">
    <div class="visual-section">
      <div class="content">
        <h1 class="logo-text">FRESH<span>DESIGN</span></h1>
        <p>让每一份灵感都能在翠绿中萌芽</p>
      </div>
      <div class="circle-deco"></div>
    </div>

    <div class="form-section">
      <div class="login-card">
        <header>
          <h2>欢迎回来</h2>
          <p>请登录您的账号以继续</p>
        </header>

        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <input type="text" required />
            <label>手机号 / 账号</label>
            <span class="bar"></span>
          </div>

          <div class="input-group">
            <input type="password" required />
            <label>密码</label>
            <span class="bar"></span>
          </div>

          <div class="actions">
            <label class="remember">
              <input type="checkbox" /> 记住我
            </label>
            <a href="#" class="forgot">忘记密码？</a>
          </div>

          <button type="submit" class="login-btn">
            立即登录
          </button>
        </form>

        <div class="footer">
          还没有账号？<a href="#">申请加入</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  font-family: 'PingFang SC', 'Helvetica Neue', sans-serif;
  background-color: #f0f4f0;
  overflow: hidden;
}

// --- 左侧视觉区 ---
.visual-section {
  flex: 1.4;
  background: linear-gradient(135deg, #2d5a27 0%, #4facfe 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  .content {
    z-index: 2;
    text-align: center;

    .logo-text {
      font-size: 3rem;
      font-weight: 900;
      letter-spacing: -1px;

      span {
        font-weight: 200;
        opacity: 0.8;
      }
    }

    p {
      margin-top: 1rem;
      font-size: 1.1rem;
      opacity: 0.9;
      letter-spacing: 2px;
    }
  }

  .circle-deco {
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    top: -100px;
    left: -100px;
  }
}

// --- 右侧表单区 ---
.form-section {
  flex: 1;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
}

.login-card {
  width: 100%;
  max-width: 400px;

  header {
    margin-bottom: 40px;

    h2 {
      font-size: 2rem;
      color: #1a1a1a;
      margin-bottom: 10px;
    }

    p {
      color: #8e8e93;
      font-size: 0.9rem;
    }
  }
}

// --- 极简输入框动效 ---
.input-group {
  position: relative;
  margin-bottom: 35px;

  input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #333;
    border: none;
    border-bottom: 1px solid #d1d1d6;
    outline: none;
    background: transparent;
    transition: 0.3s;

    &:focus~label,
    &:valid~label {
      top: -20px;
      font-size: 12px;
      color: #52c41a;
    }

    &:focus~.bar:before {
      width: 100%;
    }
  }

  label {
    position: absolute;
    top: 10px;
    left: 0;
    color: #999;
    pointer-events: none;
    transition: 0.3s ease all;
  }

  .bar {
    position: relative;
    display: block;
    width: 100%;

    &:before {
      content: '';
      height: 2px;
      width: 0;
      bottom: 0;
      position: absolute;
      background: #52c41a;
      transition: 0.4s ease all;
      left: 0;
    }
  }
}

// --- 辅助功能 ---
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin-bottom: 30px;
  color: #666;

  .forgot {
    color: #52c41a;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

// --- 登录按钮 ---
.login-btn {
  width: 100%;
  height: 50px;
  background: #2d5a27;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 15px -3px rgba(45, 90, 39, 0.3);

  &:hover {
    background: #3d7a35;
    transform: translateY(-2px);
    box-shadow: 0 20px 25px -5px rgba(45, 90, 39, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
}

.footer {
  margin-top: 30px;
  text-align: center;
  font-size: 14px;
  color: #888;

  a {
    color: #2d5a27;
    font-weight: 600;
    text-decoration: none;
    margin-left: 5px;
  }
}

// 响应式处理
@media (max-width: 768px) {
  .visual-section {
    display: none;
  }

  .form-section {
    background: #f9f9f9;
  }
}
</style>