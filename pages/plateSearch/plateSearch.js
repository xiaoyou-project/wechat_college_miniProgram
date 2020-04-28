// pages/plateSearch/plateSearch.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  experienceArticle: function (e) {//点击经验去经验页面
    let index = e.currentTarget.dataset.value;
    wx.navigateTo({
      url: '/pages/experienceContent/experienceContent?shareID=' + this.data.object10[index].id + '&userID=' + app.globalData.userID + '&plateID=' + this.data.plateID + '&name=' + this.data.name + '&description=' + this.data.description
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({//获取板块列表信息
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      url: app.globalData.sameUrl + app.globalData.serachShareList,
      data: {
        content:options.key
      },
      method: 'get',
      success: (res) => {
        if (res.data.code == 1) {//获取成功
          console.log(res.data)
          this.setData({
            object10: res.data.data
          });
        } else {
          wx.showToast({
            title: "获取板块列表信息失败",
            image: '../../image/登录失败.png'
          });
        }
      },
      fail: (res) => {
        wx.showToast({
          title: "获取板块列表信息失败",
          image: '../../image/登录失败.png'
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})