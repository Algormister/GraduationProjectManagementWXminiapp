// pages/atopicneed/atopicneed.js
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
  setzt:function(e){
    // 通过（更新）
    console.log(e)
    let that = this
    wx.showModal({
      title: '提示',
      content: '是否确认要将状态设置为通过',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')    
           wx.cloud.callFunction({
           name: 'update',
           data: {
            zt: '1',//1为通过
            tno: e.currentTarget.dataset.tno,
            paper:e.currentTarget.dataset.paper
          }
          }).then(res => {
          console.log(res.result)
          //更新后刷新页面
          wx.cloud.callFunction({
            name: 'areadtopic',
          }).then(res => {
            console.log(res.result)
            that.setData({
              list:res.result
            })
          })
          // that.setData({
          // list:res.result
          // })
        })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  setztnot:function(e){
    // 未通过（更新）
    console.log(e)
    let that = this
    wx.showModal({
      title: '提示',
      content: '是否确认要将状态设置为未通过',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')    
           wx.cloud.callFunction({
           name: 'update',
           data: {
            zt: '2',//2为未通过
            tno: e.currentTarget.dataset.tno,
            paper:e.currentTarget.dataset.paper
          }
          }).then(res => {
          console.log(res.result)
          //更新后刷新页面
          wx.cloud.callFunction({
            name: 'areadtopic',
          }).then(res => {
            console.log(res.result)
            that.setData({
              list:res.result
            })
          })
          // that.setData({
          // list:res.result
          // })
        })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
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
      name: 'areadtopic',
    }).then(res => {
      console.log(res.result)
      that.setData({
        list:res.result
      })
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