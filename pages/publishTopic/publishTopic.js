// pages/publishTopic/publishTopic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  submitCard: function () {//发布话题
    console.log("发布话题");
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("发布话题界面");
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