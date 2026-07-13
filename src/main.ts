import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
const app = createApp(App)

// 后续阶段会在这里挂载 router、pinia
// app.use(router)
// app.use(pinia)

app.mount('#app')