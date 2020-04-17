// pages/topicContent/topicContent.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: undefined,//存储别的页面传过来的数据
    isLogin: false,//判断是否登录
    InputBottom: 0,//发表评论相关
    commentContent: '',//发表评论的内容
    topicalID: '',//存储这篇话题的id
    userId: 0,//存储观看这篇话题的用户id
    title: "话题的标题",
    content: "话题的内容",
    view: -1,
    good: -1,
    name: "未知",
    imgUrl: null,//作者头像
    goodStatus: 0,//判断是否点赞
    collectStatus: 0,//判断是否收藏
    time: "2000-2-29",
    authorID: 0,//作者id
    object8: [//评论列表
      // {
      //   id: 1,
      //   name: "评论的用户名字",
      //   good: 66,
      //   content: "这是一条评论内容",
      //   imgUrl: "https://img.xiaoyou66.com/images/2020/01/21/nNUi.png",//评论的用户头像
      //   userID: 1,//评论的用户的id
      //   time: "2020-2-29",
      //   state: 0
      // }
    ],
  },
  toLogin() {//去登录
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  apiCollection: function(flage){//话题收藏或者取消收藏
    let that = this;
    wx.request({//收藏话题或者取消收藏话题
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      url: app.globalData.sameUrl + app.globalData.topicalCollect,
      data: {
        topicalID: that.data.topicalID,
        userId: that.data.userId
      },
      method: 'post',
      success: (res) => {
        if (res.data.code == 1) {//获取成功
          if(flage == 0){
            that.setData({
              collectStatus: 1
            });
          }else{
            that.setData({
              collectStatus: 0
            });
          }
        } else {
          if(flage == 1){//取消收藏
            that.theFailMeg('取消收藏失败');
          }else{//收藏
            that.theFailMeg('收藏失败');
          }
        }
      },
      fail: (res) => {
        if (flage == 1) {//取消收藏
          that.theFailMeg('取消收藏失败');
        } else {//收藏
          that.theFailMeg('收藏失败');
        }
      }
    });
  },
  collectionTopic: function(){//收藏或者取消收藏
    if(this.data.isLogin == true){//登录了
      if(this.data.collectStatus == 0){
        this.apiCollection(0);//调用收藏接口
      }else{
        this.apiCollection(1);//调用取消收藏接口
      }
    }else{
      this.toLogin();
    }
  },
  apiToGoods: function(flage){
    let good = parseInt(this.data.good);
    let that = this;
    wx.request({//给话题点赞或者取消点赞
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      url: app.globalData.sameUrl + app.globalData.topicalGood,
      data: {
        topicalID: that.data.topicalID,
        userId: that.data.userId
      },
      method: 'post',
      success: (res) => {
        if (res.data.code == 1) {//成功
          if (flage == 0) {
            that.setData({
              goodStatus: 1,
              good: good + 1
            });
          } else {
            that.setData({
              goodStatus: 0,
              good: good - 1
            });
          }
        } else {
          if (flage == 1) {//取消点赞
            that.theFailMeg('取消点赞失败');
          } else {//点赞
            that.theFailMeg('点赞失败');
          }
        }
      },
      fail: (res) => {
        if (flage == 1) {//取消点赞
          that.theFailMeg('取消点赞失败');
        } else {//点赞
          that.theFailMeg('点赞失败');
        }
      }
    });
  },
  toTopicGoods: function(e){//给话题点赞或者取消点赞
    console.log("给话题点赞", e.currentTarget.dataset.id);
    if (this.data.isLogin == true) {//登录了
      let good = this.data.good;
      if (this.data.goodStatus == 0) {
        //还没点赞
        this.apiToGoods(0);
      } else {
        //取消点赞
        this.apiToGoods(1);
      }
    }else{
      this.toLogin();
    }
  },
  toPersonCenter: function(e){//点击头像进入个人中心
    wx.navigateTo({
      url: '/pages/personCenter/personCenter?userID=' + e.currentTarget.dataset.id + '&imgUrl=' + e.currentTarget.dataset.img
    });
  },
  toCommentGoods: function (e) {//给评论点赞或者取消点赞
    console.log("给评论点赞", e.currentTarget.dataset.id, e.currentTarget.dataset.index);
    if (this.data.isLogin == true) {//登录了
      let index = e.currentTarget.dataset.index;
      let commentID = this.data.object8[index].id;
      let good = parseInt(this.data.object8[index].good);
      //改变数组里面的某个对象的数据的值
      let objectGood = "object8[" + index + "].good";
      let objectGoodStatus = "object8[" + index + "].state";
      let that = this;
      wx.request({//给评论点赞或者取消点赞
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        url: app.globalData.sameUrl + app.globalData.commentGood,
        data: {
          commentID: commentID,
          userID: that.data.userId
        },
        method: 'post',
        success: (res) => {
          if (res.data.code == 1) {//成功
            if (that.data.object8[index].state == 0){//点赞
              that.setData({
                [objectGoodStatus]: 1,
                [objectGood]: good + 1
              });
            } else {//取消点赞
              that.setData({
                [objectGoodStatus]: 0,
                [objectGood]: good - 1
              });
            }
          } else {
            if (that.data.object8[index].state == 1) {//取消点赞
              that.theFailMeg('取消点赞失败');
            } else {//点赞
              that.theFailMeg('点赞失败');
            }
          }
        },
        fail: (res) => {
          if (that.data.object8[index].state == 1) {//取消点赞
            that.theFailMeg('取消点赞失败');
          } else {//点赞
            that.theFailMeg('点赞失败');
          }
        }
      });
    }else{
      this.toLogin();
    }
  },
  deleteTopic:function(){//删除话题
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除这篇话题么?',
      success: function (res) {
        if(res.cancel){
          console.log("用户取消删除id为：", that.data.topicalID, "的话题");
        }else{
          console.log("用户确认删除id为：", that.data.topicalID, "的话题");
          wx.request({//删除话题
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            url: app.globalData.sameUrl + app.globalData.topicalDelete,
            data: {
              topicalID: that.data.topicalID,
              userId: that.data.userId
            },
            method: 'post',
            success: (res) => {
              if (res.data.code == 1) {//成功
                wx.navigateTo({
                  url: '/pages/topicList/topicList'
                });
              } else {
                that.theFailMeg("删除话题失败");
              }
            },
            fail: (res) => {
              that.theFailMeg("删除话题失败");
            }
          });
        }
      }
    });
  },
  deleteComment: function(e){//删除评论
    let that = this;
    let commentID = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确认删除这条评论么?',
      success: function (res) {
        if(res.cancel){
          console.log("用户取消删除id为：", commentID, "的评论");
        }else{
          console.log("用户确认删除id为：", commentID, "的评论");
          wx.request({//删除评论
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            url: app.globalData.sameUrl + app.globalData.commentDelete,
            data: {
              commentID: commentID,
              userID: that.data.userId
            },
            method: 'post',
            success: (res) => {
              if (res.data.code == 1) {//成功
                let object8 = that.data.object8;
                object8.splice(index, 1);
                that.setData({//模拟删除数组中的东西
                  object8: object8
                });
              } else {
                that.theFailMeg("删除评论失败");
              }
            },
            fail: (res) => {
              that.theFailMeg("删除评论失败");
            }
          }); 
        }
      }
    });
  },
  commentContent: function(e){//发表评论的内容
    this.setData({
      commentContent: e.detail.value
    });
  },
  submitComment: function(){//点击发表评论
    if (this.data.isLogin == true) {//登录了
      let that = this;
      console.log("发表评论：",this.data.commentContent);
      wx.request({//发表评论
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        url: app.globalData.sameUrl + app.globalData.commentPublish,
        data: {
          commentType: 2,
          userID: that.data.userId,
          content: that.data.commentContent,
          postID: that.data.topicalID
        },
        method: 'post',
        success: (res) => {
          if (res.data.code == 1) {//成功
            //重新获取评论内容
            that.getCommentList(that.data.topicalID, that.data.userId);
          } else {
            that.theFailMeg("发表评论失败");
          }
        },
        fail: (res) => {
          that.theFailMeg("发表评论失败");
        }
      });
    }else{
      this.toLogin();
    }
  },
  InputFocus(e) {//发表评论相关
    this.setData({
      InputBottom: e.detail.height
    })
  },
  InputBlur(e) {//发表评论相关
    this.setData({
      InputBottom: 0
    })
  },
  theFailMeg: function (title) {//提示信息函数
    wx.showToast({
      title: title,
      image: '../../image/登录失败.png'
    });
  },
  getCommentList: function(postId, userId){
    let that = this;
    wx.request({//获取评论列表
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      url: app.globalData.sameUrl + app.globalData.commentCommentList,
      data: {
        postType: 2,
        postID: postId,
        userId, userId
      },
      method: 'get',
      success: (res) => {
        if (res.data.code == 1) {//成功
          that.setData({
            object8: res.data.data
          });
        } else {
          that.theFailMeg("获取评论列表失败");
        }
      },
      fail: (res) => {
        that.theFailMeg("获取评论失败");
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options != undefined){
      console.log("来到话题界面：", options);
      let that = this;
      this.setData({//存数据
        options: options,
        topicalID: options.topicalID,
        userId: options.userId,
        isLogin: app.globalData.isLogin
      });
      wx.request({//获话题内容
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        url: app.globalData.sameUrl + app.globalData.topicalContent,
        data: {
          topicalID: options.topicalID,
          userId: options.userId
        },
        method: 'get',
        success: (res) => {
          if (res.data.code == 1) {//获取成功
            let data = res.data.data;
            that.setData({//保存数据
              title: data.title,
              content: data.content,
              view: data.view,
              good: data.good,
              name: data.name,
              imgUrl: data.imgUrl,
              goodStatus: data.goodStatus,
              collectStatus: data.collectStatus,
              time: data.time,
              authorID: data.authorID
            });
          } else {
            that.theFailMeg('获取话题内容失败');
          }
        },
        fail: (res) => {
          that.theFailMeg('获取话题内容失败');
        }
      });
      this.getCommentList(options.topicalID, options.userId);//获取评论列表
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
    this.onLoad(this.data.options);
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
    console.log("下拉刷新", this.data);
    this.onLoad(this.data.options);
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