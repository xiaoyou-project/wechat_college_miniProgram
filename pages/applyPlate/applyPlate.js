// pages/applyPlate/applyPlate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',//申请的板块名字
    content: '',//申请板块的描述
  },
  nameChange: function (e) {//填写板块名字
    // console.log("板块名字改变的时候：", e.detail.value);
    this.setData({
      name: e.detail.value
    });
  },
  contentChange: function (e) {//填写板块描述内容
    // console.log("内容改变的时候：", e.detail.value);
    this.setData({
      content: e.detail.value
    });
  },
  submitCard: function () {//提交板块申请
    console.log("提交板块申请");
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("申请板块界面");
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