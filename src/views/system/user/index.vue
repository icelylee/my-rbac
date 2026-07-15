<template>
  <div class="page-container">
    <div class="page-top" style="display:flex;justify-content:space-between;align-items:center;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button v-permission="PERM.USER_ADD" type="primary" @click="openAdd">新增用户</el-button>
    </div>
    <el-table border :data="tableList">
      <el-table-column label="ID" prop="id" />
      <el-table-column label="用户名" prop="username" />
      <el-table-column label="所属角色" prop="roleName" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button v-permission="PERM.USER_EDIT" @click="openEdit(scope.row as UserItem)">编辑</el-button>
          <el-button v-permission="PERM.USER_DEL" type="danger" @click="handleDel(scope.row as UserItem)">删除</el-button>
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
    <el-dialog v-model="dialogShow" title="用户编辑">
      <el-form :model="form">
        <el-form-item label="用户名">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="分配角色">
          <el-select v-model="form.roleId">
            <el-option v-for="r in roleOptions" :key="r.id" :label="r.name" :value="r.id" />
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
import { getUserList, addUser, editUser, delUser, getRoleList} from '@/api/system'
import type { UserItem, RoleItem } from '@/api/system'
const tableList = ref<UserItem[]>([])
const roleOptions = ref<RoleItem[]>([])
const dialogShow = ref(false)
const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(0)
const form = ref<Partial<UserItem>>({ id: 0, username: '', roleId: 0 })

// 加载用户表格
const loadTable = async () => {
  const res = await getUserList({ pageNum: pageNum.value, pageSize: pageSize.value })
  tableList.value = res.data.records
  total.value = res.data.total
}
// 加载角色下拉框
const loadRole = async () => {
  const res = await getRoleList()
  roleOptions.value = res.data
}

// 新增
const openAdd = () => {
  form.value = { id: 0, username: '', roleId: 0 }
  dialogShow.value = true
}
// 编辑
const openEdit = (row: UserItem) => {
  form.value = { ...row }
  dialogShow.value = true
}
// 提交
const submitForm = async () => {
  if (form.value.id) {
    await editUser(form.value as UserItem)
  } else {
    await addUser(form.value as Omit<UserItem, 'id'>)
  }
  dialogShow.value = false
  loadTable()
}
// 删除
const handleDel = async (row: UserItem) => {
  await delUser(row.id)
  loadTable()
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