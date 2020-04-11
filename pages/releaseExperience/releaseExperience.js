// pages/releaseExperience/releaseExperience.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',//发布的经验标题
    content: '',//发布经验的内容
    imgList: [],//上传的图片

  },
  titleChange: function (e) {//填写经验标题
    // console.log("经验标题改变的时候：", e.detail.value);
    console.log(this.data);
    this.setData({
      title: e.detail.value
    });
  },
  contentChange: function (e) {//填写经验内容
    // console.log("内容改变的时候：", e.detail.value);
    this.setData({
      content: e.detail.value
    });
  },
  submitCard: function () {//发布话题
    console.log("发布话题");
  },
  ViewImage(e) {//上传图片
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  ChooseImage() {//上传图片
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  DelImg(e) {//删除图片
    wx.showModal({
      title: '提示',
      content: '确定要删除选中的图片么？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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