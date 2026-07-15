// 接口基础地址
export const BASE_URL = '/api'
// 分页默认参数
export const PAGE_PARAMS = {
  pageNum: 1,
  pageSize: 10
}
// localStorage key统一管理
export const STORAGE_KEY = {
  TOKEN: 'admin_token',
  USER_INFO: 'user_info'
}
// 和后端权限标识一一对应，用于v-permission按钮鉴权
export const PERM = {
  USER_ADD: 'user:add',
  USER_EDIT: 'user:edit',
  USER_DEL: 'user:delete',
  ROLE_ADD: 'role:add',
  ROLE_EDIT: 'role:edit',
  ROLE_DEL: 'role:delete',
  MENU_ADD: 'menu:add',
  MENU_EDIT: 'menu:edit',
  MENU_DEL: 'menu:delete'
}