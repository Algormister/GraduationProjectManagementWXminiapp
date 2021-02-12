// pages/asinfo/asinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:"",
    name:"",
    list:"",
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
        // console.log(res);
        that.setData({
          userid:res.data.userid,
          name:res.data.name
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
    let that = this
    wx.cloud.callFunction({
      name: 'sread',
    }).then(res => {
      console.log(res.result)
      that.setData({
        showLoading: false,
        list:res.result
      })
    })
  },
  st:function(e){
    console.log(e.currentTarget.dataset.base)
    if(e.currentTarget.dataset.base.tno != null){
    wx.showModal({
      title: '导师',
      content: '姓名：'+e.currentTarget.dataset.base.tname+'\r\n'+'工号：'+e.currentTarget.dataset.base.tno+'\r\n'+'手机：'+e.currentTarget.dataset.base.tphone,
      showCancel:false
    })
  }
  else{
    wx.showModal({
      title: '导师',
      content: '未找到该学生导师信息',
      showCancel:false
    })
  }
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