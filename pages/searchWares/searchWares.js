// pages/searchWares/searchWares.js

import {getWareList} from '../../api/wares'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    supplierID: '',
    searchResult: [],
    searchRecord: [
      {
        "groupPrice": 0,
        "groupStock": "string",
        "skuID": 239847987,
        "storeID": 0,
        "storePrice": 0,
        "storeStock": "string",
        "supplierID": 0,
        "wareBusinessType": 0,
        "wareIntroduction": "我是一行商品名称标题 需要截字我是一行商品名称标题 需要截字",
        "wareName": "string",
        "wareOrigin": "string",
        "wareProductType": 0,
        "wareSlogan": "string",
        "wareTemperatureDescription": 0,
        "wareTypeOfMeasurement": 0,
        "wareUnitOfMeasurement": 0
      },
      {
        "groupPrice": 0,
        "groupStock": "string",
        "skuID": 562730,
        "storeID": 0,
        "storePrice": 0,
        "storeStock": "string",
        "supplierID": 0,
        "wareBusinessType": 0,
        "wareIntroduction": "我是一行商品名称标题 需要截字我是一行商品名称标题 需要截字",
        "wareName": "string",
        "wareOrigin": "string",
        "wareProductType": 0,
        "wareSlogan": "string",
        "wareTemperatureDescription": 0,
        "wareTypeOfMeasurement": 0,
        "wareUnitOfMeasurement": 0
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  searchWares (e) {
    getWareList({
      supplierID: e.detail.keyword - 0
    }).then(res => {

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
