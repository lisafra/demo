//index.js
const app = getApp()
import { isLogin, login, getCaptcha } from '../../api/account'
const { globalData, navigateTo } = app

Page({
  data: {
    loading: true,
    isLogin: false,
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
    isLogin().then(res => {
      console.log('是否登录成功', res)
      this.setData({isLogin: res.success, loading: false})
    }).catch(error => {
      this.setData({isLogin: false, loading: false})
    })

    getCaptcha().then(res => {})
  },

  loginSuccess() {
    console.log('【登录成功了】')
    this.setData({isLogin: true})
  }
})
