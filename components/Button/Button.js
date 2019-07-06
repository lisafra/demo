// components/Button/Button.js
Component({

  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value: '按钮',
    },
    disabled: {
      type: Boolean,
      value: false
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
    // onTap (e) {
    //   this.triggerEvent('tap', e)
    // }
  }
})
