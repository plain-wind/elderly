<script setup lang="ts">
import { Register } from '@/types';

const router = useRouter();
const registerForm = ref<Register>({
  name: '',
  telephone: '',
  password: '',
  confirmPassword: '',
  role: 'elderly' // 默认角色：长辈
});

const handleRegister = () => {
  console.log('注册信息:', registerForm.value);
  // 执行注册逻辑
};
</script>

<template>
  <div class="register-box">
    <div class="header">
      <el-page-header @back="$router.push('/login')" content="账号注册" title="返回" />
    </div>

    <el-form label-position="top" class="register-grid">
      <el-form-item label="真实姓名" class="full">
        <el-input v-model="registerForm.name" placeholder="请输入姓名" required />
      </el-form-item>

      <el-form-item label="手机号码" class="full">
        <el-input v-model="registerForm.telephone" placeholder="请输入手机号" required />
      </el-form-item>

      <el-form-item label="设置密码">
        <el-input v-model="registerForm.password" type="password" placeholder="6-16位" required />
      </el-form-item>

      <el-form-item label="确认密码">
        <el-input v-model="registerForm.confirmPassword" type="password" placeholder="重复密码" required />
      </el-form-item>

      <el-form-item label="您的身份" class="full">
        <el-radio-group v-model="registerForm.role" class="custom-radio-group">
          <el-radio-button label="elderly" value="elderly">长辈</el-radio-button>
          <el-radio-button label="family" value="family">家属</el-radio-button>
          <el-radio-button label="staff" value="staff">医护</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-button class="submit-btn full" type="primary">开启智慧康养生活</el-button>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.register-box {
  width: 100%;
  max-width: 500px;
  padding: 40px;

  .header {
    margin-bottom: 30px;

    :deep(.el-page-header__content) {
      color: #2e4e31;
      font-weight: 700;
      font-size: 22px;
    }
  }
}

.register-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 20px; // 增加间距

  .full {
    grid-column: span 2;
  }

  // 统一深度覆盖所有 Element 组件
  :deep(.el-form-item) {
    margin-bottom: 10px;

    .el-form-item__label {
      font-weight: 600;
      color: #4a5c4a;
      padding-bottom: 4px;
      margin-left: 4px;
    }

    .el-input__wrapper {
      background-color: #f9fbf9;
      border-radius: 12px;
      padding: 5px 15px;
      box-shadow: 0 0 0 1px #eef2ee inset;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        box-shadow: 0 0 0 1px #44803f inset;
      }

      &.is-focus {
        background-color: #fff;
        box-shadow: 0 0 0 1px #44803f inset, 0 8px 20px rgba(68, 128, 63, 0.1) !important;
      }
    }
  }
}

// 角色选择卡片化
.custom-radio-group {
  width: 100%;
  display: flex !important;
  gap: 12px;

  :deep(.el-radio-button) {
    flex: 1;

    .el-radio-button__inner {
      width: 100%;
      height: 46px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #eef2ee !important;
      border-radius: 10px !important;
      background: #fcfdfc;
      color: #7a8b7a;
      transition: all 0.2s;
    }

    &:first-child .el-radio-button__inner {
      border-left: 1px solid #eef2ee !important;
    }

    &.is-active .el-radio-button__inner {
      background-color: #eaf2ea !important;
      color: #44803f !important;
      border-color: #44803f !important;
      font-weight: 700;
    }
  }
}

.submit-btn {
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
</style>