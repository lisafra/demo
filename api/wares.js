/**
 * Created by Yulia on 2019/6/29.
 */

import Request from '../utils/request'
const http = new Request('man')

/*
 * 查询当前用户下有效的供应商列表
 * no params
 * */
export const getSupplierList = (param = {}) => {
  return http.get('supplier/listSupplierUnderCurrentUser', {})
}

/*
 * 获取所有驿站
 * VO = {
 "currentPage": 0,
 "id": 0,
 "name": "string",
 "operationType": 0,
 "pageSize": 0,
 "storeType": 0
 }
 * */
export const getStoreList = ({VO}) => {
  return http.post('store/list', {VO})
}

/*
 * 获取当前用户下的驿站
 * @param name 驿站名称
 * */
export const getStoreUser = ({name}) => {
  return http.post(`store/queryOneUnderCurrentUser`, {name})
}

/*
 * 获取商品列表
 * @param supplierID 供应商ID
 * */
export const getWareList = (params) => {
  return http.get('ware/search', params)
}



