// pages/topicContent/topicContent.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareID: '',//存储这篇经验的id
    userID: '',//存储观看这篇经验的用户id
    title: "经验的标题",
    content: "一个农民从洪水中救起了他的妻子，他的孩子却被淹死了。事后，人们议论纷纷。有的说他做得对，因为孩子可以再生一个，妻子却不能死而复活。有的说他做错了，因为妻子可以另娶一个，孩子却不能死而复活。我听了人们的议论，也感到疑惑难决：如果只能救活一人，究竟应该救妻子呢，还是救孩子？于是我去拜访那个农民，问他当时是怎么想的。他答道：“我什么也没想。洪水袭来，妻子在我身过，我抓住她就往附近的山坡游。当我返回时，孩子已经被洪水冲走了。”归途上，我琢磨着农民的话，对自己说：如果当时这个农民稍有迟疑，可能一个都救不了；所谓人生的抉择，不少便是如此。",
    view: 66,
    good: 66,
    name: "作者名字",
    avatar: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqdCLCAkToM481u8IS2MH0E2UxP4nm5veUeUpuSGFBXPb6eFDvluTZUWc69keqLnTib5jeVyfzDWSw/132",//作者头像
    goodStatus: 0,//判断是否点赞
    collectStatus: 1,//判断是否收藏
    time: "2020-2-29",
    authorID: 5,//作者id
    imgs: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg&&https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg&&https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",//很多图像
    img: '',
    object8: [//评论列表
      {
        id: 1,
        name: "评论的用户名字",
        good: 66,
        content: "这是一条评论内容",
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
  collectionTopic: function () {//收藏或者取消收藏
    if (this.data.collectStatus == 0) {
      //还没收藏
      //记得调接口
      this.setData({
        collectStatus: 1
      });
    } else {
      //取消收藏
      this.setData({
        collectStatus: 0
      });
    }
  },
  toExperienceGoods: function (e) {//给经验点赞或者取消点赞
    console.log("给经验点赞", e.currentTarget.dataset.id);
    let good = this.data.good;
    if (this.data.goodStatus == 0) {
      //还没点赞
      //记得调接口
      this.setData({
        goodStatus: 1,
        good: good + 1
      });
    } else {
      //取消点赞
      this.setData({
        goodStatus: 0,
        good: good - 1
      });
    }
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
        }
      }
    });
  },
  deleteComment: function (e) {//删除评论
    let that = this;
    let commentID = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确认删除这篇经验分享么?',
      success: function (res) {
        if (res.cancel) {
          console.log("用户取消删除id为：", commentID, "的评论");
        } else {
          console.log("用户确认删除id为：", commentID, "的评论");
        }
      }
    });
  },
  editExperience: function(){//进入修改经验页面
    let shareID = this.data.shareID;
    let userID = this.data.userID;
    let title = this.data.title;
    let content = this.data.content;
    let imgs = this.data.imgs;
    wx.navigateTo({
      url: '/pages/experienceEdit/experienceEdit?shareID=' + shareID +'&userID=' + userID + '&title=' + title + '&content=' + content + '&imgs=' + imgs
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("来到经验详情界面：", options);
    
    this.setData({
      img: this.data.imgs.split("&&")
    });
    // console.log("分割字符串，", this.data.img.split("&&"));
    this.setData({
      shareID: options.shareID,
      userID: options.userID
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