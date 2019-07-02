// pages/order/order.js
const app = getApp()
const { globalData, navigateTo, decodeURL } = app

import { formatPrice } from '../../utils/format.js'

import {getSupplierList, getStoreList, getStoreUser} from '../../api/wares'
import {order} from '../../api/order'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    consigneeInfo: null,
    sku: '请输入SKU编号',
    storeIndex: 0,
    supplier: '诚和敬自营驿站',
    payTypeConfig: {
      1: '现金支付',
      2: '其它支付'
    },
    orderPayType: 1,
    totalPrice: 0,
    skuInfoVOs: [
      {
        skuCount: 1,
        skuID: 123
      },
      {
        skuCount: 1,
        skuID: 345
      }
    ],
    storeListPickerData: ['月球', '月球'],
    storeList: [{
      name: '请选择'
    }],
    supplierList: [
      {
        "abbreviation": "string",
        "code": "string",
        "contactName": "string",
        "contactPhone": "string",
        "created": "2019-06-30T06:07:36.981Z",
        "groupType": 0,
        "id": 0,
        "isEnable": true,
        "lastOperatorAccount": "string",
        "modified": "2019-06-30T06:07:36.981Z",
        "name": "string",
        "supplierStatus": 0,
        "supplierType": 0
      }
    ],
    wareList: [
      {
        "groupPrice": 0,
        "groupStock": "string",
        "skuID": 0,
        "storeID": 0,
        "storePrice": 1989,
        "storeStock": "string",
        "supplierID": 0,
        "wareBusinessType": 0,
        "wareIntroduction": "string",
        "wareName": "端午节嘉兴粽子咸鸭蛋酱鸭大礼包端午十粽十味双层竹篮礼篮1968g",
        "wareOrigin": "string",
        "wareProductType": 0,
        "wareSlogan": "string",
        "wareTemperatureDescription": 0,
        "wareTypeOfMeasurement": 0,
        "wareUnitOfMeasurement": 0
      }
    ]
  },

  navigateTo,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const {consigneeInfo} = decodeURL(options)

    if (consigneeInfo) {
      this.setData({consigneeInfo})
    }
    console.log('获取页面参数', this.data, consigneeInfo)

    getStoreList({
      VO: {}
    }).then(res => {
      if (res.success) {
        const storeList = res.data && res.data.records
        this.setData({
          storeListPickerData: storeList.map(item => item.name),
          storeList: this.data.storeList.concat(storeList)
        })

        console.log(' 【展示驿站数据】', this.data)
      }
    })

    getStoreUser({
      name: globalData.userInfo.name
    }).then(res => {

    })

    getSupplierList().then(res => {

    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  bindPickerChange(e) {
    console.log('【pick change】', e)
    const {value} = e.detail
    this.setData({
      storeIndex: value
    })
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

    const {orderPayType, skuInfoVOs, storeIndex, storeList, supplier, consigneeInfo} = this.data

    // 下单前校验
    if (!this.orderVerify(consigneeInfo, 'consigneeInfo')) return
    if (!this.orderVerify(storeIndex, 'storeId')) return
    if (!this.orderVerify(supplier, 'supplier')) return

    const orderInfoVO = {
      orderPayType,
      // storeId: storeList[storeIndex].id,
      storeId: 0,
      supplier,
      skuInfoVOs,
      buyerName: consigneeInfo.userName,
      buyerMobile: consigneeInfo.telNumber,
      buyerProvince: consigneeInfo.provinceName,
      buyerCity: consigneeInfo.cityName,
      buyerAddress: consigneeInfo.countyName + consigneeInfo.detailInfo,
    }

    console.log('下单啦', orderInfoVO, consigneeInfo)

    order({ orderInfoVO }).then(res => {
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
          wx.navigateTo({url: globalData.path.index})
        }
      }
    })
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
