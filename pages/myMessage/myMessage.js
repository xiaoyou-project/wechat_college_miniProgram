// pages/myMessage/myMessage.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myMessage: 0,
    object4: [//收到的评论消息
      {
        id: 1,
        name: "用户名字",
        postID: 1,
        postTitle: "话题的标题啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦了",
        type: "topical",//标明是话题类型的
        status: 0,
        time: "2020-2-29",
        content: "评论内容1啦啦啦啦啦啦啦啦绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿"
      },
      {
        id: 2,
        name: "用户名字2",
        postID: 2,
        postTitle: "经验的标题",
        type: "share",//标明是经验类型的
        status: 0,
        time: "2020-3-29",
        content: "评论内容2"
      },
      {
        id: 3,
        name: "用户名字3",
        postID: 3,
        postTitle: "话题的标题",
        type: "topical",//标明是话题类型的
        status: 1,
        time: "2020-4-29",
        content: "评论内容3"
      },
      {
        id: 4,
        name: "用户名字4",
        postID: 4,
        postTitle: "经验的标题",
        type: "share",//标明是经验类型的
        status: 1,
        time: "2020-5-29",
        content: "评论内容4"
      }
    ],
    object5: [//收到的赞的消息
      {
        id: 1,
        name: "用户的名字",
        postID: 1,//话题id
        postTitle: "话题标题",
        type: "topical",//标明是话题类型的
        status: 0,//未读
        time: "2020-2-29"
      },
      {
        id: 2,
        name: "用户的名字2",
        postID: 2,//话题id
        postTitle: "话题标题",
        type: "topical",//标明是话题类型的
        status: 1,//未读
        time: "2020-3-29"
      },
      {
        id: 3,
        name: "用户的名字3",
        postID: 3,//经验id
        postTitle: "经验标题",
        type: "share",//标明是经验类型的
        status: 0,//未读
        time: "2020-4-29"
      },
      {
        id: 4,
        name: "用户的名字4",
        postID: 4,//经验id
        postTitle: "经验标题",
        type: "share",//标明是经验类型的
        status: 1,//未读
        time: "2020-5-29"
      },
      {
        id: 5,
        name: "用户的名字5",
        postID: 5,//话题id
        postTitle: "评论的简略内容",
        type: "comment",//标明是话题类型的
        status: 0,//未读
        time: "2020-6-29"
      },
      {
        id: 6,
        name: "用户的名字6",
        postID: 6,//话题id
        postTitle: "评论的简略内容",
        type: "comment",//标明是话题类型的
        status: 1,//未读
        time: "2020-7-29"
      }
    ],
    object6: [//收到的系统消息
      {
        id: 1,
        content: "系统消息内容",
        time: "2020-2-29",
        status: 0
      },
      {
        id: 2,
        content: "系统消息内容2",
        time: "2020-3-29",
        status: 1
      }
    ]
  },
  toMessage: function(e){//更改查看的状态
    this.setData({
      myMessage: e.currentTarget.dataset.id
    });
  },
  deleteMessage: function(e){//左滑删除
    console.log("左滑删除", e.currentTarget.dataset.value);
  },
  toExperienceArticle: function(e){//由收到的评论到查看具体的经验文章
    let index = e.currentTarget.dataset.value;
    //同时记得更改变成已读 调接口
    //
    //
    wx.navigateTo({
      url: '/pages/experienceContent/experienceContent?shareID=' + this.data.object4[index].id + '&userID=' + app.globalData.userID
    });
  },
  toTopicArticle: function (e) {//由收到的评论到查看具体的话题文章
    let index = e.currentTarget.dataset.value;
    //同时记得更改变成已读 调接口
    //
    //
    wx.navigateTo({
      url: '/pages/topicContent/topicContent?topicID=' + this.data.object4[index].id + '&userID=' + app.globalData.userID
    });
  },
  goodToExperienceArticle: function(e){//由赞到经验文章
    let index = e.currentTarget.dataset.value;
    //同时记得更改变成已读 调接口
    //
    //
    wx.navigateTo({
      url: '/pages/experienceContent/experienceContent?shareID=' + this.data.object5[index].postID + '&userID=' + app.globalData.userID
    });
  },
  goodToTopicArticle: function(e){//由赞到话题文章
    let index = e.currentTarget.dataset.value;
    //同时记得更改变成已读 调接口
    //
    //
    wx.navigateTo({
      url: '/pages/topicContent/topicContent?topicID=' + this.data.object5[index].postID + '&userID=' + app.globalData.userID
    });
  },
  toComment: function (e) {//去评论的那篇文章，调用上面的goodToExperienceArticle，或者goodToTopicArticle
    let index = e.currentTarget.dataset.value;
    console.log("评论的文章：",this.data.object5[index]);
    //这里还要调接口判断是经验文章的评论还是话题文章的评论
    //
    //
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