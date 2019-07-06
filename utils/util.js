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
    age: '年龄',
    consigneeInfo: '收货人',
    storeId: '驿站',
    supplier: '供应商'
  }

  let title = ``

  if (value && type === 'phone' && value.length < 11) {
    title = '请输入正确的手机号'
  }

  if (!value || title) {
    wx.showToast({
      title: title || `${error[type]}不能为空`,
      icon: 'none'
    })
    return false
  }
  return true
}

export const showModal = ({title = '', content = '', showCancel = false, confirmColor = "#EF260E", success, cancelText,confirmText}) =>  {
  wx.showModal({
    title,
    content,
    showCancel,
    confirmColor,
    cancelText,
    confirmText,
    success
  })
}
