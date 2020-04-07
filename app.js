//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log("用户信息：", res.userInfo );

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  wxLogin: function () {
    console.log("调用登录方法", this.globalData);
    wx.showLoading({
      title: '加载中...',
    });
    // 登录
    wx.login({
      success: res => {
        console.log(res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res);
        wx.request({
          url: 'https://www.yunshangshuge.cn/userinform/getOpenId',
          data: {
            code: res.code
          },
          method: 'GET',
          success: res => {
            console.log("信息", res);
            //获取用户的openid
            // console.log(res.data);
            console.log("用户数据：", res.data);
            this.globalData.openid = res.data.openid;
            this.globalData.session_key = res.data.session_key;
            // 获取用户信息
            wx.getSetting({
              success: res => {
                if (res.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                  wx.getUserInfo({
                    success: res => {
                      // 可以将 res 发送给后台解码出 unionId
                      this.globalData.userInfo = res.userInfo;
                      // console.log(res.userInfo);
                      //用户信息初始化
                      wx.request({
                        header: { "Content-Type": "application/x-www-form-urlencoded" },
                        url: 'https://www.yunshangshuge.cn/initinform',
                        data: {
                          openid: this.globalData.openid,
                          wxName: res.userInfo.nickName
                        },
                        method: 'POST',
                        success: () => {
                          console.log("发送成功");
                          this.globalData.isLogin = "true";
                        },
                        fail: () => {
                          console.log("发送失败");
                        },
                        complete: () => {
                          console.log("完成了");
                          wx.switchTab({
                            url: "/pages/index/index",
                            success: () => {
                              console.log("跳转成功");
                              wx.hideLoading()
                            },
                            fail: () => {
                              console.log("跳转失败");
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
                }
              }
            })
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    openid: '',//用户的openid
    userID: '',//用户的id
    session_key: '',
    sameUrl: 'https://www.yunshangshuge.cn',//域名前面的那些相同的部分
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
    plateGood: '/api/plate/update/good', //27、点赞或取消点赞
    plateCollect: '/api/plate/update/collect',//28、（取消）收藏经验
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
  }
})