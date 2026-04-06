<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
import type { FormInstance, FormRules } from 'element-plus';
import { validateTelephone } from '@/utils';

const loginForm = ref({ telephone: '', password: '' });
const router = useRouter();
const loginFormRef = ref<FormInstance>();

const rules = reactive<FormRules<typeof loginForm.value>>({
  telephone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { validator: validateTelephone, message: '请输入正确的手机号码', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入登录密码', trigger: 'blur' },
    { min: 6, max: 16, message: '密码长度必须在6到16位之间', trigger: 'blur' },
  ],
});

const handleLogin = () => {
  // 执行登录逻辑
  loginFormRef.value?.validate((valid) => {
    if (valid) {
      // 登录成功逻辑
      console.log('登录信息:', loginForm.value);
      ElMessage.success('登录成功');
      // 假设登录成功后跳转到首页
      router.push('/admin');
    } else {
      ElMessage.error('登录失败');
    }
  });
};
</script>

<template>
  <div class="login-box">
    <div class="header">
      <h2>欢迎登录</h2>
      <div class="divider"></div>
    </div>

    <el-form
      @submit.native.prevent
      ref="loginFormRef"
      :model="loginForm"
      :rules="rules"
      label-position="top"
      class="custom-form"
    >
      <el-form-item label="手机号码" prop="telephone">
        <el-input
          v-model="loginForm.telephone"
          placeholder="请输入您的手机号"
          required
          :prefix-icon="User"
        />
      </el-form-item>

      <el-form-item label="登录密码" prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          show-password
          placeholder="请输入密码"
          required
          :prefix-icon="Lock"
        />
      </el-form-item>

      <div class="form-options">
        <el-link type="primary" underline="never">忘记密码？</el-link>
      </div>

      <el-button class="submit-btn" type="primary" @click="handleLogin">安全登录</el-button>

      <div class="footer-link">
        还没有账号？<el-link type="success" @click="$router.push('/register')">立即注册</el-link>
      </div>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.login-box {
  width: 100%;
  max-width: 400px;
  padding: 0 40px;

  .header {
    margin-bottom: 30px;

    h2 {
      color: #2e4e31;
    }

    .divider {
      width: 30px;
      height: 4px;
      background: #44803f;
      margin-top: 8px;
    }
  }
}

// 核心：覆盖 Element Plus 样式
.custom-form {
  :deep(.el-form-item__label) {
    font-weight: 600;
    color: #555;
    padding-bottom: 4px;
  }

  :deep(.el-input__wrapper) {
    background-color: #f9fbf9;
    border-radius: 12px;
    box-shadow: none;
    border: 1px solid #eee;
    padding: 5px 15px;
    transition: all 0.3s;

    &.is-focus {
      border-color: #44803f;
      background-color: #fff;
      box-shadow: 0 0 0 1px #44803f inset !important;
    }
  }

  .submit-btn {
    width: 100%;
    height: 54px;
    border-radius: 14px;
    font-size: 17px;
    background: linear-gradient(90deg, #44803f, #5a9a54);
    border: none;
    box-shadow: 0 10px 20px rgba(68, 128, 63, 0.2);
    margin-top: 15px;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 25px rgba(68, 128, 63, 0.3);
    }
  }
}

.form-options {
  text-align: right;
  margin-bottom: 15px;
}

.footer-link {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  font-size: 14px;
  color: #999;
}
</style>
