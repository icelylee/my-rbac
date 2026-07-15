import request from '@/utils/request'
import type { BackRes } from '@/utils/request'

export type MenuItem = {
  id: number
  path: string
  name: string
  component: string
  parentId: number
}
export type MenuRecord = {
  id: number
  path: string
  name: string
  component: string
  parentId: number
}
export type UserItem = {
  id: number
  username: string
  roleId: number
  roleName: string
}
// 后端返回原始角色行数据
export type RoleRecord = {
  id: number
  name: string
  perms: string[]
}
// 页面业务使用角色类型
export type RoleItem = {
  id: number
  name: string
  perms: string[]
}

// 用户管理

export function getUserList(params: { pageNum: number; pageSize: number }): Promise<BackRes<{ records: UserItem[]; total: number }>> {
  return request({ url: '/user/list', method: 'GET', params })
}
export function addUser(data: Omit<UserItem, 'id'>): Promise<BackRes<null>> {
  return request({ url: '/user/add', method: 'POST', data })
}
export function editUser(data: UserItem): Promise<BackRes<null>> {
  return request({ url: '/user/edit', method: 'PUT', data })
}
export function delUser(id: number): Promise<BackRes<null>> {
  return request({ url: `/user/${id}`, method: 'DELETE' })
}
// 补充到system.ts角色区域
export function addRole(data: Omit<RoleItem, 'id'>): Promise<BackRes<null>> {
  return request({ url: '/role/add', method: 'POST', data })
}
export function editRole(data: RoleItem): Promise<BackRes<null>> {
  return request({ url: '/role/edit', method: 'PUT', data })
}
export function delRole(id: number): Promise<BackRes<null>> {
  return request({ url: `/role/${id}`, method: 'DELETE' })
}


export function addMenu(data: Omit<MenuItem, 'id'>): Promise<BackRes<null>> {
  return request({ url: '/menu/add', method: 'POST', data })
}
export function editMenu(data: MenuItem): Promise<BackRes<null>> {
  return request({ url: '/menu/edit', method: 'PUT', data })
}
export function delMenu(id: number): Promise<BackRes<null>> {
  return request({ url: `/menu/${id}`, method: 'DELETE' })
}

// 参数设为可选 params?，支持 无参/传分页参数 两种调用
export function getRoleList(params?: { pageNum?: number; pageSize?: number }): Promise<BackRes<RoleItem[]>> {
  return request({ 
    url: '/role/list', 
    method: 'GET',
    params // 和 addMenu、editMenu 的 data 传参逻辑完全一致
  })
}
export function getMenuList(): Promise<BackRes<MenuItem[]>> {
  return request({ url: '/menu/list', method: 'GET' })
}

// 登录后获取当前用户动态菜单（动态路由核心接口）
export function getUserPermissionMenus(): Promise<BackRes<MenuItem[]>> {
  return request({ url: '/user/menus', method: 'GET' })
}
