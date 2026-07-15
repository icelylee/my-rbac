// src/permission.ts
import router from './router'
import type { Directive } from 'vue'
import { useUserStore } from '@/stores/user'

// 定义权限指令
export const permission: Directive = {
  mounted(el, binding) {
    const userStore = useUserStore()
    const needPerm = binding.value
    // 没有对应权限则移除按钮
    if (userStore.permissions.includes('*')||userStore.permissions.includes(needPerm)) {
      return
    }
    el.parentNode?.removeChild(el)
  }
}

export function setupPermission() {
  router.beforeEach((_to, _from, next) => {
    next()
  })
}