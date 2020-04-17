// pages/experienceEdit/experienceEdit.js
import api from '../../utils/api.js';
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    uploadImgNum: 0,//存储上传了的图片数量
    shareID: -1,//经验id
    imgList: [],//上传的图片,
    title: "",//标题
    content: "",//内容
    imgUrl: '',
  },
  titleChange: function (e) {//填写经验标题
    // console.log("经验标题改变的时候：", e.detail.value);
    console.log(this.data);
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
  submitCard: function () {//发布修改后的经验
    console.log("发布修改后的经验");
    console.log(this.data);
    //先上传图片，然后拿到图片地址
    let that = this;
    that.data.imgList.forEach(function (item, index) {//先上传图片
      that.uploadImage(item);
    });
  },
  submitExperience: function(){//真正发布修改后的经验
    let that = this;
    if (that.data.uploadImgNum == that.data.imgList.length) {//图片都上传完了
      api.post(app.globalData.plateEditShareContent, {
        userID: app.globalData.userID,
        title: that.data.title,
        content: that.data.content,
        imgUrl: that.data.imgUrl,
        shareID: that.data.shareID
      }).then((res) => {
        wx.switchTab({//分享成功去板块页面
          url: '/pages/plate/plate'
        })
      }).catch((err) => {
        wx.showToast({
          title: "发布失败",
          image: '../../image/登录失败.png'
        });
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
    let that = this;
    //上传图片到自己服务器
    wx.uploadFile({
      url: 'https://college.xiaoyou66.com/api/img/upload',
      filePath: imgPath,
      name: 'file',
      success(res) {
        //服务器返回图片地址，把图片地址给粘贴上去
        let data = JSON.parse(res.data)
        console.log(data)
        if (data.code == 1) {
          if (that.data.imgUrl.length == 0) {//第一次拼接
            that.setData({
              imgUrl: data.data.src,
              uploadImgNum: parseInt(that.data.uploadImgNum) + 1
            })
          } else {
            that.setData({
              imgUrl: that.data.imgUrl.concat("&&" + data.data.src),
              uploadImgNum: parseInt(that.data.uploadImgNum) + 1
            })
          }
          that.submitExperience();//调用发布经验函数
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
        if (that.data.imgUrl == null) {//第一次拼接
          that.setData({
            imgUrl: imgPath,
            uploadImgNum: parseInt(that.data.uploadImgNum) + 1
          })
        } else {
          that.setData({
            imgUrl: that.data.imgUrl.concat("&&" + imgPath),
            uploadImgNum: parseInt(that.data.uploadImgNum) + 1
          })
        }
        that.submitExperience();//调用发布经验函数
        console.log("上传本地图片失败", that.data);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log("进入经验修改中心，", options);
    api.get(app.globalData.plateShareContent, {//获取经验文章信息
      shareID: options.shareID,
      userID: app.globalData.userID
    }).then((res) => {
      let data = res.data;
      that.setData({
        content: data.content,
        title: data.title,
        imgList: data.img.split("&&"),//字符串分割
      });
    }).catch((err) => {
      that.theFailMeg("获取经验分享信息失败");
    });
    this.setData({//初始化数据
      shareID: options.shareID
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