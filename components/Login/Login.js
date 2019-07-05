// components/Login/Login.js

import { login } from '../../api/account'

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    captcha: '',
    account: '',
    password: '',
    loading: false
  },

  created() {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onInput(e) {
      const data = {}
      data[e.currentTarget.dataset.type] = e.detail.value
      this.setData(data)
    },

    formVerify(value, type) {
      const error = {
        account: '用户名',
        password: '密码'
      }
      if (!value) {
        wx.showToast({
          title: `${error[type]}不能为空`
        })
        this.setData({loading: false})
        return false
      }
      return true
    },

    onLogin () {
      const {account, password, loading} = this.data
      if (loading) return

      if (!this.formVerify(account, 'account')) return
      if (!this.formVerify(password, 'password')) return

      this.setData({loading: true})

      login({account, password}).then(res => {
        if (res.success) {
          this.triggerEvent('success')
        } else {
          this.setData({
            loading: false,
            password: ''
          })
        }
      }).catch(err => {
        this.setData({loading: false})
        console.log(err)
      })
    }
  }
})
