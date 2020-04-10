// pages/myCollection/myCollection.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myCollection: 0,
    object1: [{//经验列表
      id: 1,
      title: "经验1的标题",
      time: '2020-2-29',
      view: 666,
      good: 777,
      description: '这是一些简略信息，这是一些简略信息，这是一些简略信息、、、、',
      img: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
      plate: "如果学习英语"
    }, {
      id: 2,
      title: "经验2的标题",
      time: '2020-3-29',
      view: 777,
      good: 888,
      description: '这是一些简略信息，这是一些简略信息，这是一些简略信息、、、、',
      img: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
      plate: "如果学习高数"
    }, {
      id: 3,
      title: "经验3的标题",
      time: '2020-4-29',
      view: 888,
      good: 999,
      description: '这是一些简略信息，这是一些简略信息，这是一些简略信息、、、、',
      img: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
      plate: "如果学习计算机"
    }],
    object2: [{//话题列表
      id: 1,
      name: "话题1的名字",
      time: '2020-2-29',
      view: 666,
      good: 777,
      description: '这是一些简略信息，这是一些简略信息，这是一些简略信息、、、、'
    }, {
      id: 2,
      name: "话题2的名字",
      time: '2020-3-29',
      view: 777,
      good: 888,
      description: '这是一些简略信息，这是一些简略信息，这是一些简略信息、、、、'
    }, {
      id: 3,
      name: "话题3的名字",
      time: '2020-4-29',
      view: 888,
      good: 999,
      description: '这是一些简略信息，这是一些简略信息，这是一些简略信息、、、、'
    }]
  },
  collectionTopic: function(){//我收藏的话题
    this.setData({
      myCollection: 1
    });
  },
  topicArticle: function (e) {//点击话题去话题页面
    let index = e.currentTarget.dataset.value;
    wx.navigateTo({
      url: '/pages/topicContent/topicContent?topicID=' + this.data.object2[index].id + '&userID=' + app.globalData.userID
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