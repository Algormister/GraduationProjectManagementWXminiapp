// pages/student/student.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userid:"",
      name:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    wx.hideHomeButton()
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