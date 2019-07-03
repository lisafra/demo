//app.js


App({
  onLaunch: function () {

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
      wareList: null
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
