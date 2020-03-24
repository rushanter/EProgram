// pages/home/home.js
import {
  getMultiData,
  getProduct
} from '../../service/index.js'

import {
  FIRST,
  SECOND,
  THRID,
  BACK_TOP_POSITION
} from '../../common/const.js'
Page({
  data: {
    banners: [],
    recommends: [],
    titles: ["推荐", "热门", "精选"],
    records: {
      [FIRST]: {
        page: 1,
        list: []
      },
      [SECOND]: {
        page: 1,
        list: []
      },
      [THRID]: {
        page: 1,
        list: []
      },
    },
    currentType: FIRST,
    topPosition: 100,
    tabControlTop: 100,
    showBackTop: true,
    showTabControl: false
  },
  onLoad: function(options) {
    // 1.发送网络请求
    this._getData()
  },
  onReachBottom: function() {
    this._getProductData(this.data.currentType)
  },
  loadMore() {
    this._getProductData(this.data.currentType);
  },
  scrollPosition(e) {
    // 1.获取滚动的顶部
    const position = e.detail.scrollTop;
    console.log(e)
    // 2.设置是否显示
    this.setData({
      showBackTop: position > BACK_TOP_POSITION,
    })

    wx.createSelectorQuery().select('.tab-control').boundingClientRect((rect) => {
      const show = rect.top > 0
      this.setData({
        showTabControl: !show
      })
    }).exec()
  },
  onImageLoad() {
    wx.createSelectorQuery().select('.tab-control').boundingClientRect((rect) => {
      this.setData({
        tabControlTop: rect.top
      })
    }).exec()
  },
  onPageScroll(res) {
    // console.log(res)
  },
  tabClick(e) {
    // 1.根据当前的点击赋值最新的currentType
    let currentType = ''
    switch (e.detail.index) {
      case 0:
        currentType = FIRST
        break
      case 1:
        currentType = SECOND
        break
      case 2:
        currentType = THRID
        break
    }
    this.setData({
      currentType: currentType
    })
    // console.log(this.selectComponent('.tab-control'));
    this.selectComponent('.tab-control').setCurrentIndex(e.detail.index)
    this.selectComponent('.tab-control-temp').setCurrentIndex(e.detail.index)
  },

  onBackTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
    this.setData({
      showBackTop: true,
      topPosition: 0,
      tabControlTop: 0
    })
  },

  // 网络请求相关方法
  _getData() {
    this._getMultiData(); // 获取上面的数据
    this._getProductData(FIRST);
    this._getProductData(SECOND);
    this._getProductData(THRID);
  },
  _getMultiData() {
    getMultiData().then(res => {
      // 1.取出轮播所有的数据
      const banners = res.data
      const recommends = res.data
      // 2.设置数据
      this.setData({
        banners: banners,
        recommends: recommends

      })
    })
  },
  _getProductData(type) {

    // 1.获取数据对应的页码
    const page = this.data.records[type].page;

    // 2.请求数据
    getProduct(type, page).then(res => {
      // 1.取出数据
      const list = res.data

      // 2.将数据临时获取
      const records = this.data.records;
      records[type].list.push(...list)
      records[type].page += 1;

      // 3.最新的records设置到records中
      this.setData({
        records: records
      })
    })
  }
})