// pages/myCollection/myCollection.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,//判断是否登录
    myCollection: 0,
    object1: [
      // {//经验列表
      //   id: 1,
      //   title: "经验1的标题",
      //   time: '2020-2-29',
      //   view: 666,
      //   good: 777,
      //   description: '这是一些简略信息，这是一些简略信息，这是一些简略信息、、、、',
      //   img: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
      //   plate: "如果学习英语"
      // }
    ],
    object2: [
      // {//话题列表
      //   id: 1,
      //   name: "话题1的名字",
      //   time: '2020-2-29',
      //   view: 666,
      //   good: 777,
      //   description: '这是一些简略信息，这是一些简略信息，这是一些简略信息、、、、'
      // }
    ]
  },
  collectionTopic: function(){//我收藏的话题
    this.setData({
      myCollection: 1
    });
  },
  topicArticle: function (e) {//点击话题去话题页面
    let index = e.currentTarget.dataset.value;
    wx.navigateTo({
      url: '/pages/topicContent/topicContent?topicalID=' + this.data.object2[index].id + '&userId=' + app.globalData.userID
    });
  },
  collectionShare: function () {//我收藏的经验
    this.setData({
      myCollection: 0
    });
  },
  experienceArticle: function (e) {//点击经验去经验页面
    let index = e.currentTarget.dataset.value;
    wx.navigateTo({
      url: '/pages/experienceContent/experienceContent?shareID=' + this.data.object1[index].id + '&userID=' + app.globalData.userID
    });
  },
  toLogin() {//去登录
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({//先存储是否登录的情况
      isLogin: app.globalData.isLogin
    });
    if(app.globalData.isLogin == true){//这个用户已经登录了
      //获取个人收藏的数据
      wx.request({//获取个人收藏的经验
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        url: app.globalData.sameUrl + app.globalData.userCollectShareList,
        data: {
          userId: app.globalData.userID
        },
        method: 'get',
        success: (res) => {
          if (res.data.code == 1) {//获取成功
            this.setData({
              object1: res.data.data
            })
          } else {
            wx.showToast({
              title: "获取用户收藏经验失败",
              image: '../../image/登录失败.png'
            });
          }
        },
        fail: (res) => {
          wx.showToast({
            title: "获取用户收藏话题失败",
            image: '../../image/登录失败.png'
          });
        }
      });
      wx.request({//获取个人收藏的话题
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        url: app.globalData.sameUrl + app.globalData.userCollectTopicalList,
        data: {
          userId: app.globalData.userID
        },
        method: 'get',
        success: (res) => {
          if (res.data.code == 1) {//获取成功
            this.setData({
              object2: res.data.data
            })
          } else {
            wx.showToast({
              title: "获取用户收藏话题失败",
              image: '../../image/登录失败.png'
            });
          }
        },
        fail: (res) => {
          wx.showToast({
            title: "获取用户收藏话题失败",
            image: '../../image/登录失败.png'
          });
        }
      });
    }
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