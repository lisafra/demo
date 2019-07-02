//app.js


App({
  onLaunch: function () {

    this.getCityData()

    // 登录
    // wx.login({
    //   success: res => {}
    // })

    // 获取

    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })


  },
  getCityData () {
    // 获取高德地图的城市数据，并缓存到本地， 如果本地已存在城市数据则不再请求
    if (!wx.getStorageSync('citys')) {
      wx.request({
        url: "https://restapi.amap.com/v3/config/district?subdistrict=3&key=bb4198a1f146184af53322d424732f6b",
        method: "GET",
        success: function (res) {
          console.log(res['data']['districts'][0]['districts']);
          //  请求到数据 存在本地
          wx.setStorageSync('citys', res['data']['districts'][0]['districts']);
        }
      })
    }
  },

  navigateTo (e){
    if (!e) return
    const { url, navigateType, params } = e.url ? e : e.currentTarget.dataset
    console.log('监听路由', e, params)

    wx[!navigateType ? 'navigateTo' : navigateType]({
      url: this.formatUrlParams(this.globalData.path[url], params)
    })
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
      console.log('查看参数', value, typeof value)
      params[key] = value.indexOf('{') !== -1 ? JSON.parse(value) : decodeURIComponent(value)
    })
    return params
  },

  getLocation() {
    const that = this
    wx.getLocation({
      success(res) {
        console.log(res)
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
