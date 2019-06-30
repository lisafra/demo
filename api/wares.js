/**
 * Created by Yulia on 2019/6/29.
 */

import Request from '../utils/request'
const http = new Request('man')

/*
 * 查询当前用户下有效的供应商列表
 * */
export const getSupplierList = (params) => {
  return http.get('supplier/listSupplierUnderCurrentUser', params)
}

/*
 * 获取当前用户下的驿站
 * */
export const getStoreList = (params = {}) => {
  return http.post('store/queryOneUnderCurrentUser', params)
}

/*
 * 获取商品列表
 * */
export const getWareList = (params) => {
  return http.get('ware/search', params)
}



