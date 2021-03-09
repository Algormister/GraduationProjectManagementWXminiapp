// pages/student/student.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userid:"",
      name:"",
      zt:"",
      list:"",
      zt:""
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getStorage({
      key: 'userinfo',
      success:function(res){
        wx.cloud.callFunction({
          name: 'stopic',
          data:{
            sno:res.data.userid
          }
        }).then(res => { 
          that.setData({
            showLoading: false,
            list:res.result,
          })
          console.log(res.result)
    
        })
        // console.log(res);
        that.setData({
          userid:res.data.userid,
          name:res.data.name,
          showLoading:false
        })
      }
    })


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
  Tochatroom: function(e){
    let that = this
    wx.cloud.callFunction({
      name: 'mysql',
      data: {
        e: 'getT',
        sno: that.data.userid
      }
    }).then(res => {
      console.log(res.result[0].tno);
      console.log('../im/room/room?id=' + res.result[0].tno + that.data.userid);
      wx.navigateTo({
        url: '../im/room/room?id=' + res.result[0].tno + that.data.userid,
      })
    }).catch(err => {
      console.log(err)
    })
  }
})