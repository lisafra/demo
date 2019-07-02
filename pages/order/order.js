// pages/order/order.js
const app = getApp()
const { globalData } = app

Page({
  /**
   * 页面的初始数据
   */
  data: {
    payType: '现金支付',
    orderPayType: 1,
    consigneeData: null,
    // consigneeData: {
    //   buyerName: '王阿姨',
    //   buyerMobile: '189****2325',
    //   buyerProvince: '北京市',
    //   buyerCity: '',
    //   buyerAddress: '通州区梨园镇XXXX华业东方玫瑰C区4号60号楼，1803室，快递放门口'
    // },
    sku: '请输入SKU编号',
    store: '请选择',
    supplier: '诚和敬自营驿站',
    totalPrice: 1000,
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
      },
      {
        "skuID": 0,
        "storeID": 0,
        "storePrice": 0,
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

  submitOrder () {
    const {orderPayType, skuInfoVOs, storeId, supplier} = this.data
    console.log('下单啦', orderPayType, this)
    this.orderSuccess()

    // const params = {
    //   "buyerAddress": "string",
    //   "buyerCity": 0,
    //   "buyerMobile": "string",
    //   "buyerName": "string",
    //   "buyerProvince": 0,
    //   "orderPayType": 1,
    //   "skuInfoVOs": [
    //   {
    //     "skuCount": 0,
    //     "skuID": 0
    //   }
    // ],
    //   "storeId": 0,
    //   "supplier": "string"
    // }
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
