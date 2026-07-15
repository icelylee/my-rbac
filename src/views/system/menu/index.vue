<template>
  <div class="page-container">
    <div class="page-top" style="display:flex;justify-content:space-between;align-items:center;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
        <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button v-permission="PERM.MENU_ADD" type="primary" @click="openAdd">新增菜单</el-button>
    </div>
    <el-table border :data="tableList">
      <el-table-column label="ID" prop="id" />
      <el-table-column label="路由路径" prop="path" />
      <el-table-column label="路由名称" prop="name" />
      <el-table-column label="页面组件地址" prop="component" />
      <el-table-column label="父级菜单ID" prop="parentId" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button v-permission="PERM.MENU_EDIT" @click="openEdit(scope.row as MenuItem)">编辑</el-button>
          <el-button v-permission="PERM.MENU_DEL" type="danger" @click="handleDel(scope.row as MenuItem)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/编辑弹窗 -->
    <el-dialog v-model="dialogShow" title="菜单编辑">
      <el-form :model="form">
        <el-form-item label="路由路径">
          <el-input v-model="form.path" placeholder="/system/user" />
        </el-form-item>
        <el-form-item label="路由名称">
          <el-input v-model="form.name" placeholder="User" />
        </el-form-item>
        <el-form-item label="组件地址">
          <el-input v-model="form.component" placeholder="/system/user/index" />
        </el-form-item>
        <el-form-item label="父级菜单ID">
          <el-input v-model.number="form.parentId" placeholder="0 代表一级菜单" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogShow = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PERM } from '@/config/constant'
// 仅导入菜单相关接口，类型单独导入
import { getMenuList, addMenu, editMenu, delMenu } from '@/api/system'
import type { MenuItem, MenuRecord } from '@/api/system'

const getMenuListData = async () => {
  const res = await getMenuList()
  // 把后端返回DefaultRow数组转成MenuItem数组
  const rawList = res.data || []
  tableList.value = rawList.map((row: MenuRecord) => ({
    id: row.id,
    path: row.path,
    name: row.name,
    component: row.component,
    parentId: row.parentId
  }))
}

const tableList = ref<MenuItem[]>([])
const dialogShow = ref(false)
// 菜单一般不分页，直接删除分页相关变量
const form = ref<Partial<MenuItem>>({ id: 0, path: '', name: '', component: '', parentId: 0 })

// 加载菜单列表
const loadTable = async () => {
  await getMenuListData()
  
}

// 新增
const openAdd = () => {
  form.value = { id: 0, path: '', name: '', component: '', parentId: 0 }
  dialogShow.value = true
}
// 编辑
const openEdit = (row: MenuItem) => {
  form.value = { ...row  }
  dialogShow.value = true
}
// 提交
const submitForm = async () => {
  if (form.value.id && form.value.id !==0) {
    await editMenu(form.value as MenuItem)
  } else {
    await addMenu(form.value as MenuItem)
  }
  dialogShow.value = false
  loadTable()
}
// 删除
const handleDel = async (row: MenuItem) => {
  await delMenu(row .id)
  await loadTable()
}

onMounted(() => {
  loadTable()
})
</script>

<style scoped>
.page-top {
  margin-bottom: 12px;
}
</style>