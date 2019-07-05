// pages/register/register.js
import { addMember } from '../../api/user'
import {formVerify} from '../../utils/util'
const app = getApp()
const { navigateTo } = app

Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    age: '',
    bindPhone: '',
    gender: 0,
    name: '',
    storeID: '',
    zhuCanCard: '',
    genderList: ['男', '女', '未知'],
    genderValue: [1, 2, 3],
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onInput(e) {
    const data = {}
    data[e.currentTarget.dataset.type] = e.detail.value
    this.setData(data)
  },

  bindPickerChange(e) {
    const {value} = e.detail
    this.setData({gender: this.data.genderValue[value - 1]})
  },

  onRegister () {
    const {name, bindPhone, age, gender, loading} = this.data
    if (loading) return

    if (!formVerify(name, 'name')) return
    if (!formVerify(bindPhone, 'phone')) return
    if (!formVerify(age, 'age')) return

    this.setData({loading: true})

    addMember({name, bindPhone, age, gender})
      .then(res => {
        if (res.success) {
          wx.showToast({
            title: '注册成功！'
          })
          navigateTo({
            url: 'index',
            navigateType: 'redirectTo'
          })
        } else {
          this.setData({loading: false})
        }
      }).catch(error => {
      this.setData({loading: false})
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})