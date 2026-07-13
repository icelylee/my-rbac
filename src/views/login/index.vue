<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="login-title">RBAC系统登录</h2>
      <el-form ref="loginFormRef" :model="loginForm" label-width="60px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="submitLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'

const loginFormRef = ref<FormInstance>()
const userStore = useUserStore()
const router = useRouter()

const loginForm = ref({
  username: 'admin',
  password: '123456'
})

// 模拟登录
const submitLogin = () => {
  // 模拟后端返回token
  const mockToken = 'admin-token-123456'
  userStore.setToken(mockToken)
  userStore.setUserInfo('超级管理员', ['admin'], ['*'])
  router.push('/home')
}
</script>

<style scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  background-color: #f5f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-card {
  width: 380px;
}
.login-title {
  text-align: center;
  margin-bottom: 24px;
}
.login-btn {
  width: 100%;
}
</style>