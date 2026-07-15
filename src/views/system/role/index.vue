<template>
  <div class="page-container">
    <div class="page-top" style="display:flex;justify-content:space-between;align-items:center;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button v-permission="PERM.ROLE_ADD" type="primary" @click="openAdd">新增角色</el-button>
    </div>
    <el-table border :data="tableList">
      <el-table-column label="ID" prop="id" />
      <el-table-column label="角色名称" prop="name" />
      <el-table-column label="权限标识" prop="perms" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button v-permission="PERM.USER_EDIT" @click="openEdit(scope.row as RoleItem)">编辑</el-button>
          <el-button v-permission="PERM.USER_DEL" type="danger" @click="handleDel(scope.row as RoleItem)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNum"
      v-model:page-size="pageSize"
      :total="total"
      @change="loadTable"
    />

    <!-- 新增/编辑弹窗 -->
    <el-dialog v-model="dialogShow" title="角色管理">
      <el-form :model="form">
        <el-form-item label="角色名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="权限标识">
            <el-select v-model="form.perms" multiple placeholder="选择权限">
                    <el-option label="用户新增" value="user:add" />
                    <el-option label="用户编辑" value="user:edit" />
                    <el-option label="用户删除" value="user:delete" />
                    <el-option label="角色新增" value="role:add" />
            </el-select>       
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
import { getRoleList, addRole, editRole, delRole } from '@/api/system'
import type { RoleItem, RoleRecord } from '@/api/system'
const tableList = ref<RoleItem[]>([])
const roleOptions = ref<RoleItem[]>([])
const dialogShow = ref(false)
const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(0)
const form = ref<Partial<RoleItem>>({ id: 0, name: '', perms: [] })


// 获取角色列表（带分页、类型转换、判空兜底）
const getRoleListData = async () => {
  // 分页接口传入页码、条数
  const res = await getRoleList({ pageNum: pageNum.value, pageSize: pageSize.value })
  // 赋值总条数
  total.value = res.total || 0
  // 空数据兜底
  const rawData = res.data || []
  // 和menu统一：map转换类型
  tableList.value = rawData.map((row: RoleRecord): RoleItem => ({
    id: row.id,
    name: row.name,
    perms: row.perms
  }))
  // 下拉框复用同一份数据，不用重复请求接口
  roleOptions.value = [...tableList.value]
}
  // 加载用户表格
const loadTable = async () => {
  await getRoleListData()
}
// 加载角色下拉框
const loadRole = async () => {
  // 直接用已加载完成的表格数据，避免重复请求
  roleOptions.value = [...tableList.value]
}

// 新增
const openAdd = () => {
  form.value = { id: 0, name: '', perms: [] }
  dialogShow.value = true
}
// 编辑
const openEdit = (row: RoleItem) => {
  form.value = { ...row }
  dialogShow.value = true
}
// 提交
const submitForm = async () => {
  if (form.value.id && form.value.id !== 0) {
  await editRole(form.value as RoleItem)
} else {
  await addRole(form.value as RoleItem)
}
  dialogShow.value = false
  await loadTable()
}
// 删除
const handleDel = async (row: RoleItem) => {
  await delRole(row.id)
  await loadTable()
}

onMounted(() => {
  loadTable()
  loadRole()
})
</script>

<style scoped>
.page-top {
  margin-bottom: 12px;
}
</style>