// pages/topicList/topicList.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    object7: [
      {
        id: 1,
        title: "话题1的标题",
        view: 66
      },
      {
        id: 2,
        title: "话题2的标题",
        view: 66
      },
      {
        id: 3,
        title: "话题3的标题",
        view: 66
      },
      {
        id: 4,
        title: "话题4的标题",
        view: 66
      },
      {
        id: 5,
        title: "话题5的标题",
        view: 66
      },
      {
        id: 6,
        title: "话题6的标题",
        view: 66
      }
    ]
  },
  topicArticle: function (e) {//点击话题去话题页面
    let index = e.currentTarget.dataset.value;
    wx.navigateTo({
      url: '/pages/topicContent/topicContent?topicID=' + this.data.object7[index].id + '&userID=' + app.globalData.userID
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("话题列表页面");
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