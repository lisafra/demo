// components/Cell/Cell.js
Component({
  options: {
    multipleSlots: true,
    styleIsolation: 'apply-shared'
  },
  externalClasses: ['custom-class']
  /**
   * 组件的属性列表
   */
  properties: {
    container: Boolean,
    label: String,
    value: String,
    arrow: Boolean,
    line: {
      type: Boolean,
      value: true
    },
    rightPadding: {
      type: Number,
      value: 0
    },
    noPadding:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function() { },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
    hide: function () { },
    resize: function () { },
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
