// pages/plate/plate.js
// 版块界面
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,//判断是否登录
    object7: [//话题列表
      // {
      //   id: 1,
      //   title: "高考推延？",
      //   view: 66
      // }
    ],
    object9: [//热门板块
      // {
      //   id:1,
      //   name: "学习英语",
      //   imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
      //   total: 66,
      //   description: '内容',//板块内容介绍
      // } 
    ],
    myObject9: [//我收藏的板块
      // {
      //   id: 1,
      //   name: "学习英语",
      //   imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
      //   total: 66,
      //   description: '内容',//板块内容介绍
      // }
      ]
  },
  toTest: function () {//测试页面
    wx.navigateTo({
      url: '/pages/test/test'
    });
  },
  toTopicContent: function(e){//去话题的详细界面
    let index = e.currentTarget.dataset.value;
    wx.navigateTo({
      url: '/pages/topicContent/topicContent?topicalID=' + this.data.object7[index].id + '&userId=' + app.globalData.userID
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
  toExperienceList: function(e){//去板块的经验列表界面
    let index = e.currentTarget.dataset.value;
    let plateID = this.data.object9[index].id;
    let name = this.data.object9[index].name;
    let description= this.data.object9[index].description;
    wx.navigateTo({
      url: '/pages/experienceList/experienceList?plateID=' + plateID + '&name=' + name + '&description=' + description
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
  theFailMeg: function(title){//提示信息函数
    wx.showToast({
      title: title,
      image: '../../image/登录失败.png'
    });
  },
  toLogin() {//去登录
    app.toLoginPage();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("页面加载");
    let that = this;
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
          that.setData({//保存数据
            object7: res.data.data
          });
        } else {
          that.theFailMeg('获取话题列表失败');
        }
      },
      fail: (res) => {
        that.theFailMeg('获取话题列表失败');
      }
    });
    wx.request({//获取板块列表
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      url: app.globalData.sameUrl + app.globalData.platePlateList,
      data: {

      },
      method: 'get',
      success: (res) => {
        if (res.data.code == 1) {//获取成功
          that.setData({//保存数据
            object9: res.data.data
          });
        } else {
          that.theFailMeg('获取板块列表失败');
        }
      },
      fail: (res) => {
        that.theFailMeg('获取板块列表失败');
      }
    });
    if(app.globalData.isLogin==true){//这个用户已经登录了
      wx.request({//获取用户收藏的板块列表
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        url: app.globalData.sameUrl + app.globalData.plateCollectPlateList,
        data: {
          userID: app.globalData.userID
        },
        method: 'get',
        success: (res) => {
          if (res.data.code == 1) {//获取成功
            that.setData({//保存数据
              myObject9: res.data.data
            });
          } else {
            that.theFailMeg('获取板块列表失败');
          }
        },
        fail: (res) => {
          that.theFailMeg('获取板块列表失败');
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