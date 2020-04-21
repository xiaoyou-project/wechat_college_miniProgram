// pages/card/card.js
//打卡界面
import api from '../../utils/api.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,//判断是否登录
    myCardName: '',//存储发起打卡的内容
    myCardContent: '',//存储发起打卡的内容
    myCardTotalDay: 0,//存储发起打卡的内容
    myCard: 0,//判断进入我的打卡，还是所有打卡，还是发起打卡页面
    myObject11: [//我的打卡
      // {
      //   id: 1,
      //   imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
      //   name: "一二三",
      //   time: "2020-2-29",
      //   title: "我的打卡标题1",
      //   description: "一些简略信息的描述",
      //   keepDay: 1,
      //   totalDay: 6,
      //   peoples: 66
      // }
    ],
    object11: [//所有打卡
      // {
      //   id: 1,
      //   imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
      //   name: "一二三",
      //   time: "2020-2-29",
      //   title: "所有打卡标题1",
      //   description: "一些简略信息的描述",
      //   keepDay: 1,
      //   totalDay: 6,
      //   peoples: 66
      // }
      ]
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
    let id = e.currentTarget.dataset.value;
    wx.navigateTo({
      url: '/pages/cardDetail/cardDetail?cardID=' + id + '&userID=' + app.globalData.userID
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
    // console.log(this.data);
    // console.log(this.data.myCardContent.replace(/\n/g, '\\n'));
    this.setData({
      myCardTotalDay: e.detail.value
    });
  },
  submitCard:function(){//提交发起打卡
    if(app.globalData.isLogin==true){//用户登录了才能发起打卡
      console.log("提交发起打卡");
      let that = this;
      api.post(app.globalData.cardRelease,{
        userID: app.globalData.userID,
        name: that.data.myCardName,
        content: that.data.myCardContent,
        totalDay: that.data.myCardTotalDay
      }).then((res) => {
        wx.reLaunch({//发起打卡成功后去板块界面
          url: '/pages/card/card'
        });
      }).catch((err) => {
        that.theFailMeg("发起打卡失败");
      })
    }else{
      this.toLogin();
    }
  },
  toLogin() {//去登录
    app.toLoginPage();
  },
  theFailMeg: function (title) {//提示信息函数
    wx.showToast({
      title: title,
      image: '../../image/登录失败.png'
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      isLogin: app.globalData.isLogin
    });
    if(app.globalData.isLogin == true){//用户登录了才获取我的打卡
      api.get(app.globalData.cardMeCardList,{
        userID: app.globalData.userID
      }).then((res) => {
        that.setData({
          myObject11: res.data
        });
      }).catch((err) => {
        that.theFailMeg("获取我的打卡失败");
      })
    }
    api.get(app.globalData.cardCardList, {//获取所有打卡
      userID: app.globalData.userID
    }).then((res) => {
      that.setData({
        object11: res.data
      });
    }).catch((err) => {
      that.theFailMeg("获取所有打卡失败");
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