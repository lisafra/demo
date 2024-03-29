// pages/order/order.js
import { getSupplierList, getStoreUser } from '../../api/wares'
import { order } from '../../api/order'
import { formatPrice } from '../../utils/format.js'
import { formVerify, showModal } from '../../utils/util'
import { STORE_TYPE } from '../../utils/constants'


const app = getApp()
const { globalData, navigateTo } = app

Page({
  /**
   * 页面的初始数据
   */
  data: {
    STORE_TYPE,
    consigneeInfo: null,
    storeListPickerData: null,
    storeList: [{name: '请选择'}],
    searchWaresParam: {},
    storeIndex: 1,
    supplierIndex: 0,
    supplierList: null,
    supplierListPickerData: null,
    wareIndex: 0,
    wareList: null,
    orderPayType: 0,
    payTypeConf: ['现金支付', '其它'],
    totalCount: 0,
    totalPrice: 0,
    skuInfoVOs: [],
    loading: false
  },

  navigateTo,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.initPageDataBaseGlobalData()

    // TODO 获取驿站列表
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

    // 获取当前用户下的一个供应商
    getSupplierList().then(res => {
      if (res.success) {
        this.setData({
          supplierList: res.data,
          supplierListPickerData: res.data.map(item => item.name),
          searchWaresParam: {
            supplierID: res.data[this.data.supplierIndex].id
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initPageDataBaseGlobalData()
  },

  initPageDataBaseGlobalData () {
    // console.log('获取页面参数', app.globalData.orderInfo)
    this.setData({
      ...app.globalData.orderInfo
    })
    this.computeOrderPriceInfo()
  },

  // 根据wareList计算总购买数量、总价、skuInfoVOs
  computeOrderPriceInfo () {
    let totalPrice = 0
    let totalCount = 0
    let skuInfoVOs = []
    const wareList = app.globalData.orderInfo.wareList || []

    wareList.forEach(item => {
      let { buyCount } = item
      buyCount = isNaN(buyCount) ? 1 : buyCount - 0
      totalCount += buyCount
      totalPrice += (item.storePrice * buyCount)
      skuInfoVOs.push({
        skuCount: item.buyCount,
        skuID: item.skuID,
        storeStock: item.storeStock
      })
    })

    console.log(wareList, totalPrice, totalCount)

    this.setData({
      totalCount,
      wareList,
      totalPrice: formatPrice(totalPrice, false),
      skuInfoVOs
    })
  },

  // picker 事件统一处理函数
  bindPickerChange(e) {
    const {value} = e.detail
    const {type} = e.target.dataset
    let changeObj = {}
    changeObj[type] = value - 0
    this.setData(changeObj)
    if (type === 'supplierIndex') {
      const {supplierList} = this.data
      app.globalData.orderInfo.wareList = null
      this.setData({
        wareList: null,
        searchWaresParam: {
          supplierID: supplierList[value - 0].id
        }
      })
      console.log('【pick change】', this.data)

    }
  },

  // 删除商品
  deleteWare(e) {
    const {index} = e.detail
    app.globalData.orderInfo.wareList.splice(index, 1)
    this.computeOrderPriceInfo()
    // console.log('删除商品', e, app.globalData.orderInfo)
  },

  // 修改商品数量
  changeWareCount(e) {
    const {data, index} = e.detail
    // 如果数据是O, 需要弹框提示是否删除
    if (!(data.buyCount - 0)) {
      showModal({
        content: '商品数量不能为0， 是否要删除此商品？',
        showCancel: true,
        cancelText: '否',
        confirmText: '是',
        success: res => {
          console.log('是', res)
          if (res.confirm) {
            this.deleteWare(e)
            return
          } else {
            console.log('不删除商品')
            data.buyCount = 1
            app.globalData.orderInfo.wareList[index] = data
            this.computeOrderPriceInfo()
          }
        }
      })
    } else {
      console.log('change data', data)
      app.globalData.orderInfo.wareList[index] = data
      this.computeOrderPriceInfo()
    }
  },

  checkStoreStock (skuInfoVOs) {
    const exceedStock = skuInfoVOs.filter(item => item.skuCount > item.storeStock - 0)
    console.log(exceedStock, skuInfoVOs)
    return !exceedStock.length
  },

  // 下单
  submitOrder () {
    if (this.data.loading) return
    this.setData({loading: true})

    const {orderPayType, storeIndex, skuInfoVOs, storeList, supplierList, supplierIndex} = this.data
    const storeId = storeList[storeIndex].id
    const supplierId = supplierList[supplierIndex].id
    const {consigneeInfo} = app.globalData.orderInfo

    // 下单前校验
    if (!formVerify(consigneeInfo, 'consigneeInfo') || !formVerify(storeId, 'storeId') || !formVerify(supplierId, 'supplier') || !formVerify(skuInfoVOs.length, 'skus')) {
      this.setData({loading: false})
      return
    }
    console.log('查看商品库存', skuInfoVOs)
    if (!this.checkStoreStock(skuInfoVOs)) {
      wx.showToast({
        title: '库存不足，请修改购买数量',
        icon: 'none'
      })
      this.setData({loading: false})
      return
    }

    const {provinceName, cityName, countyName, userName, telNumber, detailInfo} = consigneeInfo

    // 过滤skuInfoVOs
    const skuInfo = skuInfoVOs.map(item => {
      const {skuCount, skuID} = item
      return {skuCount, skuID}
    })

    order({
      orderPayType: orderPayType + 1,
      storeId,
      supplier: supplierId,
      skuInfoVOs: skuInfo,
      buyerName: userName,
      buyerMobile: telNumber,
      areaCode: `${provinceName},${cityName},${countyName}`,
      buyerAddress: detailInfo
    }).then(res => {
      if (res.success) {
        this.orderSuccess()
      } else {
        this.setData({loading: false})
      }
    }).catch(error => {
      this.setData({loading: false})
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
          wx.reLaunch({url: globalData.path.index})
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('触发这个hooks了吗， onUnload')
    app.globalData.orderInfo = {}
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})
