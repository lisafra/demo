// components/Cell/Cell.js
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    container: {
      type: Boolean,
      value: false
    },
    label: {
      type: String
    },
    value: {
      type: String
    },
    arrow: {
      type: Boolean
    },
    line: {
      type: Boolean,
      value: true
    },
    rightPadding: {
      type: Number,
      value: 0
    },
    noPadding: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
