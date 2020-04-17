// pages/test/test.js
import api from '../../utils/api.js'
// 测试界面
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  testFun: function(){
    console.log(app.globalData);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData);
    console.log("测试封装request请求");
    api.get(app.globalData.userUserInfo, {
      userId: app.globalData.userID
    }).then(res => {
      console.log("请求成功的返回数据", res);
    }).catch(err => {
      console.log("请求失败的返回数据", err);
    })
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