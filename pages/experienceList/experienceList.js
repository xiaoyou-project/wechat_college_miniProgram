// pages/experienceList/experienceList.js
import api from '../../utils/api.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animation: '',
    buttonName: 'fade',
    isLogin: false,//存储登录信息
    userID: 0,//存储进入这个页面的用户id
    options: '',//存一下别的页面传过来的options
    showIndex: 0,
    name: '',//板块的名字
    description: '',//板块的描述
    plateID: '',//板块的id
    collectionStatus: 0,//版块的收藏状态，0表示没有收藏，1表示已经收藏了
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
  onSearch(e) {//搜索事件
    wx.navigateTo({
      url: '/pages/plateSearch/plateSearch?key=' + e.detail.value
    })
  },
  experienceArticle: function (e) {//点击经验去经验页面
    let index = e.currentTarget.dataset.value;
    wx.navigateTo({
      url: '/pages/experienceContent/experienceContent?shareID=' + this.data.object10[index].id + '&userID=' + app.globalData.userID + '&plateID='+this.data.plateID+'&name='+this.data.name+'&description='+this.data.description
    });
  },
  toReleaseExperience: function(e){//去分享经验界面
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
          url: '/pages/releaseExperience/releaseExperience?plateID=' + that.data.plateID + '&name=' + that.data.name + '&description=' + that.data.description
        });
      })
    }, 500);
  },
  collectionPlate: function(){//收藏这个版块或者取消收藏这个版块
    if(app.globalData.isLogin == true){
      let that = this;
      let status = this.data.collectionStatus == 0 ? 1 : 0;
      api.post(app.globalData.plateCollect,{
        userID: that.data.userID,
        plateID: that.data.plateID
      }).then((res) => {
        that.setData({
          collectionStatus: status
        });
      }).catch((err) => {
        wx.showToast({
          title: "操作失败",
          image: '../../image/登录失败.png'
        });
      })
    }else{
      wx.navigateTo({
        url: '/pages/login/login'
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options != undefined){
      console.log("来到某个板块的经验列表页面", options);
      let that = this;
      this.setData({
        options: options,
        name: options.name,
        plateID: options.plateID,
        userID: app.globalData.userID,
        description: options.description,
        isLogin: app.globalData.isLogin
      });
      api.get(app.globalData.plateShareList,{//先获取经验列表信息
        plateID: options.plateID
      }).then((res) => {
        that.setData({//保存数据
          object10: res.data
        });
      }).catch((err) => {
        wx.showToast({
          title: "获取经验列表信息失败",
          image: '../../image/登录失败.png'
        });
      });
      if(app.globalData.isLogin == true){//这个用户登录了
        api.get(app.globalData.userPlateStatus, {//获取用户是否收藏这个板块
          plateID: options.plateID,
          userID: app.globalData.userID
        }).then((res) => {
          if(res.data.code == 1){//用户收藏了
            that.setData({
              collectionStatus: 1
            });
          }else{
            that.setData({
              collectionStatus: 0
            });
          }
        }).catch((err) => {
          wx.showToast({
            title: "获取用户收藏状态失败",
            image: '../../image/登录失败.png'
          });
        })
      }
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