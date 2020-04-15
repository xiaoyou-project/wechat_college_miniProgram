// pages/myMessage/myMessage.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,//判断登录
    myMessage: 0,
    object4: [//收到的评论消息
      // {
      //   id: 1,
      //   name: "用户名字",
      //   postID: 1,
      //   postTitle: "话题的标题啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦了",
      //   type: "topical",//标明是话题类型的topical，share，card
      //   status: 0,
      //   time: "2020-2-29",
      //   content: "评论内容1"
      // }
    ],
    object5: [//收到的赞的消息
      // {
      //   id: 1,
      //   name: "用户的名字",
      //   postID: 1,//话题id
      //   postTitle: "话题标题",
      //   type: "topical",//标明是话题类型的，topical，share，comment，card
      //   status: 0,//未读
      //   time: "2020-2-29"
      // }
    ],
    object6: [//收到的系统消息
      // {
      //   id: 1,
      //   content: "系统消息内容",
      //   time: "2020-2-29",
      //   status: 0
      // }
    ]
  },
  toMessage: function(e){//更改查看的状态
    this.setData({
      myMessage: e.currentTarget.dataset.id
    });
  },
  deleteMessage: function(e){//左滑删除
    console.log("左滑删除", e.currentTarget.dataset.value);
    let index = e.currentTarget.dataset.value;
    let messageId = -1;
    let that = this;
    if(e.currentTarget.dataset.object==4){//删除评论
      messageId = this.data.object4[index].id;
    } 
    if (e.currentTarget.dataset.object == 5) {//删除赞
      messageId = this.data.object5[index].id;
    } 
    if (e.currentTarget.dataset.object == 6) {//删除系统消息
      messageId = this.data.object6[index].id;
    } 
    wx.request({//删除消息
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      url: app.globalData.sameUrl + app.globalData.userMessageStatus,
      data: {
        messageId: messageId,
        status: 2
      },
      method: 'post',
      success: (res) => {
        if (res.data.code == 1) {//删除成功
          that.onLoad();
        } else {
          wx.showToast({
            title: "删除消息失败",
            image: '../../image/登录失败.png'
          });
        }
      },
      fail: (res) => {
        wx.showToast({
          title: "删除消息失败",
          image: '../../image/登录失败.png'
        });
      }
    });
  },
  toExperienceArticle: function(e){//由收到的评论到查看具体的经验文章
    let index = e.currentTarget.dataset.value;
    let messageId = this.data.object4[index].id;
    let articleId = this.data.object4[index].postID;
    let messageStatus = "object4[" + index + "].status";
    let that = this;
    wx.request({//将消息变成已读
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      url: app.globalData.sameUrl + app.globalData.userMessageStatus,
      data: {
        messageId: messageId,
        status: 1
      },
      method: 'post',
      success: (res) => {
        if (res.data.code == 1) {//更改消息状态成功
          that.setData({//直接更改消息状态减少调用接口的次数
            messageStatus: 1
          });
          wx.navigateTo({
            url: '/pages/experienceContent/experienceContent?shareID=' + articleId + '&userID=' + app.globalData.userID
          });
          
        } else {
          wx.showToast({
            title: "更改消息状态失败",
            image: '../../image/登录失败.png'
          });
        }
      },
      fail: (res) => {
        wx.showToast({
          title: "更改消息状态失败",
          image: '../../image/登录失败.png'
        });
      }
    });
  },
  toTopicArticle: function (e) {//由收到的评论到查看具体的话题文章
    let index = e.currentTarget.dataset.value;
    let messageId = this.data.object4[index].id;
    let articleId = this.data.object4[index].postID;
    let messageStatus = "object4[" + index + "].status";
    let that = this;
    wx.request({//将消息变成已读
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      url: app.globalData.sameUrl + app.globalData.userMessageStatus,
      data: {
        messageId: messageId,
        status: 1
      },
      method: 'post',
      success: (res) => {
        if (res.data.code == 1) {//更改消息状态成功
          that.setData({//直接更改消息状态减少调用接口的次数
            messageStatus: 1
          });
          wx.navigateTo({
            url: '/pages/topicContent/topicContent?topicalID=' + articleId + '&userId=' + app.globalData.userID
          });

        } else {
          wx.showToast({
            title: "更改消息状态失败",
            image: '../../image/登录失败.png'
          });
        }
      },
      fail: (res) => {
        wx.showToast({
          title: "更改消息状态失败",
          image: '../../image/登录失败.png'
        });
      }
    });
  },
  toCard: function(e){//由评论到打卡
    let index = e.currentTarget.dataset.value;
    let messageId = this.data.object4[index].id;
    let articleId = this.data.object4[index].postID;
    let messageStatus = "object4[" + index + "].status";
    let that = this;
    wx.request({//将消息变成已读
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      url: app.globalData.sameUrl + app.globalData.userMessageStatus,
      data: {
        messageId: messageId,
        status: 1
      },
      method: 'post',
      success: (res) => {
        if (res.data.code == 1) {//更改消息状态成功
          that.setData({//直接更改消息状态减少调用接口的次数
            messageStatus: 1
          });
          wx.navigateTo({
            url: '/pages/cardDetail/cardDetail?cardID=' + articleId + '&userID=' + app.globalData.userID
          });

        } else {
          wx.showToast({
            title: "更改消息状态失败",
            image: '../../image/登录失败.png'
          });
        }
      },
      fail: (res) => {
        wx.showToast({
          title: "更改消息状态失败",
          image: '../../image/登录失败.png'
        });
      }
    });
  },
  goodToCard: function(e){//由赞到打卡
    let index = e.currentTarget.dataset.value;
    let messageId = this.data.object5[index].id;
    let articleId = this.data.object5[index].postID;
    let messageStatus = "object5[" + index + "].status";
    let that = this;
    wx.request({//将消息变成已读
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      url: app.globalData.sameUrl + app.globalData.userMessageStatus,
      data: {
        messageId: messageId,
        status: 1
      },
      method: 'post',
      success: (res) => {
        if (res.data.code == 1) {//更改消息状态成功
          that.setData({//直接更改消息状态减少调用接口的次数
            messageStatus: 1
          });
          wx.navigateTo({
            url: '/pages/cardDetail/cardDetail?cardID=' + articleId + '&userID=' + app.globalData.userID
          });

        } else {
          wx.showToast({
            title: "更改消息状态失败",
            image: '../../image/登录失败.png'
          });
        }
      },
      fail: (res) => {
        wx.showToast({
          title: "更改消息状态失败",
          image: '../../image/登录失败.png'
        });
      }
    });
  },
  goodToExperienceArticle: function(e){//由赞到经验文章
    let index = e.currentTarget.dataset.value;
    let messageId = this.data.object5[index].id;
    let articleId = this.data.object5[index].postID;
    let messageStatus = "object5[" + index + "].status";
    let that = this;
    wx.request({//将消息变成已读
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      url: app.globalData.sameUrl + app.globalData.userMessageStatus,
      data: {
        messageId: messageId,
        status: 1
      },
      method: 'post',
      success: (res) => {
        if (res.data.code == 1) {//更改消息状态成功
          that.setData({//直接更改消息状态减少调用接口的次数
            messageStatus: 1
          });
          wx.navigateTo({
            url: '/pages/experienceContent/experienceContent?shareID=' + articleId + '&userID=' + app.globalData.userID
          });
        } else {
          wx.showToast({
            title: "更改消息状态失败",
            image: '../../image/登录失败.png'
          });
        }
      },
      fail: (res) => {
        wx.showToast({
          title: "更改消息状态失败",
          image: '../../image/登录失败.png'
        });
      }
    });
  },
  goodToTopicArticle: function(e){//由赞到话题文章
    let index = e.currentTarget.dataset.value;
    let messageId = this.data.object5[index].id;
    let articleId = this.data.object5[index].postID;
    let messageStatus = "object5[" + index + "].status";
    let that = this;
    wx.request({//将消息变成已读
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      url: app.globalData.sameUrl + app.globalData.userMessageStatus,
      data: {
        messageId: messageId,
        status: 1
      },
      method: 'post',
      success: (res) => {
        if (res.data.code == 1) {//更改消息状态成功
          that.setData({//直接更改消息状态减少调用接口的次数
            messageStatus: 1
          });
          wx.navigateTo({
            url: '/pages/topicContent/topicContent?topicalID=' + articleId + '&userId=' + app.globalData.userID
          });
        } else {
          wx.showToast({
            title: "更改消息状态失败",
            image: '../../image/登录失败.png'
          });
        }
      },
      fail: (res) => {
        wx.showToast({
          title: "更改消息状态失败",
          image: '../../image/登录失败.png'
        });
      }
    });
  },
  toComment: function (e) {//去评论的那篇文章，调用上面的goodToExperienceArticle，或者goodToTopicArticle
    let index = e.currentTarget.dataset.value;
    let messageId = this.data.object5[index].postID;
    let that = this;
    wx.request({//判断评论内容
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      url: app.globalData.sameUrl + app.globalData.commentType,
      data: {
        postID: messageId
      },
      method: 'get',
      success: (res) => {
        if (res.data.code == 1) {//更改消息状态成功
          if(res.data.data.type == 1 ){//是经验
            that.goodToExperienceArticle(e);
          }else if(res.data.data.type == 2){//是话题
            that.goodToTopicArticle(e);
          }else{//是打卡的
            that.goodToCard(e);
          }
        } else {
          wx.showToast({
            title: "判断评论类型失败",
            image: '../../image/登录失败.png'
          });
        }
      },
      fail: (res) => {
        wx.showToast({
          title: "判断评论类型失败",
          image: '../../image/登录失败.png'
        });
      }
    });
  },
  systemMessage: function(){//系统消息
    let index = e.currentTarget.dataset.value;
    let messageId = this.data.object6[index].id;
    let messageStatus = "object6[" + index + "].status";
    let that = this;
    wx.request({//将消息变成已读
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      url: app.globalData.sameUrl + app.globalData.userMessageStatus,
      data: {
        messageId: messageId,
        status: 1
      },
      method: 'post',
      success: (res) => {
        if (res.data.code == 1) {//更改消息状态成功
          that.setData({//直接更改消息状态减少调用接口的次数
            messageStatus: 1
          });
        } else {
          wx.showToast({
            title: "更改消息状态失败",
            image: '../../image/登录失败.png'
          });
        }
      },
      fail: (res) => {
        wx.showToast({
          title: "更改消息状态失败",
          image: '../../image/登录失败.png'
        });
      }
    });
  },
  toLogin() {//去登录
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },
  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },
  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({//先存储是否登录的情况
      isLogin: app.globalData.isLogin
    });
    if (app.globalData.isLogin == true) {//这个用户已经登录了
      wx.request({//获取收到的评论消息
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        url: app.globalData.sameUrl + app.globalData.userCommentMessageList,
        data: {
          userId: app.globalData.userID
        },
        method: 'get',
        success: (res) => {
          if (res.data.code == 1) {//获取成功
            this.setData({
              object4: res.data.data
            })
          } else {
            wx.showToast({
              title: "获取用户评论消息失败",
              image: '../../image/登录失败.png'
            });
          }
        },
        fail: (res) => {
          wx.showToast({
            title: "获取用户评论消息失败",
            image: '../../image/登录失败.png'
          });
        }
      });
      wx.request({//获取个人收到赞的消息
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        url: app.globalData.sameUrl + app.globalData.userGoodMessageList,
        data: {
          userId: app.globalData.userID
        },
        method: 'get',
        success: (res) => {
          if (res.data.code == 1) {//获取成功
            this.setData({
              object5: res.data.data
            })
          } else {
            wx.showToast({
              title: "获取用户收到赞消息失败",
              image: '../../image/登录失败.png'
            });
          }
        },
        fail: (res) => {
          wx.showToast({
            title: "获取用户收到赞消息失败",
            image: '../../image/登录失败.png'
          });
        }
      });
      wx.request({//获取个人收到系统消息
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        url: app.globalData.sameUrl + app.globalData.userSystemMessageList,
        data: {
          userId: app.globalData.userID
        },
        method: 'get',
        success: (res) => {
          if (res.data.code == 1) {//获取成功
            this.setData({
              object6: res.data.data
            })
          } else {
            wx.showToast({
              title: "获取用户收到系统消息失败",
              image: '../../image/登录失败.png'
            });
          }
        },
        fail: (res) => {
          wx.showToast({
            title: "获取用户收到系统消息失败",
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