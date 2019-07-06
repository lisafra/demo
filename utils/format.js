/**
 * Created by Yulia on 2019/7/2.
 */
export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(_formatNumber).join('/') + ' ' + [hour, minute, second].map(_formatNumber).join(':')
}

/*
 * @price : 金额
 * @unitCent: 单位分
 * @result: 10000000 => "100, 000.00"
 * */
export const formatPrice = (price, unitCent = true) => {

  price = price - 0

  if (isNaN(price)) return false

  price = unitCent ? price / 100 : price * 100 / 100

  return price.toFixed(2).replace(/^(-?\d+)(\d{3})(\.?\d*)/, '$1, $2$3')

}


const _formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
