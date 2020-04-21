// pages/applyPlate/applyPlate.js
import api from '../../utils/api.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',//申请的板块名字
    content: '',//申请板块的描述
    defaultImg: 'https://img.xiaoyou66.com/images/2020/04/17/ThZr.jpg',//申请板块的默认背景图片
    imgUrl: "",
    imgList: [],
  },
  titleChange: function (e) {//填写经验标题
    // console.log("经验标题改变的时候：", e.detail.value);
    console.log(this.data);
    this.setData({
      name: e.detail.value
    });
  },
  contentChange: function (e) {//填写板块内容
    // console.log("内容改变的时候：", e.detail.value);
    this.setData({
      content: e.detail.value
    });
  },
  submitCard: function () {//点击确认申请板块
    if (app.globalData.isLogin == true) {//用户已经登录了
      console.log("发布经验");
      //先上传图片，然后拿到图片地址
      let that = this;
      if(that.data.imgList.length == 0){//用户没有上传图片
        that.setData({
          imgUrl: that.data.defaultImg
        });
        that.submitApply();
      }else{
        that.uploadImage(that.data.imgList[0]);//上传图片
      }
    } else {
      wx.navigateTo({//去登录界面
        url: '/pages/login/login'
      })
    }
  },
  submitApply: function () {//真正发布申请板块
    let that = this;
    api.post(app.globalData.plateApplicationPlate, {
      userID: app.globalData.userID,
      name: that.data.name,
      content: that.data.content,
      imgUrl: that.data.imgUrl,
    }).then((res) => {
      wx.switchTab({//申请板块成功去板块页面
        url: '/pages/plate/plate'
      })
    }).catch((err) => {
      wx.showToast({
        title: "申请失败",
        image: '../../image/登录失败.png'
      });
    })
  },
  ViewImage(e) {//上传图片
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  ChooseImage() {//上传图片
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  DelImg(e) {//删除图片
    wx.showModal({
      title: '提示',
      content: '确定要删除选中的图片么？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  uploadImage(imgPath) {//上传图片
    wx.showLoading({
      title: '上传中...',
    });
    let that = this;
    //上传图片到自己服务器
    wx.uploadFile({
      url: 'https://college.xiaoyou66.com/api/img/upload',
      filePath: imgPath,
      name: 'file',
      success(res) {
        wx.hideLoading();//将加载icon隐藏
        //服务器返回图片地址，把图片地址给粘贴上去
        let data = JSON.parse(res.data)
        console.log(data)
        if (data.code == 1) {
          that.setData({
            imgUrl: data.data.src,
          })
          that.submitApply();//发送申请
          console.log("上传图片", data.data.src);
          console.log("上传图片", that.data);
        } else {
          wx.showToast({
            title: "上传图片失败",
            image: '../../image/登录失败.png'
          });
        }
      },
      fail: () => {
        wx.hideLoading();//将加载icon隐藏
        wx.showToast({
          title: "上传图片失败",
          image: '../../image/登录失败.png'
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("申请板块界面");
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