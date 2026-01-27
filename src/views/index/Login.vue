<script setup lang="ts">
import { Login } from '@/types';
import { Phone, Lock } from '@element-plus/icons-vue'

const router = useRouter();

const ruleForm = ref<Login>({
  telephone: '',
  password: '',
})


const rules = reactive({
  desc: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
})
</script>

<template>
  <div class="main">
    <div class="box glass">
      <div class="big-title">
        HI！ 欢迎登录
      </div>
      <div class="small-title">请 登 录 您 的 账 号</div>
      <!-- 表单 -->
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" label-position="top">
        <el-form-item label="手机号" prop="telephone">
          <el-input v-model="ruleForm.telephone" placeholder="请输入手机号" :prefix-icon="Phone" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" show-password :prefix-icon="Lock" />
        </el-form-item>

        <div @click="router.push({ name: 'register' })" class="link">
          还没有账号？去注册
        </div>

        <el-form-item>
          <el-button type="primary">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/global.scss' as *;
@use '@/assets/scss/index.scss' as *;
</style>