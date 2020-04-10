// pages/plate/plate.js
// 版块界面
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    object7: [//话题列表
      {
        id: 1,
        title: "高考推延？",
        view: 66
    },{
        id: 2,
        title: "中考推延？",
        view: 66
    },{
        id: 3,
        title: "高考推延？？",
        view: 66
    },{
        id: 4,
        title: "高考推延？？？",
        view: 66
    },{
        id: 5,
        title: "高考推延？？？？",
        view: 66
    },{
        id: 6,
        title: "高考推延？？？？？",
        view: 66
    }],
    object9: [
      {
        id:1,
        name: "学习英语",
        imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        total: 66
    },{
        id: 2,
        name: "学习数学AND高数",
        imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        total: 66
    },{
        id: 3,
        name: "学习计算机的好多好多好多东西",
        imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        total: 66
    },{
        id: 4,
        name: "啥都学习",
        imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        total: 66
    },{
        id: 5,
        name: "好好学习，天天向上",
        imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        total: 66
    },{
        id: 6,
        name: "好好学习天天向上",
        imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        total: 66
    }],
    myObject9: [
      {
        id: 1,
        name: "学习英语",
        imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        total: 66
      }, {
        id: 2,
        name: "学习数学AND高数",
        imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        total: 66
      }, {
        id: 3,
        name: "学习计算机的好多好多好多东西",
        imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        total: 66
      }, {
        id: 4,
        name: "啥都学习",
        imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        total: 66
      }, {
        id: 5,
        name: "好好学习，天天向上",
        imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        total: 66
      }, {
        id: 6,
        name: "好好学习天天向上",
        imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        total: 66
      },
      {
        id: 6,
        name: "好好学习天天向上",
        imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        total: 66
      },
      {
        id: 7,
        name: "好好学习天天向上",
        imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        total: 66
      },
      {
        id: 8,
        name: "好好学习天天向上",
        imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        total: 66
      },
      {
        id: 9,
        name: "好好学习天天向上",
        imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        total: 66
      },
      {
        id: 10,
        name: "好好学习天天向上",
        imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        total: 66
      },
      {
        id: 11,
        name: "好好学习天天向上",
        imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        total: 66
      },
      {
        id: 12,
        name: "好好学习天天向上",
        imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        total: 66
      }]
  },
  toTest: function () {
    wx.navigateTo({
      url: '/pages/test/test'
    });
  },
  toTopicContent: function(e){//去话题的详细界面
    let index = e.currentTarget.dataset.value;
    wx.navigateTo({
      url: '/pages/topicContent/topicContent?topicID=' + this.data.object7[index].id + '&userID=' + app.globalData.userID
    });
  },
  toPublishTopic: function(){//去发布话题界面
    wx.navigateTo({
      url: '/pages/publishTopic/publishTopic'
    });
  },
  toTopicList: function () {//话题列表页面
    wx.navigateTo({
      url: '/pages/topicList/topicList'
    });
  },
  toExperienceContent: function(e){//去经验的详细界面
    let index = e.currentTarget.dataset.value;
    wx.navigateTo({
      url: '/pages/experienceContent/experienceContent?shareID=' + this.data.object9[index].id + '&userID=' + app.globalData.userID
    });
  },
  toApplyPlate: function(){//申请板块界面
    wx.navigateTo({
      url: '/pages/applyPlate/applyPlate'
    });
  },
  toPlateList: function(){//板块列表页面
    wx.navigateTo({
      url: '/pages/plateList/plateList'
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