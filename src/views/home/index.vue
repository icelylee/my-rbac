<template>
  <el-card>
    <h2>欢迎进入 RBAC 权限管理后台</h2>
    <p>当前登录角色：{{ userStore.roles.join(',') }}</p>
  </el-card>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
</script>