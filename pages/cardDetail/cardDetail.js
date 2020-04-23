// pages/cardDetail/cardDetail.js
import api from '../../utils/api.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: undefined,//
    isLogin: false,//判断是否登录
    cardID: -1,
    userId: 0,//进入这个打卡的用户的id
    name: "用户名",
    imgUrl: "https://img.xiaoyou66.com/images/2020/04/23/YbIq.png",
    title: "打卡标题",
    userID: 1,//发起打卡的人的id
    time: "2020-2-29",
    description: "打卡的描述内容",
    cardStatus: 0,//是否加入了这个打卡
    nowStatus: 0,//今天是否打卡
    keepDay: 1,
    totalDay: 6,
    peoples: 8,
    textareaAValue: '',//打卡感想
    showCardInput: 0,//是否展示打卡感想输入框
    object8: [//打卡评论记录列表
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
  toPersonCenter: function (e) {//点击头像进入个人中心
    wx.navigateTo({
      url: '/pages/personCenter/personCenter?userID=' + e.currentTarget.dataset.id + '&imgUrl=' + e.currentTarget.dataset.img
    });
  },
  toCommentGoods: function (e) {//给评论点赞或者取消点赞
    if(app.globalData.isLogin == true){//用户登录了才能点赞
      console.log("给评论点赞", e.currentTarget.dataset.id, e.currentTarget.dataset.index);
      let that = this;
      let index = e.currentTarget.dataset.index;
      let commentID = that.data.object8[index].id;
      let state = that.data.object8[index].state==0?1:0;
      let good = parseInt(this.data.object8[index].good) + parseInt(state==1?1:-1);
      //改变数组里面的某个对象的数据的值
      let objectGood = "object8[" + index + "].good";
      let objectGoodStatus = "object8[" + index + "].state";
      api.post(app.globalData.commentGood,{
        commentID: commentID,
        userID: app.globalData.userID
      }).then((res) => {
        that.setData({
          [objectGoodStatus]: state,
          [objectGood]: good
        });
      }).catch((err) => {
        that.theFailMeg("操作失败");
      })
    }else{
      this.toLogin();
    }
  },
  deleteComment: function (e) {//删除评论
    let that = this;
    let commentID = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确认删除这条评论么?',
      success: function (res) {
        if(res.confirm){
          console.log("用户确认删除id为：", commentID, "的评论");
          api.post(app.globalData.commentDelete,{
            commentID: commentID,
            userID: app.globalData.userID
          }).then((res) => {
            that.getCommentList(that.data.cardID);
          }).catch((err) => {
            that.theFailMeg("删除失败");
          })
        }else{
          console.log("用户取消删除id为：", commentID, "的评论");
        }
      }
    });
  },
  deleteCard: function () {//删除打卡
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除这个打卡么?',
      success: function (res) {
        if (res.confirm) {
          console.log("用户确认删除打卡");
          api.post(app.globalData.cardDelete, {
            cardID: that.data.cardID,
            userID: app.globalData.userID
          }).then((res) => {
            // wx.reLaunch({//删除打卡成功后去card界面
            //   url: '/pages/card/card'
            // })
            var pages = getCurrentPages(); //当前页面
            var beforePage = pages[pages.length - 2]; //前一页
            wx.navigateBack({
              success: function () {
                beforePage.onLoad(beforePage.data.options); // 执行前一个页面的onLoad方法
              }
            });
          }).catch((err) => {
            that.theFailMeg("删除失败");
          })
        } else {
          console.log("用户取消删除打卡");
        }
      }
    });
  },
  joinCard: function(){//加入打卡
    if(app.globalData.isLogin==true){//用户登录了
      let that = this;
      console.log("加入打卡用户id", this.data.userId, "打卡id",this.data.cardID);
      api.post(app.globalData.cardJoin, {
        cardID: that.data.cardID,
        userID: app.globalData.userID
      }).then((res) => {
        that.setData({
          cardStatus: 1
        });
      }).catch((err) => {
        that.theFailMeg("加入失败");
      })
    }else{
      this.toLogin();
    }
  },
  clockCard: function(){//立即打卡
    console.log("打卡用户id", this.data.userId, "打卡id", this.data.cardID);
    let that = this;
    let keepDay = parseInt(this.data.keepDay);
    api.post(app.globalData.cardFinish, {//加入打卡
      cardID: that.data.cardID,
      userID: app.globalData.userID,
      content: that.data.textareaAValue
    }).then((res) => {
      that.setData({
        nowStatus: 1,
        keepDay: keepDay + 1
      });
      that.getCommentList(that.data.cardID);//打卡成功后再获取打卡感想
    }).catch((err) => {
      that.theFailMeg("打卡失败");
    })
  },
  showCard: function(){//显示打卡显示框
    this.setData({
      showCardInput: 1
    });
  },
  textareaAInput(e) {//输入打卡记录感想
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  signOutCard: function(){//退出打卡
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确认退出改打卡么?',
      success: function (res) {
        if (res.confirm) {
          console.log("用户确认退出打卡");
          api.post(app.globalData.cardAbort, {
            cardID: that.data.cardID,
            userID: app.globalData.userID
          }).then((res) => {//成功退出打卡
            that.setData({
              cardStatus: 0
            });
          }).catch((err) => {
            that.theFailMeg("退出失败");
          })
        } else {
          console.log("用户取消退出打卡");
        }
      }
    });
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
  getCommentList: function(postID){//获取评论内容
    let that = this;
    api.get(app.globalData.commentCommentList, {
      postID: postID,
      postType: 3,
      userId: app.globalData.userID
    }).then((res) => {
      that.setData({
        object8: res.data
      });
    }).catch((err) => {
      that.theFailMeg("获取评论内容失败");
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log("进入打卡详细界面：", options);
    this.setData({
      options: options,
      cardID: options.cardID,
      userId: app.globalData.userID
    });
    api.get(app.globalData.cardCardContent,{//获取打卡内容
      cardID: options.cardID,
      userID: app.globalData.userID
    }).then((res) => {
      let data = res.data;
      that.setData({
        name: data.name,
        imgUrl: data.imgUrl,
        title: data.title,
        userID: data.userID,
        time: data.time,
        description: data.description,
        cardStatus: data.cardStatus,
        nowStatus: data.nowStatus,
        keepDay: data.keepDay,
        totalDay: data.totalDay,
        peoples: data.peoples
      });
    }).catch((err) => {
      that.theFailMeg("获取打卡内容失败");
    });
    that.getCommentList(options.cardID);//获取评论内容
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