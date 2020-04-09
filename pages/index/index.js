// pages/index/index.js
//我的界面
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: '',
    nickName: '',
  },

  //跳转到登录界面
  toLogin: function () {
    wx.navigateTo({
      url: '/pages/login/login'
    });
  },
  //进入个人中心
  toPersonalCenter:function(){
    wx.navigateTo({
      url: '/pages/personCenter/personCenter?userID=' + app.globalData.userID
    });
  },
  // 进入我的收藏
  toMyCollection: function(){
    wx.navigateTo({
      url: '/pages/myCollection/myCollection'
    });
  },
  // 进入我的消息
  toMyMessage: function () {
    wx.navigateTo({
      url: '/pages/myMessage/myMessage'
    });
  },
  // 进入联系客服
  toService: function () {
    wx.navigateTo({
      url: '/pages/service/service'
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取微信头像以及微信名称
    this.setData({
      imgUrl: app.globalData.userInfo.avatarUrl,
      nickName: app.globalData.userInfo.nickName
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