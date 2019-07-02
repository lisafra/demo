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
    globalData
  },
  onLoad: function () {
    isLogin().then(res => {
      console.log('是否登录成功', res)
    })
  },

  navigateTo (e) {
    const { url } = e.currentTarget.dataset
    wx.navigateTo({ url })
  }
})
