<script setup lang="ts">
import { User, Phone, Lock } from '@element-plus/icons-vue'


const router = useRouter();
const input = ref('')
const toLogin = () => {
  router.push({
    name: 'login'
  })
}

const ruleFormRef = ref()
const ruleForm = reactive({
  name: '',
})


const rules = reactive({
  desc: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
})

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate()
  router.push('/hnxy')
}
</script>

<template>
  <div class="main">
    <div class="box glass">
      <div class="big-title">
        HI！ 欢迎注册
      </div>
      <div class="small-title">请 注 册 您 的 账 号</div>
      <!-- 表单 -->
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" label-position="top">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入您的姓名" :prefix-icon="User" />
        </el-form-item>
        <el-form-item label="手机号" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入手机号" :prefix-icon="Phone" class="sjh" />
        </el-form-item>
        <el-form-item label="验证码" prop="name">
          <el-input v-model="input" type="password" placeholder="请输入验证码" show-password :prefix-icon="Lock" />
        </el-form-item>
        <el-form-item label="密码" prop="name">
          <el-input v-model="input" type="password" placeholder="请输入密码" show-password :prefix-icon="Lock" />
        </el-form-item>
        <el-form-item label="确认密码" prop="name">
          <el-input v-model="input" type="password" placeholder="请再次确认密码" show-password :prefix-icon="Lock" />
        </el-form-item>

        <div @click="toLogin()" class="link">
          已有帐号 去登录
        </div>

        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            注册
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
