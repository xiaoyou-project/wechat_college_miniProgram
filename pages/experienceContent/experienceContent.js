// pages/topicContent/topicContent.js
import api from '../../utils/api.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: undefined,//存储options
    isLogin: '',//判断登录相关
    InputBottom: 0,//发表评论相关
    commentContent: '',//发表评论的内容
    shareID: '',//存储这篇经验的id
    userID: '',//存储观看这篇经验的用户id
    title: "经验的标题",
    content: "经验的内容",
    view: 66,
    good: 66,
    name: "作者名字",
    avatar: "https://img.xiaoyou66.com/images/2020/01/21/nNUi.png",//作者头像
    goodStatus: 0,//判断是否点赞
    collectStatus: 0,//判断是否收藏
    time: "2020-2-29",
    authorID: 5,//作者id
    imgs: "https://img.xiaoyou66.com/images/2020/01/21/nNUi.png&&https://img.xiaoyou66.com/images/2020/01/21/nNUi.png&&https://img.xiaoyou66.com/images/2020/01/21/nNUi.png",//很多图像
    img: '',
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
  collectionTopic: function () {//收藏或者取消收藏
    if(app.globalData.isLogin==true){//用户登录了
      let collectStatus = this.data.collectStatus == 0?1:0;
      let that = this;
      api.post(app.globalData.plateCollectShare, {
        shareID: that.data.shareID,
        userID: app.globalData.userID
      }).then((res) => {//收藏或者取消收藏成功
        that.setData({
          collectStatus: collectStatus
        });
      }).catch((err) => {
        that.theFailMeg("操作失败");
      })
    }else{
      this.toLogin();
    }
  },
  toExperienceGoods: function (e) {//给经验点赞或者取消点赞
    if (app.globalData.isLogin == true){//用户登录了
      console.log("给经验点赞", e.currentTarget.dataset.id);
      let goodStatus = this.data.goodStatus == 0?1:0;
      let good = parseInt(this.data.good) + parseInt(goodStatus==1?1: -1);
      let that = this;
      api.post(app.globalData.plateGood, {
        shareID: that.data.shareID,
        userID: app.globalData.userID
      }).then((res) => {
        that.setData({
          goodStatus: goodStatus,
          good: good
        });
      }).catch((err) => {
        that.theFailMeg("操作失败");
      });
    }else{
      this.toLogin();
    }
  },
  toPersonCenter: function (e) {//点击头像进入个人中心
    console.log("即将要跳转到个人中心：", e.currentTarget.dataset.id, e.currentTarget.dataset.img);
    wx.navigateTo({
      url: '/pages/personCenter/personCenter?userID=' + e.currentTarget.dataset.id + '&imgUrl=' + e.currentTarget.dataset.img
    });
  },
  toCommentGoods: function (e) {//给评论点赞或者取消点赞
    if (app.globalData.isLogin == true) {//用户登录了
      console.log("给评论点赞", e.currentTarget.dataset.id, e.currentTarget.dataset.index);
      let that = this;
      let index = e.currentTarget.dataset.index;
      let state = this.data.object8[index].state==0?1:0;
      let good = parseInt(this.data.object8[index].good) + parseInt(state==1?1:-1);
      let commentID = e.currentTarget.dataset.id;
      //改变数组里面的某个对象的数据的值
      let objectGood = "object8[" + index + "].good";
      let objectGoodStatus = "object8[" + index + "].state";
      api.post(app.globalData.commentGood, {//给评论点赞或者取消点赞
        userID: app.globalData.userID,
        commentID: commentID
      }).then((res) => {
        that.setData({
          [objectGoodStatus]: state,
          [objectGood]: good
        });
      }).catch((err) => {
        that.theFailMeg("操作失败");
      });
    }else{
      this.toLogin();
    }
  },
  deleteExperience: function () {//删除经验
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除这篇经验分享么?',
      success: function (res) {
        if(res.cancel){
          console.log("用户取消删除id为：", that.data.shareID, "的经验");
        }else{
          console.log("用户确认删除id为：", that.data.shareID, "的经验");
          api.post(app.globalData.plateDeleteShareContent, {
            shareID: that.data.shareID,
            userID: app.globalData.userID
          }).then((res) => {
            if(that.data.options.plateID != undefined){//传了数据过来
              wx.reLaunch({//删除成功去经验列表界面页面
                url: '/pages/experienceList/experienceList?plateID='+that.data.options.plateID+'&name='+that.data.options.name+'&description='+that.data.options.description
              });
            }else{
              var pages = getCurrentPages(); //当前页面
              var beforePage = pages[pages.length - 2]; //前一页
              wx.navigateBack({
                success: function () {
                  console.log("返回上一个界面");
                  //beforePage.onLoad(); // 执行前一个页面的onLoad方法
                }
              });
            }
          }).catch((err) => {
            that.theFailMeg("删除分享失败");
          })
        }
      }
    });
  },
  deleteComment: function (e) {//删除评论
    let that = this;
    let index = e.currentTarget.dataset.index;
    let commentID = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确认删除这调评论么?',
      success: function (res) {
        if (res.cancel) {
          console.log("用户取消删除id为：", commentID, "的评论");
        } else {
          console.log("用户确认删除id为：", commentID, "的评论");
          api.post(app.globalData.commentDelete, {
            commentID: commentID,
            userID: app.globalData.userID
          }).then((res) => {
            let object8 = that.data.object8;
            object8.splice(index, 1);
            that.setData({//模拟删除数组中的东西
              object8: object8
            });
          }).catch((err) => {
            that.theFailMeg("删除评论失败");
          })
        }
      }
    });
  },
  editExperience: function(){//进入修改经验页面
    wx.navigateTo({
      url: '/pages/experienceEdit/experienceEdit?shareID=' + this.data.shareID
    });
  },
  commentContent: function (e) {//发表评论的内容
    this.setData({
      commentContent: e.detail.value
    });
  },
  submitComment: function () {//点击发表评论
    if (app.globalData.isLogin == true) {//用户登录了
      let that = this;
      console.log("发表评论：", this.data.commentContent);
      api.post(app.globalData.commentPublish, {
        commentType: 1,
        userID: app.globalData.userID,
        content: that.data.commentContent,
        postID: that.data.shareID
      }).then((res) => {//发表评论成功，则重新调用接口获取评论内容
        this.setData({
          commentContent: ''
        });
        that.getCommentList(that.data.shareID, app.globalData.userID);
      }).catch((err) => {
        that.theFailMeg("发表评论失败");
      })
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
  toLogin() {//去登录
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  theFailMeg: function (title) {//提示信息函数
    wx.showToast({
      title: title,
      image: '../../image/登录失败.png'
    });
  },
  getCommentList: function (postID, userId){//获取评论列表
    let that = this;
    api.get(app.globalData.commentCommentList, {
      postType: 1,
      postID: postID,
      userId: userId
    }).then((res) => {
      that.setData({
        object8: res.data
      });
    }).catch((err) => {
      that.theFailMeg("获取评论列表失败");
    })
  },
  clickImg: function (e) {//显示图片
    wx.previewImage({
      urls: [e.target.dataset.img], //需要预览的图片http链接列表，注意是数组
      current: '', // 当前显示图片的http链接，默认是第一个
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options != undefined){
      console.log("来到经验详情界面：", options);
      let that = this;
      this.setData({//存一些需要的数据
        options: options,
        shareID: options.shareID,
        userID: app.globalData.userID,
        isLogin: app.globalData.isLogin
      });
      api.get(app.globalData.plateShareContent,{//获取经验文章信息
        shareID: options.shareID,
        userID: options.userID
      }).then((res) => {
        let data = res.data;
        that.setData({
          content: data.content,
          title: data.title,
          time: data.time,
          avatar: data.avatar,
          name: data.name,
          img: data.img.split("&&"),//字符串分割
          view: data.view,
          good: data.good,
          goodStatus: data.goodStatus,
          collectStatus: data.collectStatus,
          authorID: data.authorID
        });
      }).catch((err) => {
        that.theFailMeg("获取经验分享信息失败");
      });
      this.getCommentList(options.shareID, app.globalData.userID);//获取评论列表
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