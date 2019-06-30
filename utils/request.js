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

  post (path = '', params = {}) {
    return this.request(path, params, 'POST')
  }

  get (path = '', params = {}) {
    return this.request(path, params, 'GET')
  }

  request (path, params, method) {
    const domain = this.getDomain()
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://${domain}/${path}`,
        data: params,
        method,
        success (res) {
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