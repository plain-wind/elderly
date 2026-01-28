<script setup lang="ts">
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';
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
      <div class="back-link" @click="router.push({ name: 'login' })">
        ← 返回登录
      </div>
      <h2>创建新账号</h2>
      <p>加入智慧康养社区，享受贴心服务</p>
    </div>

    <form @submit.prevent="handleRegister" class="form-grid">

      <Input class="full" size="small" v-model="registerForm.name" label="真实姓名" type="text" placeholder="请输入姓名" />
      <Input class="full" size="small" v-model="registerForm.telephone" label="手机号码" type="tel"
        placeholder="用于登录和紧急联系" />
      <Input size="small" v-model="registerForm.password" label="设置密码" type="password" placeholder="6-16位字符" />
      <Input size="small" v-model="registerForm.confirmPassword" label="确认密码" type="password" placeholder="请再次输入" />

      <div class="input-field full">
        <label>您的身份</label>
        <div class="role-selector">
          <label :class="{ active: registerForm.role === 'elderly' }">
            <input type="radio" v-model="registerForm.role" value="elderly" /> 长辈
          </label>
          <label :class="{ active: registerForm.role === 'family' }">
            <input type="radio" v-model="registerForm.role" value="family" /> 家属
          </label>
          <label :class="{ active: registerForm.role === 'staff' }">
            <input type="radio" v-model="registerForm.role" value="staff" /> 医护人员
          </label>
        </div>
      </div>

      <Button type="submit" class="full" style="margin-top: 20px;">
        开启智慧养老生活
      </Button>
    </form>

    <p class="terms">
      注册即代表您同意 <a href="#">服务协议</a> 与 <a href="#">隐私政策</a>
    </p>
  </div>
</template>

<style scoped lang="scss">
.register-box {
  width: 100%;
  max-width: 500px;
  padding: 0 40px;

  .header {
    margin-bottom: 30px;

    .back-link {
      color: #888;
      font-size: 14px;
      cursor: pointer;
      margin-bottom: 15px;
      transition: color 0.3s;

      &:hover {
        color: #44803f;
      }
    }

    h2 {
      font-size: 26px;
      color: #2e4e31;
    }

    p {
      color: #999;
      font-size: 14px;
      margin-top: 5px;
    }
  }
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; // 双列布局
  gap: 15px 20px;

  .full {
    grid-column: span 2; // 跨两列
  }
}

.input-field {
  label {
    display: block;
    font-size: 13px;
    color: #555;
    margin-bottom: 6px;
    font-weight: 500;
  }
}

/* 角色选择器样式 */
.role-selector {
  display: flex;
  gap: 10px;
  margin-top: 5px;

  label {
    flex: 1;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    color: #666;
    transition: all 0.3s;
    border: 1px solid transparent;

    input {
      display: none; // 隐藏原始 radio
    }

    &.active {
      background: rgba(68, 128, 63, 0.1);
      color: #44803f;
      border-color: #44803f;
      font-weight: 600;
    }
  }
}

.terms {
  text-align: center;
  margin-top: 25px;
  font-size: 12px;
  color: #bbb;

  a {
    color: #44803f;
    text-decoration: none;
  }
}

/* 响应式：移动端切换为单列 */
@media (max-width: 480px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .input-field {
    grid-column: span 2;
  }
}
</style>