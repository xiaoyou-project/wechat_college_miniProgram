// pages/experienceList/experienceList.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: '',//存一下别的页面传过来的options
    showIndex: 0,
    name: '',//板块的名字
    description: '',//板块的描述
    plateID: '',//板块的id
    object10: [//某个板块的经验列表页面
      // {
      //   id: 1,
      //   time: "2020-2-29",
      //   title: "经验的标题",
      //   avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
      //   name: "作者1号一二三四",
      //   content: "简略内容啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦",
      //   img: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
      //   total: 66,
      //   view: 77,
      //   comments: 88
      // }
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
  toReleaseExperience: function(){//去分享经验界面
    wx.navigateTo({
      url: '/pages/releaseExperience/releaseExperience'
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("来到某个板块的经验列表页面", options);
    if(options != undefined){
      let that = this;
      this.setData({
        options: options,
        name: options.name,
        plateID: options.plateID,
        description: options.description
      });
      wx.request({//获取某个板块的经验列表
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        url: app.globalData.sameUrl + app.globalData.plateShareList,
        data: {
          plateID: options.plateID
        },
        method: 'get',
        success: (res) => {
          if (res.data.code == 1) {//获取成功
            that.setData({//保存数据
              object10: res.data.data
            });
          } else {
            wx.showToast({
              title: "获取经验列表信息失败",
              image: '../../image/登录失败.png'
            });
          }
        },
        fail: (res) => {
          wx.showToast({
            title: "获取经验列表信息失败",
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