//app.js


App({
  onLaunch: function () {},

  navigateTo (e){
    if (!e) return
    console.log(e)
    const { url, navigateType, params } = e.url ? e : e.currentTarget.dataset
    console.log('监听路由', e, params, navigateType)

    const linkUrl = !url ? url : this.formatUrlParams(this.globalData.path[url], params)

    wx[!navigateType ? 'navigateTo' : navigateType]({url: linkUrl})
  },

  formatUrlParams(url, params) {
    let stringParams = !params ? '' : '?'

    if (params) {
      const paramKeys = Object.keys(params)
      paramKeys.forEach((key, index) => {
        const endSymbol = index < paramKeys.length - 1 ? '&' : ''
        const value = params[key]
        const formatValue = typeof value === 'string' ? encodeURIComponent(value) : JSON.stringify(value)
        stringParams += `${key}=${formatValue}${endSymbol}`
      })
    }

    return url + stringParams
  },

  decodeURL (params = {}) {
    Object.keys(params).forEach(key=> {
      let value = params[key]
      if (typeof value === 'object') value = JSON.stringify(value)
      // console.log('查看参数', value, typeof value)
      params[key] = value.indexOf('{') !== -1 ? JSON.parse(value) : decodeURIComponent(value)
    })
    return params
  },

  getLocation() {
    const that = this
    wx.getLocation({
      success(res) {
        // console.log(res)
        that.setData({
          hasLocation: true,
          location: formatLocation(res.longitude, res.latitude)
        })
      }
    })
  },

  globalData: {
    userInfo: {},
    env: 'pre',
    orderInfo: {
      consigneeInfo: null,
      wareList: []
      // wareList: [{
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
      //   priceLabel: 10.00,
      //   checked: true,
      //   buyCount: 2
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
      //     wareName: "端午节嘉兴粽子",
      //     wareOrigin: "地产",
      //     wareProductType: 1,
      //     wareSlogan: "广告语",
      //     wareTemperatureDescription: 2,
      //     wareTypeOfMeasurement: 1,
      //     wareUnitOfMeasurement: 2,
      //     priceLabel: 12.00,
      //     checked: true,
      //     buyCount: 1
      //   }
      // ]
    },
    path: {
      index: '/pages/index/index',
      register: "/pages/register/register",
      searchWares: "/pages/searchWares/searchWares",
      order: "/pages/order/order",
      consigneeInfo: "/pages/consigneeInfo/consigneeInfo",
      selectArea: "/pages/selectArea/selectArea"
    },
    domain: {
      pre: {
        sso: 'sso-api-pre.chj-inn.com',
        man: 'man-api-pre.chj-inn.com',
        qqMap: 'apis.map.qq.com',
      },
      online: {
        sso: 'sso-api.chj-inn.com',
        man: 'man-api.chj-inn.com',
        qqMap: 'apis.map.qq.com'
      }
    }
  }
})
