// components/GoodsItem/GoodsItem.js
Component({
  options: {
    addGlobalClass: true,
    externalClasses: ['className']
  },
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object
    },
    index: Number,
    disabled: Boolean,
    line: {
      type: Boolean,
      value: true
    },
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
    deleteItem () {
      console.log(this.data)
      const {index} = this.data
      this.triggerEvent('onDelete', {index})
    },
    changeBuyCount(e){
      const {value} = e.detail
      let {data, index} = this.data
      data.buyCount = value
      console.log(e)
      this.triggerEvent('changeCount', {data, index})
    }
  }
})
