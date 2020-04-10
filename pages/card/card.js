// pages/card/card.js
//打卡界面
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myCardName: '',
    myCardContent: '',
    myCardTotalDay: 0,
    myCard: 0,//判断进入我的打卡，还是所有打卡，还是发起打卡页面
    myObject11: [//我的打卡
      {
        id: 1,
        imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        name: "一二三",
        time: "2020-2-29",
        title: "我的打卡标题1",
        description: "一些简略信息的描述",
        keepDay: 1,
        totalDay: 6,
        peoples: 66
    },
      {
        id: 2,
        imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        name: "一二三",
        time: "2020-2-29",
        title: "我的打卡标题2",
        description: "一些简略信息的描述",
        keepDay: 2,
        totalDay: 6,
        peoples: 66
      },
      {
        id: 3,
        imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        name: "一二三",
        time: "2020-2-29",
        title: "我的打卡标题3",
        description: "一些简略信息的描述",
        keepDay: 3,
        totalDay: 6,
        peoples: 66
      },
      {
        id: 4,
        imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        name: "一二三",
        time: "2020-2-29",
        title: "我的打卡标题4",
        description: "一些简略信息的描述",
        keepDay: 4,
        totalDay: 6,
        peoples: 66
      }],
    object11: [//所有打卡
      {
        id: 1,
        imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        name: "一二三",
        time: "2020-2-29",
        title: "所有打卡标题1",
        description: "一些简略信息的描述",
        keepDay: 1,
        totalDay: 6,
        peoples: 66
      },
      {
        id: 2,
        imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        name: "一二三",
        time: "2020-2-29",
        title: "所有打卡标题2",
        description: "一些简略信息的描述",
        keepDay: 2,
        totalDay: 6,
        peoples: 66
      },
      {
        id: 3,
        imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        name: "一二三",
        time: "2020-2-29",
        title: "所有打卡标题3",
        description: "一些简略信息的描述",
        keepDay: 3,
        totalDay: 6,
        peoples: 66
      },
      {
        id: 4,
        imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        name: "一二三",
        time: "2020-2-29",
        title: "所有打卡标题4",
        description: "一些简略信息的描述",
        keepDay: 4,
        totalDay: 6,
        peoples: 66
      }]
  },
  toMyCard: function(){//我的打卡
    this.setData({
      myCard: 0
    });
  },
  toAllCard: function () {//所有打卡
    this.setData({
      myCard: 1
    });
  },
  toApplyCard: function () {//发起打卡
    this.setData({
      myCard: 2
    });
  },
  cardDetail: function (e) {//点击打卡去打卡详细页面
    let index = e.currentTarget.dataset.value;
    wx.navigateTo({
      url: '/pages/cardDetail/cardDetail?cardID=' + this.data.object11[index].id + '&userID=' + app.globalData.userID
    });
  },
  titleChange: function(e){//填写打卡标题
    // console.log("标题改变的时候：", e.detail.value);
    this.setData({
      myCardName: e.detail.value
    });
  },
  contentChange: function (e) {//填写打卡内容
    // console.log("内容改变的时候：", e.detail.value);
    this.setData({
      myCardContent: e.detail.value
    });
  },
  totalDayChange: function(e){//填写总的天数
    // console.log("总的天数：",e.detail.value);
    this.setData({
      myCardTotalDay: e.detail.value
    });
  },
  submitCard:function(){//提交发起打卡
    console.log("提交发起打卡");
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