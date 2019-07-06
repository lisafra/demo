// pages/consigneeInfo/consigneeInfo.js
const app = getApp()
const { globalData, navigateTo, decodeURL} = app


Page({

  /**
   * 页面的初始数据
   */
  data: {
    consigneeInfo: null,
    historyAddress: []
  },

  navigateTo,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  初始化历史收货人数据
    const historyAddress = wx.getStorageSync('historyAddress') || []
    this.setData({historyAddress})
  },

  // 输入绑定
  inputSetData(e) {
    const {key} = e.currentTarget.dataset
    const {value} = e.detail
    let consigneeInfo = this.data.consigneeInfo
    consigneeInfo[key] = value
    this.setData({consigneeInfo})
    console.log('input', e, key, value)
  },

  // 选择城市区域
  selectArea() {
    console.log(this.data)
    wx.setStorageSync('consigneeInfo', this.data.consigneeInfo)
    navigateTo({
      url: 'selectArea'
    })
  },

  selectAddress(e) {
    const {address} = e.currentTarget.dataset
    // 方案一：直接跳转页面
    this.onConfirm(address, false)
    // 方案二：将数据回填，点击确定再跳转页面
    // const {userName, telNumber} = address
    // console.log('选择默认的收货地址', e.currentTarget.dataset, address)
    // this.setData({
    //   userName,
    //   telNumber,
    //   consigneeInfo: address
    // })
  },

  verifyForm () {
    // 城市可以为空
    console.log(this.data.consigneeInfo)
    const {userName, telNumber, provinceName, countyName, detailInfo} = this.data.consigneeInfo
    return userName && telNumber && provinceName && countyName && detailInfo
  },

  onConfirm(consigneeInfo, newAdd = true) {

    // 点击页面的确定按钮时, 表示新增一个收货人
    if (newAdd) {

      if (!this.verifyForm()) {
        wx.showToast({
          title: '信息填写不全',
          icon: 'none'
        })
        return
      }

      consigneeInfo  = this.data.consigneeInfo
      // 将新增的收货人推入本地缓存里
      wx.setStorageSync('historyAddress', this.data.historyAddress.concat(consigneeInfo))
    }

    // 清空缓存的姓名和手机号
    wx.setStorageSync('consigneeInfo', {})
    console.log('查看数据保存成功了吗', consigneeInfo)

    app.globalData.orderInfo.consigneeInfo = consigneeInfo
    navigateTo({
      url: 'order',
      navigateType: 'navigateBack'
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
    // 初始化收货人数据
    const {province, city, district, detailInfo} = app.globalData.orderInfo.addressInfo || {}
    // 获取缓存的姓名和手机号
    const {userName, telNumber} = wx.getStorageSync('consigneeInfo') || {}

    this.setData({
      // historyAddress,
      consigneeInfo: {
        userName: userName || '',
        telNumber: telNumber || '',
        provinceName: province || '',
        cityName: city || '',
        countyName: district || '',
        detailInfo: detailInfo || ''
      }
    })
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
