// components/w-records-item/w-records-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recordsitem: {
      type: Object,
      value: {}
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
    itemClick(event) {
      // 1.获取id
      const id = this.data.recordsitem;
      
      // 2.跳转到对应的路径
      wx.navigateTo({
        url: '/pages/detail/detail?id=' + id,
      })
    }
  }
})
