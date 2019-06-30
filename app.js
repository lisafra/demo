//app.js
// import { isLogin } from 'api/account'


App({
  onLaunch: function () {

    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // isLogin.then(res => {
        //   console.log('是否登录成功')
        // })
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })


  },
  globalData: {
    userInfo: null,
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
        man: 'man-api-pre.chj-inn.com'
      },
      online: {
        sso: 'sso-api.chj-inn.com',
        man: 'man-api.chj-inn.com'
      }
    }
  }
})
