import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './assets/styles/index.scss'
import { setupPermission } from './permission'
import { permission } from './permission'
async function setupMock() {
  if (import.meta.env.DEV && import.meta.env.VITE_USE_MSW === 'true') {
    const { worker } = await import('./mock/browser')
    worker.start({
      onUnhandledRequest(request) {
        const urlObj = new URL(request.url)
        // 规则1：所有不是/api开头的地址（页面、vue、css、js、图片等）全部直接放行，不打印警告
        if (!urlObj.pathname.startsWith('/api/')) {
          return 'bypass'
        }
        // 规则2：只有/api开头但没写mock的接口，才打印警告
        console.warn(`MSW 未匹配接口：${request.url}`)
      }
    })
    console.log('✅ MSW Mock服务已启动，接口模拟生效')
  }
}
setupMock()
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.directive('permission', permission)
app.mount('#app')
setupPermission()