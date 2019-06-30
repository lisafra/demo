/**
 * Created by Yulia on 2019/6/29.
 */

import Request from '../utils/request'
const http = new Request('man')

/*
 * 注册会员
 * */
export const addMember = (params) => {
  return http.post('member/add', params)
}

