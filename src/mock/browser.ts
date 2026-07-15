import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// 创建浏览器拦截worker
export const worker = setupWorker(...handlers)