// components/Login/Login.js

import { login } from '../../api/account'
import { formVerify } from '../../utils/util'

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

    onLogin () {
      const {account, password, loading} = this.data
      if (loading) return

      if (!formVerify(account, 'account')) return
      if (!formVerify(password, 'password')) return

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
