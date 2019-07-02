// components/Button/Button.js
const citys = wx.getStorageSync('citys')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {
        province: '',
        city: '',
        county: '',
      },
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    provinces: [],
    citys: [],
    districts: [],
    value: [0, 0, 0],
    isShow: false
  },

  attached() {
    this.initCityData()
  },


  /**
   * 组件的方法列表
   */
  methods: {
    initCityData () {
      citys.sort((a, b) => {
        if (a['adcode'] - 0 < b['adcode'] - 0) {
          return -1;
        }
        if (a['adcode'] - 0 > b['adcode'] - 0) {
          return 1;
        }
        return 0;
      });

      this.setData({
        provinces: citys,
        citys: citys[0]['districts'],
        districts: citys[0]['districts'][0]['districts']
      });

      console.log('获取城市数据', this.data)
    },

    bindChange(e) {
      let val = e.detail.value;
      const { value, provinces} = this.data

      this.setData({
        value: val,
        citys: provinces[val[0]]['districts'].length > 0 ? provinces[val[0]]['districts'] : [],
        districts: provinces[val[0]]['districts'].length > 0 ? (provinces[val[0]]['districts'][val[1]] ? provinces[val[0]]['districts'][val[1]]['districts'] : []) : ''
      })
      this.onConfirm()
    },

    onConfirm() {
      const {value, provinces, citys, districts} = this.data
      const [province, city, district] = value;
      console.log('选择的城市变了', this.data)
      this.triggerEvent('selected',{
        province: provinces[province].name,
        city: citys.length > 1 ? citys[city].name : '',
        district: districts[district].name
      })
    }
  }
})
