<template>
  <div class="page-container">
    <el-card class="form-container">
      <template #header>
        <div>{{ title }}</div>
      </template>
      <el-form ref="formRef" :rules="rules" :model="formData">
        <el-form-item prop="account">
          <el-input v-model="formData.account" placeholder="登录账号">
            <template #prepend>
              <el-icon :size="16"><avatar /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formData.password"
            placeholder="登录密码"
            type="password"
            @keyup.enter="handleLogin"
          >
            <template #prepend>
              <el-icon :size="16"><lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" :loading="btnLoading" @click="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { login as loginRequest } from '@/service/api/user'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'

const title = import.meta.env.VITE_APP_TITLE
const formRef = ref()
const formData = ref({
  account: 'admin',
  password: '123456'
})
const btnLoading = ref(false)
const userStore = useUserStore()
const router = useRouter()
const rules = {
  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}
// 登录处理
const handleLogin = () => {
  formRef.value.validate(async (valid: Boolean) => {
    if (valid) {
      try {
        btnLoading.value = true
        const { data } = await loginRequest(formData.value.account, formData.value.password)
        userStore.setUserInfo(data)
        userStore.setToken(data.accessToken)
        router.push('/')
        ElNotification({
          type: 'success',
          title: '登录成功',
          message: `欢迎回来，${data.username}`,
          showClose: true,
          offset: 100,
          duration: 3000
        })
      } finally {
        btnLoading.value = false
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.page-container {
  width: 100%;
  height: 100%;
  background: url('@/assets/image/login-bg.jpeg') no-repeat;
  background-size: cover;
  position: relative;
  min-height: 400px;
  .form-container {
    position: absolute;
    width: 360px;
    right: 8vw;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
