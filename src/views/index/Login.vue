<script setup lang="ts">
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import { Login } from '@/types'

const router = useRouter();
const loginForm = ref<Login>({ telephone: '', password: '' });

const handleLogin = () => {
  console.log('登录提交:', loginForm.value);
};
</script>

<template>
  <div class="login-box">
    <div class="header">
      <h2>欢迎登录</h2>
      <div class="divider"></div>
    </div>

    <form @submit.prevent="handleLogin" class="form-body">
      <Input v-model="loginForm.telephone" label="手机号码" type="tel" placeholder="请输入您的手机号" />
      <Input v-model="loginForm.password" label="登录密码" type="password" placeholder="请输入密码" />
      <div class="form-footer">
        <span class="to-register" @click="router.push({ name: 'register' })">
          还没有账号？点此注册
        </span>
      </div>

      <Button type="submit">安全登录</Button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.login-box {
  width: 100%;
  max-width: 420px;
  padding: 0 40px;

  .header {
    margin-bottom: 40px;

    h2 {
      font-size: 28px;
      color: #2e4e31;
      font-weight: 600;
    }

    .divider {
      width: 40px;
      height: 4px;
      background: #44803f;
      margin-top: 8px;
      border-radius: 2px;
    }
  }
}

.form-footer {
  text-align: right;
  margin-bottom: 30px;

  .to-register {
    color: #44803f;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>