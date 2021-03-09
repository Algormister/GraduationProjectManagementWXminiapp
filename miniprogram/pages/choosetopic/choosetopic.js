// pages/atopicalready/atopicneedalready.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:"",
    name:"",
    showLoading: true,
    ischosen: false,
    tname: '',
    project: ''
  },

  setzt:function(e){
    // 选择（更新）
    console.log(e)
    let that = this
    wx.showModal({
      title: '提示',
      content: '是否确认要选择该课题，注意：选择后不可更改',
      success (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中...',
            mask:true
          })
          that.setData({
            project: e.currentTarget.dataset.paper
          })   
          console.log('用户点击确定') 
          wx.cloud.callFunction({
            name: 'mysql',
            data: {
              e: 'getTname',
              tno: e.currentTarget.dataset.tno
            }
          }).then(res => {
            wx.hideLoading()
            console.log(res);
            that.setData({
              tname: res.result[0].tname
            })
          })
           wx.cloud.callFunction({
           name: 'chooset',
           data: {
            sno: that.data.userid,
            zt: '已选择',//1为通过
            tno: e.currentTarget.dataset.tno,
            paper:e.currentTarget.dataset.paper
          }
          }).then(res => {
            that.setData({
              ischosen: true
            })
          //更新后刷新页面
            wx.cloud.callFunction({
              name: 'areadtopic',
            }).then(res => {
              console.log(res.result)
              that.setData({
                list:res.result
              })
          })

        })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let that = this
    await this.getuserinfoasync().then(() => {
      console.log(123);
    })
    wx.cloud.callFunction({
      name: 'mysql',
      data:{
        e: 'ischosen',
        sno: that.data.userid
      }
    }).then(res => {
      console.log(res);
      if (res.result.length == 1){
        wx.showLoading({
          title: '加载中...',
          mask:true
        })
        that.setData({
          ischosen: true,
          project: res.result[0].title
        })
        wx.cloud.callFunction({
          name: 'mysql',
          data: {
            e: 'getTname',
            tno: res.result[0].tno
          }
        }).then(ans =>{
          wx.hideLoading()
          console.log(ans);
          that.setData({
            tname: ans.result[0].tname
          })
        })
      }
    }).catch(err =>{
      console.log(err);
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
    console.log(this.data.ischosen);
    let that = this
    wx.cloud.callFunction({
      name: 'areadtopic',
    }).then(res => {
      console.log(res.result)
      that.setData({
        showLoading: false,
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

  },
  getuserinfoasync(){
    let that = this
    return new Promise((resolve) =>{
      wx.getStorage({
        key: 'userinfo',
        success:function(res){
          // console.log(res);
          that.setData({
            userid:res.data.userid,
            name:res.data.name
          })
          resolve()
        }
      })
    })
  }
})