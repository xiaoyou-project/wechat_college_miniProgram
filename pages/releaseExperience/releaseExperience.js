// pages/releaseExperience/releaseExperience.js
import api from '../../utils/api.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploadImgNum: 0,//存储上传了的图片数量
    title: '',//发布的经验标题
    content: '',//发布经验的内容
    imgList: [],//上传的图片
    plateID: 0,//上传经验的板块id
    name: '',//板块的名字
    description: '',//板块的描述
    imgUrl: '',//存储上传的图片

  },
  titleChange: function (e) {//填写经验标题
    // console.log("经验标题改变的时候：", e.detail.value);
    // console.log(this.data);
    this.setData({
      title: e.detail.value
    });
  },
  contentChange: function (e) {//填写经验内容
    // console.log("内容改变的时候：", e.detail.value);
    this.setData({
      content: e.detail.value
    });
  },
  submitCard: function () {//发布经验
    if(app.globalData.isLogin == true){//用户已经登录了
      console.log("发布经验");
      //先上传图片，然后拿到图片地址
      let that = this;
      if(that.data.imgList.length > 0){//有图片
        that.data.imgList.forEach(function(item, index){//先上传图片
          that.uploadImage(item);
        });
      }else{//没有图片
        api.post(app.globalData.releaseExperience, {
          userID: app.globalData.userID,
          title: that.data.title,
          content: that.data.content,
          plateID: that.data.plateID,
          imgUrl: that.data.imgUrl
        }).then((res) => {
          // wx.reLaunch({//分享成功去经验列表页面
          //   url: '/pages/experienceList/experienceList?plateID='+that.data.plateID+'&name='+that.data.name+'&description='+that.data.description
          // });
          // var pages = getCurrentPages(); //当前页面
          // var beforePage = pages[pages.length - 2]; //前一页
          // wx.navigateBack({
          //   success: function () {
          //     beforePage.onLoad(beforePage.data.options); // 执行前一个页面的onLoad方法
          //   }
          // });
          var pages = getCurrentPages(); //当前页面
          var beforePage = pages[pages.length - 2]; //前一页
          wx.navigateBack({
            success: function () {
              beforePage.onLoad(beforePage.data.options); // 执行前一个页面的onLoad方法
            }
          });
        }).catch((err) => {
          wx.showToast({
            title: "发布失败",
            image: '../../image/登录失败.png'
          });
        });
      }
    }else{
      wx.navigateTo({//去登录界面
        url: '/pages/login/login'
      })
    }
  },
  ViewImage(e) {//上传图片
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  ChooseImage() {//上传图片
    wx.chooseImage({
      count: 4, //默认9
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
      url: 'http://127.0.0.1:2333/api/img/upload',
      filePath: imgPath,
      name: 'file',
      success(res) {
        wx.hideLoading();//将加载icon隐藏
        //服务器返回图片地址，把图片地址给粘贴上去
        let data = JSON.parse(res.data)
        console.log(data)
        if (data.code == 1) {
          if(that.data.imgUrl.length == 0){//第一次拼接
            that.setData({
              imgUrl: data.data.src,
              uploadImgNum: parseInt(that.data.uploadImgNum) + 1
            })
          }else{
            that.setData({
              imgUrl: that.data.imgUrl.concat("&&" + data.data.src),
              uploadImgNum: parseInt(that.data.uploadImgNum) + 1
            })
          }
          if (that.data.uploadImgNum == that.data.imgList.length) {//图片都上传完了
            api.post(app.globalData.releaseExperience, {
              userID: app.globalData.userID,
              title: that.data.title,
              content: that.data.content,
              plateID: that.data.plateID,
              imgUrl: that.data.imgUrl
            }).then((res) => {
              wx.reLaunch({//分享成功去经验列表页面
                url: '/pages/experienceList/experienceList?plateID=' + that.data.plateID + '&name=' + that.data.name + '&description=' + that.data.description
              });
            }).catch((err) => {
              wx.showToast({
                title: "发布失败",
                image: '../../image/登录失败.png'
              });
            })
          }
          console.log("上传图片",data.data.src);
          console.log("上传图片",that.data);
        }else{
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
    this.setData({
      plateID: options.plateID,
      name: options.name,
      description: options.description
    })
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