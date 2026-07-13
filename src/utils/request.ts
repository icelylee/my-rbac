import axios from 'axios'
import { BASE_URL } from '@/config/constant'

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(config => {
  return config
}, err => Promise.reject(err))

// 响应拦截器
service.interceptors.response.use(res => {
  return res.data
}, err => Promise.reject(err))

export default service