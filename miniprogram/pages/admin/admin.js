// pages/admin/admin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userid:"",
      name:"",
      show: false,
      datestart:'',
      dateend:'',
      timestart:'',
      timeend: '',
      showLoading: false
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
    let app = getApp()
    this.setData({
      datestart:app.globalData.currentdate,
      dateend: app.globalData.currentdate,
      timestart: app.globalData.currenttime,
      timeend: app.globalData.currenttime
    })
    // console.log(this.data.datestart);
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
  show(){
    this.setData({
      show: !this.data.show
    })
  },
  close(){
    this.setData({
      show: false
    })
  },
  changedatestart(e){
    console.log(e);
    this.setData({
      datestart: e.detail.value
    })
  },
  changedateend(e){
    this.setData({
      dateend: e.detail.value
    })
  },
  changetimestart(e){
    this.setData({
      timestart: e.detail.value
    })
  },
  changetimeend(e){
    this.setData({
      timeend: e.detail.value
    })
  },
  confirm(){
    let that = this
    let app = getApp()
    app.globalData.datestart = this.data.datestart
    app.globalData.dateend = this.data.dateend
    app.globalData.timestart = this.data.timestart
    app.globalData.timeend = this.data.timeend
    console.log(app.globalData.datestart);
    this.setData({
      show: false,
      showLoading: true
    })
    wx.cloud.callFunction({
      name: 'mysql',
      data: {
        e: 'inittime',
        datestart: that.data.datestart,
        timestart: that.data.timestart,
        dateend: that.data.dateend,
        timeend: that.data.timeend
      }
    }).then(res => {
      console.log(res);
      wx.showToast({
        title: '设置成功',
        icon: 'none',
        duration: 2000,
        mask:true
      })
      that.setData({
        showLoading: false
      })
    }).catch(err => {
      console.log(err);
    })
  }
})