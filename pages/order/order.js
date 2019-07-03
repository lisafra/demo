// pages/order/order.js
const app = getApp()
const { globalData, navigateTo, decodeURL } = app


import {getSupplierList, getStoreUser} from '../../api/wares'
import {order} from '../../api/order'
import { formatPrice } from '../../utils/format.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    consigneeInfo: null,
    storeListPickerData: null,
    storeList: [{
      name: '请选择'
    }],
    searchWaresParam: {},
    storeIndex: 1,
    supplierIndex: 0,
    supplierList: null,
    wareIndex: 0,
    wareList: null,
    orderPayType: 0,
    payTypeConf: ['现金支付', '其它'],
    skuInfoVOs: null,
    totalCount: 0,
    totalPrice: 0
  },

  navigateTo,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getStoreUser({
      name: globalData.userInfo.name
    }).then(res => {
      if (res.success) {
          const storeList = [res.data]
          this.setData({
            storeListPickerData: storeList.map(item => item.name),
            storeList: this.data.storeList.concat(storeList)
          })
      }
    })

    getSupplierList().then(res => {
      if (res.success) {
        this.setData({
          supplierList: res.data,
          searchWaresParam: {
            supplierID: res.data[this.data.supplierIndex].id
          }
        })
      }
    })
  },

  computeOrderPriceInfo (wareList) {
    let totalPrice = 0
    let totalCount = 0
    let skuInfoVOs = []
    wareList.forEach(item => {
      totalCount += item.buyCount
      totalPrice += (item.storePrice * item.buyCount)
      skuInfoVOs.push({
        skuCount: item.buyCount,
        skuID: item.skuID
      })
    })

    this.setData({
      totalCount,
      totalPrice: formatPrice(totalPrice, false),
      skuInfoVOs})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  bindPickerChange(e) {
    console.log('【pick change】', e)
    const {value} = e.detail
    const {type} = e.target.dataset
    let changeObj = {}
    changeObj[type] = value - 0

    this.setData(changeObj)
    // console.log(changeObj, this.data)
  },

  // 下单前校验
  orderVerify(value, verifyType) {

    if (!value) {
      const errorMsg = {
        consigneeInfo: '请选择收货人信息',
        storeId: '请选择驿站',
        supplier: '请选择供应商'
      }

      wx.showToast({
        title: errorMsg[verifyType],
        icon: 'warn'
      })
      return false
    } else {
      return true
    }

  },


  submitOrder () {

    const {orderPayType, skuInfoVOs, storeIndex, storeList, supplierList, supplierIndex, consigneeInfo} = this.data
    const storeId = storeList[storeIndex].id
    const supplierId = supplierList[supplierIndex].id

    // 下单前校验
    if (!this.orderVerify(consigneeInfo, 'consigneeInfo')) return
    if (!this.orderVerify(storeId, 'storeId')) return
    if (!this.orderVerify(supplierId, 'supplier')) return

    const {provinceName, cityName, countyName, userName, telNumber, detailInfo} = consigneeInfo

    const orderInfoVO = {
      orderPayType: orderPayType + 1,
      storeId,
      supplier: supplierId,
      skuInfoVOs,
      buyerName: userName,
      buyerMobile: telNumber,
      areaCode: `${provinceName},${cityName},${countyName}`,
      buyerAddress: detailInfo
    }

    console.log('下单啦', orderInfoVO, consigneeInfo)

    order(orderInfoVO).then(res => {
      if (res.success) {
        this.orderSuccess()
      }
    })

  },

  // 下单成功后的回调
  orderSuccess () {
    wx.showModal({
      title: '下单成功',
      content: '您的订单已提交，请登录管理后台查看订单状态。',
      showCancel: false,
      confirmColor: '#EF260E',
      success (res) {
        if (res.confirm) {
          app.globalData.orderInfo = {}
          wx.navigateTo({url: globalData.path.index})
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const {consigneeInfo, wareList} = app.globalData.orderInfo

    this.setData({
      ...app.globalData.orderInfo
    })
    this.setDataByKey(consigneeInfo)
    this.setDataByKey(wareList)

    if(wareList) this.computeOrderPriceInfo(wareList)

    // console.log('获取页面参数', this.data, consigneeInfo, app.globalData.orderInfo)
  },

  setDataByKey(key = {}) {
    this.setData(key)
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
    console.log('触发这个hooks了吗， onUnload')
    app.globalData.orderInfo = {}
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
