// miniprogram/pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:"",
    password:"",
    showLoading:false,
    currentdate:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app = getApp()
    let date = new Date()
    let that = this
    this.setData({
      currentdate: date.getFullYear() + '-' + app.getmonth(date) + '-' + app.getdate(date)
    })
    // console.log(this.data.currentdate);
    wx.getStorage({
      key: 'userinfo',
      success:function(res){
        if (new Date(app.globalData.datestart) <= new Date(that.data.currentdate) && new Date(app.globalData.dateend) >= new Date(that.data.currentdate)){
          setTimeout(function () {
          // console.log(res);
          let url = '../' + res.data.status + '/' + res.data.status
          // console.log(url);
          wx.redirectTo({
            url: url
          })
          }, 500)
          // console.log(123);
        }
        else if (res.data.status == 'admin')
        {
          setTimeout(function () {
            let url = '../' + res.data.status + '/' + res.data.status
            wx.redirectTo({
              url: url
            })
            }, 500)
        }
        else{
          wx.showToast({
            title: '系统暂未开放',
            icon: 'none',
            duration: 2000,
            mask:true
          })
        }
      }
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

  },

  uid:function(e){
    let id = e.detail.value
    this.setData({
      userid:id
    })
    // console.log(this.data.userid);
  },

  pw:function(e){
    let password = e.detail.value
    this.setData({
      password:password
    })
  },
  reset:function(){
    this.setData({
      userid:"",
      password:""
    })
  },
  login:function(){
    let that = this
    let app = getApp()
    // console.log(this.data.password);
    this.setData({
      showLoading:true
    })
    if (this.data.password == "" || this.data.userid == ""){
      wx.showToast({
        title: '请把表单填写完整',
        icon: 'none',
        duration: 2000,
        mask:true
      })
    }
    else{
      wx.cloud.callFunction({
        name: 'mysql',
        data: {
          e: 'getpassword',
          userid: that.data.userid
        }
      }).then(res => {
        console.log(that.data.userid)
        console.log(res)
        that.setData({
          showLoading: false
        })
        if(res.result.length != 1){
          wx.showToast({
            title: '学工号或密码错误',
            icon: 'none',
            duration: 2000,
            mask:true
          })
          that.setData({
            userid:"",
            password:""
          })
        }
        else
        {
        if(res.result.length == 1 && new Date(app.globalData.datestart) <= new Date(that.data.currentdate) && new Date(app.globalData.dateend) >= new Date(that.data.currentdate) || res.result[0].zw == 'admin')
        {
          if(that.data.password == res.result[0].password){
            wx.setStorage({
            data: {
                userid:that.data.userid,
                password:that.data.password,
                name:res.result[0].name,
                status:res.result[0].zw
              },
              key: 'userinfo',
            })
            if(res.result[0].zw=="admin"){
              wx.redirectTo({
                url: '../admin/admin',
              })
            }
            else if(res.result[0].zw=="teacher"){
              wx.redirectTo({
                url: '../teacher/teacher',
              })
            }
            else if(res.result[0].zw=="student"){
              wx.redirectTo({
                url: '../student/student',
              })
            }
            else{
              wx.showToast({
                title: '发生错误',
                icon: 'none',
                duration: 2000,
                mask:true
              })
              that.setData({
                userid:"",
                password:""
              })
            }
          }
          else{
            wx.showToast({
              title: '密码错误',
              icon: 'none',
              duration: 2000,
              mask:true
            })
            that.setData({
              password:""
            })
          }
        }
        else{
          wx.showToast({
            title: '学工号或密码错误或系统未开放',
            icon: 'none',
            duration: 2000,
            mask:true
          })
          that.setData({
            userid:"",
            password:""
          })
        }
      }
      }).catch(err => {
        console.log(err)
      })
    }
  }
})