// pages/searchWares/searchWares.js

import {getWareList} from '../../api/wares'
import { formatPrice } from '../../utils/format.js'

const app = getApp()
const { navigateTo } = app

Page({

  /**
   * 页面的初始数据
   */
  data: {
    supplierID: '',
    searchHistoryRecord: null,
    searchResult: null
    // searchResult: [{
    //   groupPrice: 300.3,
    //   groupStock: "200.01",
    //   mainImageUrl: "//static.chj-inn.com/ware/ware.png",
    //   skuID: 6501,
    //   storeID: 2501,
    //   storePrice: 300.3,
    //   storeStock: "200.00",
    //   supplierID: 1501,
    //   wareBusinessType: 1,
    //   wareIntroduction: "详细描述333",
    //   wareName: "端午节嘉兴粽子咸鸭蛋酱鸭大礼包 端午十粽十味双层竹篮礼篮1968g",
    //   wareOrigin: "地产",
    //   wareProductType: 1,
    //   wareSlogan: "广告语",
    //   wareTemperatureDescription: 2,
    //   wareTypeOfMeasurement: 1,
    //   wareUnitOfMeasurement: 2,
    //   checked: false
    // },
    //   {
    //     groupPrice: 300.3,
    //     groupStock: "200.01",
    //     mainImageUrl: "//static.chj-inn.com/ware/ware.png",
    //     skuID: 6501,
    //     storeID: 2501,
    //     storePrice: 300.3,
    //     storeStock: "200.00",
    //     supplierID: 1501,
    //     wareBusinessType: 1,
    //     wareIntroduction: "详细描述333",
    //     wareName: "端午节嘉兴粽子咸鸭蛋酱鸭大礼包 端午十粽十味双层竹篮礼篮1968g",
    //     wareOrigin: "地产",
    //     wareProductType: 1,
    //     wareSlogan: "广告语",
    //     wareTemperatureDescription: 2,
    //     wareTypeOfMeasurement: 1,
    //     wareUnitOfMeasurement: 2,
    //     checked: false,
    //   }
    // ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {supplierID} = options
    if (supplierID) this.setData({supplierID})

    console.log('【初始化页面数据】', this.data)
  },

  searchWares (e) {

    const {keyword} = e.detail
    const params = {}
    if (keyword) {
      const keywordNumber = keyword - 0
      params[isNaN(keywordNumber) ? 'skuName' : 'skuId'] = isNaN(keywordNumber) ? keyword : keywordNumber
    }
    console.log('调用searc接口了', params)
    // 6501
    getWareList({
      ...params,
      supplierID: this.data.supplierID
    }).then(res => {
      this.setData({
        searchResult: res.data.map(item => {
          item.buyCount = 1
          item.checked = false
          item.priceLabel = `￥${formatPrice(item.storePrice, false)}`
          return item
        })
      })
    })
  },

  selectItem(e) {
    console.log(e)
    const {index} = e.currentTarget.dataset
    let {searchResult} = this.data
    searchResult[index].checked = !searchResult[index].checked
    this.setData({
      searchResult
    })
  },

  onConfirm(e) {
    const wareList = this.data.searchResult
    const selectWare = wareList.filter(item => item.checked === true)
    app.globalData.orderInfo.wareList = selectWare
    if (!selectWare.length) {
      wx.showToast({
        title: '请选择商品'
      })
      return
    }
    console.log(selectWare, wareList)
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
