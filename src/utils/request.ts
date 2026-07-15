import axios from 'axios'
import type {
  AxiosInstance,
  InternalAxiosRequestConfig
} from 'axios'

// 后端通用返回格式
export interface BackRes<T = any> {
  code: number
  data: T
  msg: string
  total?: number
}

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
service.interceptors.response.use(
  (res): any => {
    return res.data as BackRes
  },
  (err) => {
    const msg = err.response?.data?.msg || '网络请求失败'
    console.error('接口错误：', msg)
    // 401 未登录/过期跳转登录
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default service