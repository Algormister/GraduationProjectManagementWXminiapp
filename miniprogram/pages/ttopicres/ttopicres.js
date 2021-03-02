// pages/ttopicres/ttopicres.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:"",
    name:"",
    title:"",
    path:"",
    filename:"",
    fileID:"",
    list:"",
    status:"",
    showLoading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getStorage({
      key: 'userinfo',
      success:function(res){
       //console.log(res);
        that.setData({
          userid:res.data.userid,
          name:res.data.name,
          status:res.data.status
        })
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
    console.log(this.data)
    var that = this
    wx.cloud.callFunction({
      name: 'topicread',
      data: {
        // status: that.data.status,
        // tno: that.data.userid
        e: 'getpassword',
        userid: that.data.userid
      }
    }).then(res => { 
      that.setData({
        showLoading: false,
        list:res.result
      })
      console.log(res.result)
    }).catch(err => {
      console.log(err)
    })
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