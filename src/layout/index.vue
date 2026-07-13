<template>
  <div class="layout-container">
    <Sidebar />
    <div class="main-wrapper">
      <Header />
      <div class="page-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
</script>

<style scoped>
.layout-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.page-content {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background-color: #f5f7fa;
}
</style>