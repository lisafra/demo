// pages/selectArea/selectArea.js

import { getAreaByLatAndLng } from '../../api/location'

const app = getApp()
const { navigateTo } = app

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressInfo: {},
    pickerValue: {}
  },

  navigateTo,

  selectAddress() {
    const self = this
    wx.chooseLocation({
      success(res) {
        console.log(res)
        const {latitude, longitude, name} = res
        getAreaByLatAndLng(latitude, longitude).then(res => {
          console.log(res)
          const {address, ad_info, address_component} = res.result
          const {province, city, district} = ad_info
          self.setData({
            addressInfo: {
              ...ad_info,
              address: address + name,
              detailInfo: address_component.street_number + name
            },
            pickerValue: {province, city, district}
          })
          console.log('获取到详细的位置信息了吗', res, self.data)
        })
      }
    })
  },

  selectCityArea(e) {
    const { addressInfo } = this.data
    const {province, city, district} = e.detail
    addressInfo.address = `${province}${city}${district}`
    this.setData({
      addressInfo: Object.assign(this.data.addressInfo, e.detail)
    })
  },

  onConfirm() {
    app.globalData.orderInfo.addressInfo = this.data.addressInfo
    navigateTo({
      url: 'consigneeInfo',
      navigateType: 'navigateBack'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
