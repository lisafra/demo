/**
 * Created by Yulia on 2019/6/29.
 */
const app = getApp()
const { env, domain } = app.globalData

class Request {
  constructor (domainType) {
    this.domainType = domainType || 'man'
  }

  getDomain () {
    return domain[env][this.domainType]
  }

  post (path = '', params = {}, showError = true) {
    return this.request(path, params, 'POST', showError)
  }

  get (path = '', params = {}, showError = true) {
    return this.request(path, params, 'GET', showError)
  }

  request (path, params, method, showError) {
    const domain = this.getDomain()
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://${domain}/${path}`,
        header: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Cookie': wx.getStorageSync("cookieKey")
        },
        data: params,
        method,
        success (res) {
          //保存Cookie到Storage
          const setCookie = res && res.header && res['header']["Set-Cookie"] || ''
          if (setCookie) {
            wx.setStorageSync('cookieKey', setCookie)
          }

          // console.log('【来自接口的消息】', res)

          // 接口出错回到首页
          if (!res.data.success && showError) {
            wx.showModal({
              content: res.data.msg,
              showCancel: false,
              confirmColor: '#EF260E',
              success (res) {
                if (res.confirm) {
                  wx.navigateTo({url: globalData.path.index})
                }
              }
            })
          }

          resolve(res.data);
        },
        fail (err) {
          reject(err)
        }
      })
    })
  }
}

module.exports = Request
