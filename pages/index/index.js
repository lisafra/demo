//index.js
const app = getApp()
import { isLogin, login, getCaptcha } from '../../api/account'
const { globalData, navigateTo } = app

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
    globalData
  },

  navigateTo,

  onLoad: function () {

    getCaptcha().then(res => {

    })

    login({
      account: 'ylk',
      password: 123456
    }).then(res => {
      console.log('登录成功了吗', res)
      if (res.data) {
        app.globalData.userInfo.name = res.data
      }
      console.log(getApp())
      isLogin().then(res => {
        console.log('是否登录成功', res)
      })
    })
  }
})
