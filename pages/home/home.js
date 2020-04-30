// pages/home/home.js
const app = getApp()

Page({
  data: {
    orderList: [{
        icon: 'message.png',
        info: '我的消息'
      },
      {
        icon: 'pointer.png',
        info: '积分商城'
      },
      {
        icon: 'vip.png',
        info: '会员卡'
      },
    ],
    serviceList: [{
        icon: 'cart.png',
        info: '我的购物车'
      },
    ],
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    console.log("ghg")
    if(app.globalData.userInfo) {
      console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }

    // wx.login({
    //   success: res => {
    //     console.log(res)
    //     var code = res.code;
    //     if (code) {
    //       console.log('code :' + code)
    //       // getOpenId(code)
    //     } else {
    //       console.log('获取用户登录态失败！' + res.errMsg)
    //       // util.showToastFail('获取用户登录态失败！' + res.errMsg)
    //     }
    //   },

    //   fail: function (res) {
    //     // util.showToastFail('登录失败')
    //     console.log('登录失败');
    //   }
    // })

  }
})