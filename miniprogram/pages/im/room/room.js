const app = getApp()
Page({
  data: {
    avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic2%2Fcover%2F00%2F36%2F49%2F5811d7c48840d_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616612835&t=c6b5dd21ca261f8740f5f3088f84a5f1',
    userInfo: null,
    logged: false,
    takeSession: false,
    requestResult: '',
    // chatRoomEnvId: 'release-f8415a',
    chatRoomCollection: 'admin',     //chatroom
    // chatRoomGroupId: 'demo',
    chatRoomGroupId: '',
    chatRoomGroupName: '聊天室',

    // functions for used in chatroom components
    onGetUserInfo: null,
    getOpenID: null,
    userid: ''
  },

  onLoad: function(options) {
    let that = this
    this.setData({
      chatRoomGroupId: options.id
    })
    wx.getStorage({
      key: 'userinfo',
      success: res =>{ 
        that.setData({
          userInfo: {
            nickname: res.data.name,
            avatarUrl: this.data.avatarUrl,
          },
          logged: true,
          userid: res.data.userid
        })
        console.log(that.data);
      }
    })
    
    
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           this.setData({
    //             avatarUrl: res.userInfo.avatarUrl,
    //             userInfo: res.userInfo
    //           })
    //           // console.log(res);
              
    //         }
    //       })
    //     }
    //   }
    // })
    this.setData({
      onGetUserInfo: this.onGetUserInfo,
      getOpenID: this.getOpenID,
    })

    wx.getSystemInfo({
      success: res => {
        console.log('system info', res)
        if (res.safeArea) {
          const { top, bottom } = res.safeArea
          this.setData({
            // containerStyle: `padding-top: ${(/ios/i.test(res.system) ? 10 : 20) + top}px; padding-bottom: ${20 + res.windowHeight - bottom}px`,
            containerStyle: ''
          })
        }
      },
    })
  },

  getOpenID: async function() {
    // if (this.openid) {
    //   return this.openid
    // }
    // const { result } = await wx.cloud.callFunction({
    //   name: 'login',
    // })
    // return result.openid
    while(true){
      if (this.data.userid != '')
      {
        console.log(this.data.userid);
        break
      }
    }
    return this.data.userid
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onShareAppMessage() {
    return {
      title: '即时通信 Demo',
      path: '/pages/im/room/room',
    }
  },
})
