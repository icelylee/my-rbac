<template>
  <el-aside width="220px" class="sidebar-box">
    <div class="logo-box">RBAC权限后台</div>
    <el-menu
      :default-active="activeMenu"
      router
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <el-menu-item index="/home">
        <el-icon><HomeFilled /></el-icon>
        <span>首页</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { HomeFilled } from '@element-plus/icons-vue'

const route = useRoute()
const activeMenu = route.path
</script>

<style scoped>
.sidebar-box {
  background-color: #304156;
}
.logo-box {
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  border-bottom: 1px solid #1f2d3d;
}
</style>