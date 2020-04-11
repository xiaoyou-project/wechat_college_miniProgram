// pages/experienceList/experienceList.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIndex: 0,
    object10: [//某个板块的经验列表页面
      {
        id: 1,
        time: "2020-2-29",
        title: "经验的标题",
        avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        name: "作者1号一二三四",
        content: "简略内容啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦",
        img: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        total: 66,
        view: 77,
        comments: 88
      },
      {
        id: 2,
        time: "2020-2-29",
        title: "经验2的标题",
        avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        name: "作者2号一二三四",
        content: "简略内容哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈或或或或或或或或或",
        img: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        total: 66,
        view: 77,
        comments: 88
      },
      {
        id: 3,
        time: "2020-3-29",
        title: "经验3的标题",
        avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        name: "作者3号一二三四",
        content: "简略内容呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃鹅鹅鹅鹅鹅鹅饿",
        img: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        total: 66,
        view: 77,
        comments: 88
      }, {
        id: 4,
        time: "2020-4-29",
        title: "经验的标题",
        avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        name: "作者4号一二三四",
        content: "简略内容哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈或或或或或或或或或",
        img: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        total: 66,
        view: 77,
        comments: 88
      },
      {
        id: 5,
        time: "2020-5-29",
        title: "经验5的标题",
        avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        name: "作者5号一二三四",
        content: "简略内容呜呜呜呜呜呜呜呜无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无",
        img: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        total: 66,
        view: 77,
        comments: 88
      },
      {
        id: 6,
        time: "2020-6-29",
        title: "经验6的标题",
        avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        name: "作者6号一二三四",
        content: "简略内容么么么么么么么木木木木木木木木木木木木木木木木木木木木木木木木木木木木木木木木",
        img: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        total: 66,
        view: 77,
        comments: 88
      },
      {
        id: 7,
        time: "2020-7-29",
        title: "经验7的标题",
        avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        name: "作者7号一二三四",
        content: "简略内容是否合适DNF喜欢佛黄金时代非你莫属的，覆写和V型就成了圣诞节发送到发会计师的飞机扣水电费看了还快递费",
        img: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        total: 66,
        view: 77,
        comments: 88
      },
      {
        id: 8,
        time: "2020-8-29",
        title: "经验8的标题",
        avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        name: "作者8号一二三四",
        content: "简略内容嘻嘻嘻嘻嘻嘻嘻嘻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻",
        img: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        total: 66,
        view: 77,
        comments: 88
      }
    ],
  },
  panel: function (e) {//折叠版函数
    if (e.currentTarget.dataset.index != this.data.showIndex) {
      this.setData({
        showIndex: e.currentTarget.dataset.index
      })
    } else {
      this.setData({
        showIndex: 0
      })
    }
  },
  experienceArticle: function (e) {//点击经验去经验页面
    let index = e.currentTarget.dataset.value;
    wx.navigateTo({
      url: '/pages/experienceContent/experienceContent?shareID=' + this.data.object10[index].id + '&userID=' + app.globalData.userID
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("来到某个板块的经验列表页面");
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