//index.js
const app = getApp()

Page({
  data: {
    userid:"",
    name:""
  },

  onShow:function(){
    wx.hideHomeButton()
  },

  onLoad: function() {
    let that = this
    wx.getStorage({
      key: 'userinfo',
      success:function(res){
        // console.log(res);
        that.setData({
          userid:res.data.userid,
          name:res.data.name
        })
      }
    })
    // console.log(this.data.userid);
  },
  logout:function(){
    wx.removeStorage({
      key: 'userinfo',
    })
    wx.redirectTo({
      url: '../login/login',
    })
  },

  mysqltest:function(){
    let that = this
    wx.cloud.callFunction({
      name: 'mysql',
      data: {
        e: 'getpassword',
        userid: '00000000'
      }
    }).then(res => {
      console.log(res.result)
    }).catch(err => {
      console.log(err)
    })
  }
})
