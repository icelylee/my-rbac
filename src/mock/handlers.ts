import { http, HttpResponse } from 'msw'

// 模拟内存用户数据，实现新增/删除后列表更新
let userRecords = [
  { id: 1, username: 'admin', roleId: 1, roleName: '超级管理员' },
  { id: 2, username: 'test01', roleId: 2, roleName: '普通操作员' }
]

// 角色下拉静态数据
const roleList = [
  { id: 1, name: '超级管理员' },
  { id: 2, name: '运营角色' },
  { id: 3, name: '访客角色' }
]

// 菜单模拟数据（解决 /menu/list 代理报错）
const menuList = [
  { id: 1, name: '首页', path: '/home',parentId: 0 ,component: 'src/views/home/index.vue' },
  { id: 2, name: '系统管理', path: '/system',parentId: 0 ,component: 'src/views/system/index.vue' }
]

export const handlers = [
  // 用户分页列表
  http.get('/api/user/list', () => {
    //const url = new URL(request.url)
    //const pageNum = Number(url.searchParams.get('pageNum')) || 1
    //const pageSize = Number(url.searchParams.get('pageSize')) || 10
    return HttpResponse.json({
      code: 200,
      data: {
        records: userRecords,
        total: userRecords.length
      }
    })
  }),

  // 新增用户
  http.post('/api/user/add', async ({ request }) => {
    const body = await request.json() as { username: string; roleId: number }
    const newUser = {
      id: Date.now(),
      username: body.username,
      roleId: body.roleId,
      roleName: roleList.find(r => r.id === body.roleId)?.name || ''
    }
    userRecords.push(newUser)
    return HttpResponse.json({ code: 200, msg: '新增成功' })
  }),
  // 登录接口

  // 编辑用户
  http.put('/api/user/edit', async ({ request }) => {
    const body = await request.json() as { id: number; username: string; roleId: number }
    const index = userRecords.findIndex(item => item.id === body.id)
    if (index > -1) {
      userRecords[index] = {
        ...userRecords[index],
        username: body.username,
        roleId: body.roleId,
        roleName: roleList.find(r => r.id === body.roleId)?.name || ''
      }
    }
    return HttpResponse.json({ code: 200, msg: '编辑成功' })
  }),

  // 删除用户
  http.delete('/api/user/:id', ({params}) => {
    const delId = Number(params.id)
    userRecords = userRecords.filter(item => item.id !== delId)
    console.log('mock删除用户id：', delId)
    return HttpResponse.json({ code: 200, msg: '删除成功' })
  }),

  // 获取角色下拉
  http.get('/api/role/list', () => {
    return HttpResponse.json({ code: 200, data: roleList })
  }),

  // 菜单接口（新增，解决 /menu/list 代理报错）
  http.get('/api/menu/list', () => {
    return HttpResponse.json({ code: 200, data: menuList })
  }),
  http.post('/api/login', async ({ request }) => {
  const body = await request.json() as { username: string; password: string }
  // 简单鉴权：admin账号放行
    if (body.username === 'admin') {
      return HttpResponse.json({
        code: 200,
        data: {
          token: 'mock-admin-token-123456'
        },
        msg: '登录成功'
      })
    }
    return HttpResponse.json({
      code: 400,
      msg: '账号密码错误'
    })
  })
]