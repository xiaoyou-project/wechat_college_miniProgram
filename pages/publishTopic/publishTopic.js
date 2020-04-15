// pages/publishTopic/publishTopic.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,//存储是否登录
    title: '',//发布的话题标题
    content: '',//发布话题的内容
  },
  titleChange: function (e) {//填写话题标题
    // console.log("话题标题改变的时候：", e.detail.value);
    this.setData({
      title: e.detail.value
    });
  },
  contentChange: function (e) {//填写话题内容
    // console.log("内容改变的时候：", e.detail.value);
    this.setData({
      content: e.detail.value
    });
  },
  theFailMeg: function (title) {//提示信息函数
    wx.showToast({
      title: title,
      image: '../../image/登录失败.png'
    });
  },
  submitCard: function () {//发布话题
    console.log("发布话题");
    let that = this;
    if(this.data.isLogin==true){//用户已经登录了
      wx.request({//发布话题
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        url: app.globalData.sameUrl + app.globalData.topicalRelease,
        data: {
          userId: app.globalData.userID,
          title: that.data.title,
          content: that.data.content
        },
        method: 'post',
        success: (res) => {
          if (res.data.code == 1) {//发布话题成功
            wx.navigateTo({
              url: '/pages/topicList/topicList'
            });
          } else {
            that.theFailMeg("发布话题失败");
          }
        },
        fail: (res) => {
          that.theFailMeg("发布话题失败");
        }
      });
    }else{
      wx.navigateTo({//去登录界面
        url: '/pages/login/login'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("发布话题界面");
    this.setData({
      isLogin: app.globalData.isLogin
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
    this.onLoad();
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