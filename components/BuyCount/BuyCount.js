// components/BuyCount/BuyCount.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: Number,
      value: 1,
      observer: function (newVal, old, info) {
        console.log(newVal, old, info)
        this.setData({num: newVal})
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 使用data数据对象设置样式名
  },

  attached () {
    console.log('初始化buyCount数据', this.data)
    this.setData({
      num: this.data.value,
      minusStatus: this.data.value > 1 ? ''  : 'disabled'
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _emitChange(num) {
      this.triggerEvent('change', {value: num})
    },

    bindMinus: function() {
      var num = this.data.num;
      // 如果大于1时，才可以减
      if (num > 1) {
        num --;
      }
      // 只有大于一件的时候，才能normal状态，否则disable状态
      var minusStatus = num <= 1 ? 'disabled' : 'normal';
      // 将数值与状态写回
      this.setData({
        num,
        minusStatus: minusStatus
      });
      this._emitChange(num)
    },
    /* 点击加号 */
    bindPlus: function() {
      var num = this.data.num;
      // 不作过多考虑自增1
      num ++;
      // 只有大于一件的时候，才能normal状态，否则disable状态
      var minusStatus = num < 1 ? 'disabled' : 'normal';
      // 将数值与状态写回
      this.setData({
        num,
        minusStatus: minusStatus
      });
      this._emitChange(num)
    },
    /* 输入框事件 */
    bindManual: function(e) {
      var num = e.detail.value;
      // 将数值与状态写回
      this.setData({
        num
      });
      this._emitChange(num)
    }
  }
})
