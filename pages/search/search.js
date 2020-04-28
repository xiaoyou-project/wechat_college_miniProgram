// pages/search/search.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取传递过来的参数
    console.log(options)
    wx.request({//获取话题列表
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      url: app.globalData.sameUrl + app.globalData.serachTopicalList,
      data: {
        content: options.key
      },
      method: 'get',
      success: (res) => {
        if (res.data.code == 1) {//获取成功
          this.setData({
            object7: res.data.data
          });
        } else {
          wx.showToast({
            title: "获取话题列表信息失败",
            image: '../../image/登录失败.png'
          });
        }
      },
      fail: (res) => {
        wx.showToast({
          title: "获取话题列表信息失败",
          image: '../../image/登录失败.png'
        });
      }
    });
  },
  topicArticle: function (e) {//点击话题去话题页面
    let index = e.currentTarget.dataset.value;
    let userId = 0;//用户没有登录就传0过去
    if (this.data.isLogin == true) {//这个用户登录了
      userId = app.globalData.userID;
    }
    wx.navigateTo({
      url: '/pages/topicContent/topicContent?topicalID=' + this.data.object7[index].id + '&userId=' + userId
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