/**
 * Created by Yulia on 2019/7/2.
 */

export const navigateTo  = (e) =>  {
  if (!e) return

  const { url } = e.currentTarget.dataset
  wx.navigateTo({ url })
}

export const formatLocation = (longitude, latitude) => {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }

  longitude = longitude.toFixed(2)
  latitude = latitude.toFixed(2)

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}

export const formVerify = (value, type) => {
  const error = {
    account: '用户名',
    password: '密码',
    name: '姓名',
    phone: '手机号',
    age: '年龄'
  }

  if (!value) {
    wx.showToast({
      title: `${error[type]}不能为空`
    })
    return false
  }
  return true
}
