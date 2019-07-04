/**
 * Created by Yulia on 2019/6/29.
 */

import Request from '../utils/request'
const http = new Request('sso')

/*
 * 获取验证码
 * */
export const getCaptcha = () => {
  return http.get('captcha')
}

/*
 * 登录
 * */
export const login = (params = {}) => {
  return http.get('login', params)
}

/*
 * 检测是否登录
 * */
export const isLogin = () => {
  return http.get('islogin', {})
}


