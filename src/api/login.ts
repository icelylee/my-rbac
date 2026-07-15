import request from '@/utils/request'
import type { BackRes } from '@/utils/request'

// 登录接口参数
export type LoginForm = {
  username: string
  password: string
}

// 登录返回数据
export type LoginRes = {
  token: string
  username: string
}

export function loginApi(form: LoginForm) : Promise<BackRes<LoginRes>> {
  return request({
    url: '/login',
    method: 'post',
    data: form
  })}