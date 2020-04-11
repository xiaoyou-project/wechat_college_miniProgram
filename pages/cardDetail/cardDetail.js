// pages/cardDetail/cardDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardID: -1,
    userId: -1,//进入这个打卡的用户的id
    name: "用户名",
    imgUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
    title: "打卡标题",
    userID: 1,//发起打卡的人的id
    time: "2020-2-29",
    description: "打卡的描述内容哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈呵呵呵呵呵呵呵呵呵呵或或或或或或哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈呵呵呵呵呵呵呵呵呵呵",
    cardStatus: 0,//是否加入了这个打卡
    nowStatus: 0,//今天是否打卡
    keepDay: 1,
    totalDay: 6,
    peoples: 8,
    textareaAValue: '',//打卡感想
    showCardInput: 0,//是否展示打卡感想输入框
    object8: [//打卡记录列表
      {
        id: 1,
        name: "评论的用户名字",
        good: 66,
        content: "这是一条评论内容哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈呵呵呵呵呵呵呵呵呵呵或或或或或或或或或或或或或或或或或或或或或或或123",
        imgUrl: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqdCLCAkToM481u8IS2MH0E2UxP4nm5veUeUpuSGFBXPb6eFDvluTZUWc69keqLnTib5jeVyfzDWSw/132",//评论的用户头像
        userID: 1,//评论的用户的id
        time: "2020-2-29",
        state: 0
      },
      {
        id: 2,
        name: "评论的用户名字",
        good: 99,
        content: "这是一条评论内容",
        imgUrl: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqdCLCAkToM481u8IS2MH0E2UxP4nm5veUeUpuSGFBXPb6eFDvluTZUWc69keqLnTib5jeVyfzDWSw/132",//评论的用户头像
        userID: 5,//评论的用户的id
        time: "2020-2-29",
        state: 1
      }
    ],
  },
  toPersonCenter: function (e) {//点击头像进入个人中心
    wx.navigateTo({
      url: '/pages/personCenter/personCenter?userID=' + e.currentTarget.dataset.id
    });
  },
  toCommentGoods: function (e) {//给评论点赞或者取消点赞
    console.log("给评论点赞", e.currentTarget.dataset.id, e.currentTarget.dataset.index);
    let index = e.currentTarget.dataset.index;
    let good = this.data.object8[index].good;
    //改变数组里面的某个对象的数据的值
    let objectGood = "object8[" + index + "].good";
    let objectGoodStatus = "object8[" + index + "].state";
    if (this.data.object8[index].state == 0) {
      //还没点赞
      //记得调接口
      this.setData({
        [objectGoodStatus]: 1,
        [objectGood]: good + 1
      });
    } else {
      //取消点赞
      this.setData({
        [objectGoodStatus]: 0,
        [objectGood]: good - 1
      });
    }
  },
  deleteComment: function (e) {//删除评论
    let that = this;
    let commentID = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确认删除这条评论么?',
      success: function (res) {
        console.log("用户确认删除id为：", commentID, "的评论");
      }
    });
  },
  deleteCard: function () {//删除打卡
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除这个打卡么?',
      success: function (res) {
        console.log("用户确认删除id为：", that.data.cardID, "的打卡");
      }
    });
  },
  joinCard: function(){//加入打卡
    console.log("加入打卡用户id", this.data.userId, "打卡id",this.data.cardID);
    //记得调用接口
    this.setData({
      cardStatus: 1
    });
  },
  clockCard: function(){//立即打卡
    console.log("打卡用户id", this.data.userId, "打卡id", this.data.cardID);
    let keepDay = this.data.keepDay;
    //这里还有一个感想
    //
    this.setData({
      nowStatus: 1,
      keepDay: keepDay + 1
    });
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
        console.log("确认退出打卡id为：", that.data.cardID, "的打卡");
        that.setData({
          cardStatus: 0
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("进入打卡详细界面：", options);
    this.setData({
      cardID: options.cardID,
      userId: options.userID
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