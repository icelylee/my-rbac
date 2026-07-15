import { defineStore } from 'pinia'
import { loginApi } from '@/api/login'
import type { LoginForm } from '@/api/login'
export const useUserStore = defineStore('user', {
  persist: true, // 开启本地持久化
  state: () => ({
    token: '',
    username: '',
    roles: [] as string[],
    permissions: [] as string[]
  }),
  actions: {
    // 设置token
    setToken(token: string) {
      this.token = token
    },
    // 登录赋值用户信息
    setUserInfo(name: string, roleList: string[], permList: string[]) {
      this.username = name
      this.roles = roleList
      this.permissions = permList
    },
    // 统一登录方法（对接登录接口）
     async login(form: LoginForm) {
      const res = await loginApi(form)
      if (res.code === 200) {
        this.setToken(res.data.token)
        this.setUserInfo(res.data.username, [], [])
      }
      return res
    },
    // 退出登录清空数据
    logout() {
      this.token = ''
      this.username = ''
      this.roles = []
      this.permissions = []
    }
  }
})