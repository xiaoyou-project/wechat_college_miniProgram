//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    console.log("取缓存openid：",wx.getStorageSync("openid"));
    console.log("取缓存userID：", wx.getStorageSync("userID"));
    console.log("取缓存isLogin：", wx.getStorageSync("isLogin"));
    this.globalData.isLogin = wx.getStorageSync("isLogin");
    if (this.globalData.isLogin == true){//用户已经登录了的
      this.wxLogin();
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log("已经授权过了用户信息为：", res.userInfo );

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          console.log("这个用户还没有登录过");
          this.globalData.isLogin = false;
          wx.navigateTo({
            url: '/pages/login/login'
          });
        }
      }
    });
  },
  getUserInfo: function (id) {//初始化用户信息，获取college，name，sex
    wx.request({
      url: 'https://college.xiaoyou66.com/api/user/get/userInfo',
      data: {
        userId: id
      },
      method: 'GET',
      success: (res) => {
        if(res.data.code == 1){
          //获取成功
          this.globalData.college = res.data.data.college;
          this.globalData.name = res.data.data.name;
          this.globalData.sex = res.data.data.sex;
        }else{
          wx.showToast({
            title: "获取用户信息失败，请重试",
            image: './image/登录失败.png'
          });
        }
      },
      fail: () => {
        console.log("获取用户信息失败，请重试");
      }
    })
  },
  wxLogin: function () {
    if (this.globalData.isLogin == true){
      //本地已经缓存了
      this.globalData.openid = wx.getStorageSync("openid");
      this.globalData.userID = wx.getStorageSync("userID");
      this.getUserInfo(this.globalData.userID);//初始化用户信息，获取college，name，sex
    }else{
      //本地还没有缓存
      console.log("调用登录方法", this.globalData);
      wx.showLoading({
        title: '加载中...',
      });
      // 登录
      wx.login({
        success: res => {
          console.log("调用获取openid的方法",res);
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          // console.log(res);
          wx.request({
            //和获取oepnid
            url: 'https://college.xiaoyou66.com/api/user/get/openid',
            data: {
              code: res.code
            },
            method: 'GET',
            success: (res) => {
              if(res.data.code == 0){
                //获取用户数据失败
                wx.showToast({
                  title: "登录失败,请重新登录",
                  image: './image/登录失败.png'
                });
              }else{
                //获取用户openid数据成功
                console.log("获取用户openid数据成功", res.data);
                this.globalData.openid = res.data.data.openid;//存openid
                // 获取用户信息
                wx.getSetting({
                  success: (res) => {
                    if (res.authSetting['scope.userInfo']) {
                      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                      wx.getUserInfo({
                        success: res => {
                          // 可以将 res 发送给后台解码出 unionId
                          this.globalData.userInfo = res.userInfo;

                          wx.request({
                            //注册用户信息
                            header: { "Content-Type": "application/x-www-form-urlencoded" },
                            url: 'https://college.xiaoyou66.com/api/user/registered',
                            data: {
                              openid: this.globalData.openid,
                              nickname: res.userInfo.nickName,
                              imgUrl: res.userInfo.avatarUrl
                            },
                            method: 'POST',
                            success: (res) => {
                              if(res.data.code == 1){
                                //注册用户成功
                                wx.hideLoading();//将加载icon隐藏
                                console.log("注册用户发送成功", res);
                                //将数据存到本地缓存中
                                this.globalData.isLogin = true;
                                this.globalData.userID = res.data.data.userID;//存userID
                                this.getUserInfo(res.data.data.userID);//初始化用户信息，获取college，name，sex
                                wx.setStorageSync('openid', this.globalData.openid);
                                wx.setStorageSync('userID', res.data.data.userID);
                                wx.setStorageSync('isLogin', true);
                              }else{
                                wx.hideLoading();
                                wx.showToast({
                                  title: "登录失败,请重新登录",
                                  image: './image/登录失败.png'
                                });
                              }
                            },
                            fail: () => {
                              console.log("发送失败");
                              wx.hideLoading();
                              wx.showToast({
                                title: "登录失败",
                                image: './image/登录失败.png'
                              });
                            },
                            complete: () => {
                              console.log("完成了");
                              wx.switchTab({
                                url: "/pages/plate/plate",
                                success: () => {
                                  console.log("跳转成功");
                                  wx.hideLoading();
                                },
                                fail: () => {
                                  console.log("跳转失败");
                                  wx.hideLoading();
                                  wx.showToast({
                                    title: "登录失败",
                                    image: './image/登录失败.png'
                                  });
                                }
                              });
                            }

                          })
                          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                          // 所以此处加入 callback 以防止这种情况
                          if (this.userInfoReadyCallback) {
                            this.userInfoReadyCallback(res)
                          }
                        }
                      })
                    }else{
                      wx.hideLoading();//把那个加载框隐藏掉
                    }
                  }
                });
              }
            }
          })
        }
      })
    }
  },
  toLoginPage: function(){
    wx.reLaunch({
      url: '/pages/login/login'
    });
  },
  globalData: {
    userInfo: null,
    openid: '',//用户的openid
    userID: 0,//用户的id
    isLogin: false,//判断用户是否登录
    name: '错误',//个人中心的存用户自己填的名字
    college: '保密',//个人中心的学院
    sex: '保密',//个人中心的用户自己填的性别
    sameUrl: 'https://college.xiaoyou66.com',//域名前面的那些相同的部分
    userOpenId: '/api/user/get/openid',//1、获取用户openid
    userRegistered: '/api/user/registered',//2、用户注册
    userUserInfo: '/api/user/get/userInfo',//3、进入个人中心，获取用户信息
    userUpdateUserInfo: '/api/user/update/userInfo',//4、修改个人中心用户信息
    userShareList: '/api/user/get/shareList',//5、进入个人中心，获取个人分享经验列表
    userCardList: '/api/user/get/cardList',//6、进入个人中心，获取个人加入的打卡，以及创建的打卡
    userTopicalList: '/api/user/get/topicalList',//7、进入个人中心，获取个人创建的话题
    userCollectTopicalList: '/api/user/get/collect/topicalList',//8、获取个人收藏的话题
    userCollectShareList: '/api/user/get/collect/shareList',//9、获取个人收藏的经验
    userCommentMessageList: '/api/user/get/comment/messageList',//10、获取收到评论消息
    userGoodMessageList: '/api/user/get/good/messageList',//11、获取收到赞的消息
    userSystemMessageList: '/api/user/get/system/messageList',//12、获取系统消息
    userMessageStatus: '/api/user/set/messageStatus',//13、修改消息的状态
    topicalTopicalList: '/api/topical/get/topicalList',//14、获取话题列表
    topicalRelease: '/api/topical/release',//15、发布话题
    topicalContent: '/api/topical/get/content',//16、获取话题的内容
    topicalGood: '/api/topical/update/good',//17、话题点赞或者取消赞
    topicalCollect: '/api/topical/update/collect',//18、话题收藏获取取消收藏
    topicalDelete: '/api/topical/delete',//19、删除话题
    commentCommentList: '/api/comment/get/commentList',//20、获取评论内容
    commentDelete: '/api/comment/delete',//21、删除评论
    commentPublish: '/api/comment/publish',//22、发表评论
    platePlateList: '/api/plate/get/plateList',//23、获取板块
    plateShareList: '/api/plate/get/shareList', //24、获取经验列表
    plateShareContent: '/api/plate/get/shareContent',//25、获取经验内容
    plateEditShareContent: '/api/plate/edit/shareContent',//26、修改经验内容
    plateGood: '/api/plate/update/good', //27、点赞或取消点赞经验
    plateCollectShare: '/api/plate/update/collect/share',//28、（取消）收藏经验
    plateDeleteShareContent: '/api/plate/delete/shareContent',//29、删除经验内容
    plateCollectPlateList: '/api/plate/get/collect/plateList', //30、获取我收藏的板块
    plateCollect: '/api/plate/update/collect', //31、收藏板块
    plateApplicationPlate: '/api/plate/application/plate', //32、申请板块
    commentGood: '/api/comment/update/good',//33、点赞或者取消点赞评论
    cardMeCardList: '/api/card/get/me/cardList',//34、获取我的打卡
    cardCardList: '/api/card/get/cardList', //35、获取所有打卡
    cardRelease: '/api/card/release',//36、发起新的打卡
    cardCardContent: '/api/card/get/cardContent',//37、获取打卡内容
    cardFinish: '/api/card/finish',//38、打卡
    cardJoin: '/api/card/join',//39、加入打卡
    cardDelete: '/api/card/delete',//40、删除打卡
    commentType: '/api/comment/type',//41、获取某条评论的类型是经验的还是话题还是打卡
    cardAbort: '/api/card/abort',//42、退出打卡
    releaseExperience: '/api/plate/release/share',//43、发布新经验
    userPlateStatus: '/api/plate/status/collect',//44、判断用户是否收藏板块
    serachTopicalList: '/api/topical/get/search/topicalList',//45、搜索话题列表
  }
})