// pages/topicList/topicList.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animation: '',
    buttonName: 'fade',
    isLogin: false,//判断是否登录
    object7: [//话题列表
      // {
      //   id: 1,
      //   title: "话题1的标题",
      //   view: 66
      // }
    ]
  },
  topicArticle: function (e) {//点击话题去话题页面
    let index = e.currentTarget.dataset.value;
    let userId = 0;//用户没有登录就传0过去
    if(this.data.isLogin==true){//这个用户登录了
      userId = app.globalData.userID;
    }
    wx.navigateTo({
      url: '/pages/topicContent/topicContent?topicalID=' + this.data.object7[index].id + '&userId=' + userId
    });
  },
  toPublishTopic: function (e) {//去发布话题界面
    console.log(e);
    let that = this;
    var anmiaton = e.currentTarget.dataset.class;
    that.setData({
      animation: anmiaton
    })
    setTimeout(function () {
      that.setData({
        animation: ''
      }, () => {
        wx.navigateTo({
          url: '/pages/publishTopic/publishTopic'
        });
      })
    }, 500);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("话题列表页面");
    this.setData({//存储登录信息
      isLogin: app.globalData.isLogin
    });
    wx.request({//获取话题列表
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      url: app.globalData.sameUrl + app.globalData.topicalTopicalList,
      data: {
        
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad();
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