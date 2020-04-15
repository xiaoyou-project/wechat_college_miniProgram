// pages/plateList/plateList.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,//判断是否登录
    object9: [//板块列表
      // {
      //   id: 1,
      //   name: "学习英语",
      //   imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
      //   total: 66
      //   description: '板块的描述'
      // }
      ]
  },
  toExperienceList: function (e) {//去板块的经验列表界面
    let index = e.currentTarget.dataset.value;
    wx.navigateTo({
      url: '/pages/experienceList/experienceList?plateID=' + this.data.object9[index].id + '&description=' + this.data.object9[index].description + '&name=' + this.data.object9[index].name
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("板块列表页面");
    this.setData({//存储登录信息
      isLogin: app.globalData.isLogin
    });
    wx.request({//获取板块列表信息
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      url: app.globalData.sameUrl + app.globalData.platePlateList,
      data: {

      },
      method: 'get',
      success: (res) => {
        if (res.data.code == 1) {//获取成功
          this.setData({
            object9: res.data.data
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