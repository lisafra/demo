/**
 * Created by Yulia on 2019/6/29.
 */

import Request from '../utils/request'
const http = new Request('man')

/*
 * 获取商品列表
 * @param orderInfoVO 供应商ID
 * */
export const order = (params) => {
  return http.post('order/submit', params)
}



