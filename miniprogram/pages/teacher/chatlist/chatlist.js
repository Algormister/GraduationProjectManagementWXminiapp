// miniprogram/pages/teacher/chatlist/chatlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: '',
    name: '',
    list:[],
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
        wx.cloud.callFunction({
          name: 'mysql',
          data: {
            e: 'getS',
            tno: that.data.userid
          }
        }).then(res =>{
          that.setData({
            list: res.result
          })
          for (let i = 0; i < res.result.length; i++)
          {
            wx.cloud.callFunction({
              name: 'mysql',
              data: {
                e: 'getsname',
                sno: res.result[i].sno
              }
            }).then(ans => {
              let temp = 'list[' + i + '].sname'
              // that.data.list[i]['sname'] = ans.result[0].sname
              that.setData({
                [temp]: ans.result[0].sname
              })
            })
          }
          that.setData({
            showLoading: false
          })
        }).catch(err => {
          console.log(err)
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
    // console.log(e);
    let that = this
    let sno = e.currentTarget.dataset.sno
    wx.navigateTo({
       url: '../../im/room/room?id=' + that.data.userid + sno
    })
  }
})