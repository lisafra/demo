// components/Search/Search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: {
      type: String
    },
    inputType: {
      type: String,
      value: 'text'
    },
    value: String,
    disabled: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    keyword: ''
  },

  attached () {
    this.setData({keyword: this.data.value})
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onInput(e) {
      console.log('【search input】', e)
      this.setData({keyword: e.detail.value})
    },
    onSearch() {
      console.log('【search confirm】', this.data.keyword)
      this.triggerEvent('search', {keyword: this.data.keyword})
    }

  }
})
