//index.js
const app = getApp()
import { isLogin } from '../../api/account'
const { globalData } = app

Page({
  data: {
    pageText: {
      nav: [
        {
          title: '注册会员',
          desc: '快速注册用户',
          icon: 'user',
          linkTo: 'register'
        },{
          title: '代下单',
          desc: '帮助老人下单',
          icon: 'submit',
          linkTo: 'order'
        },
      ]
    },
    globalData,
    userInfo: {},
    hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),

  },
  //事件处理函数
  bindViewTap (e) {
    console.log('点击事件发生了', e)
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad: function () {
    isLogin().then(res => {
      console.log('是否登录成功', res)
    })
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
  navigatorTo（e）{
    wx.navigatorTo({url: e.detail.url})
  }
})
