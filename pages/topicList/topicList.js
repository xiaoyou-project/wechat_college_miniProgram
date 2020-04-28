// pages/topicList/topicList.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newTopicIndex: 0,//最新话题
    hotTopicIndex: 0,//热门话题索引
    myTopic: 0,//切换为热门话题或者最新话题
    animation: '',
    buttonName: 'fade',
    changeBtn: "scale-down",
    isLogin: false,//判断是否登录
    object7: [//话题列表
      // {
      //   id: 1,
      //   title: "话题1的标题",
      //   view: 66
      // }
    ],
    hotTopic: [],//热门话题
    newTopic: [],//最新话题
  },
  onSearch(e) {//搜索事件
    wx.navigateTo({
      url: '/pages/search/search?key=' + e.detail.value
    })
  },
  toMyTopic: function (e) {////切换为热门话题或者最新话题
    this.setData({
      myTopic: e.currentTarget.dataset.id
    })
  },
  topicArticle: function (e) {//点击话题去话题页面
    let index = e.currentTarget.dataset.value;
    let userId = 0;//用户没有登录就传0过去
    if (this.data.isLogin == true) {//这个用户登录了
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
      });
    }, 500);
  },
  changeTopic: function(e){//换一换话题
    console.log("换一换话题", e);
    let that = this;
    let topic = [];
    let object7 = that.data.object7;
    let hotTopicIndex = parseInt(that.data.hotTopicIndex);
    let newTopicIndex = parseInt(that.data.newTopicIndex);
    var anmiaton = e.currentTarget.dataset.class;
    that.setData({
      animation: anmiaton
    });
    setTimeout(function () {
      that.setData({
        animation: ''
      }, () => {
        if (that.data.myTopic == 1) {//是热门话题
          if (object7.length <= 8) {//小于8条话题记录
            topic = object7;
          } else {
            for (let i = 0; i < 8; i++) {
              topic.push(object7[hotTopicIndex]);
              hotTopicIndex = (hotTopicIndex + 1) % object7.length;
            }
          }
          that.setData({//存到data中
            hotTopic: topic,
            hotTopicIndex: hotTopicIndex
          })
        } else {//是最新话题
          if (object7.length <= 8) {//小于8条话题记录
            topic = object7;
          } else {
            for (let i = 0; i < 8; i++) {
              topic.push(object7[newTopicIndex]);
              console.log("newTopicIndex", newTopicIndex);
              newTopicIndex = (newTopicIndex - 1) == -1 ? (object7.length - 1) : (newTopicIndex - 1);
            }
          }
          that.setData({//存到data中
            newTopic: topic,
            newTopicIndex: newTopicIndex
          })
        }
      });
    }, 500);
  },
  intTopicList: function(){//初始化列表
    let that = this;
    let topic = [];
    let topic2 = [];
    let object7 = that.data.object7;
    let hotTopicIndex = parseInt(that.data.hotTopicIndex);
    let newTopicIndex = parseInt(that.data.newTopicIndex);


    if (object7.length <= 8) {//小于8条话题记录
      topic = object7;
    } else {
      for (let i = 0; i < 8; i++) {
        hotTopicIndex = (hotTopicIndex + 1) % object7.length;
        topic.push(object7[hotTopicIndex]);
      }
    }
    console.log("热门话题",topic);
    that.setData({//存到data中
      hotTopic: topic
    })
    if (object7.length <= 8) {//小于8条话题记录
      topic = object7;
    } else {
      for (let i = 0; i < 8; i++) {
        newTopicIndex = (newTopicIndex - 1) == -1 ? object7.length : (newTopicIndex - 1)
        topic2.push(object7[newTopicIndex]);
      }
    }
    console.log("最新话题", topic);
    that.setData({//存到data中
      newTopic: topic2
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("话题列表页面");
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
          this.setData({
            object7: res.data.data,
            newTopicIndex: res.data.data.length-1//初始化索引
          }, () => {
            that.intTopicList();
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