// miniprogram/pages/admin/infochange/deltinfo/deltinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:"",
    name:"",
    showLoading: false,
    listtno: [""]
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
  addinput: function(){
    this.data.listtno.push("")
    this.setData({
      listtno: this.data.listtno,
    })
    console.log(this.data.listtno);
  },
  bindtno: function(e){
    let index = e.currentTarget.dataset.i
    this.data.listtno[index] = e.detail.value
    this.setData({
      listtno: this.data.listtno
    })
  },
  submit: function(){
    let that = this
    let flag = true
    console.log(that.data.listtno);
    this.setData({
      showLoading: true
    })
    for (let i = 0; i < that.data.listtno.length; i++)
    {
      if (that.data.listtno[i].length != 8)
      {
        flag = false
      }
    }
    if (!flag){
      this.setData({
        showLoading: false
      })
      wx.showToast({
        title: '填写有误(工号为8位)',
        icon: 'none',
        duration: 2000,
        mask:true
      })
    }
    else{
      wx.cloud.callFunction({ 
      name: 'mysql',
      data: {
        e: 'delT',
        listtno: that.data.listtno,
      }
      }).then(res => {
      console.log(res);
      that.setData({
        showLoading: false
      })
      wx.showModal({
        title: '提交成功',
        content: '',
        showCancel: false,//是否显示取消按钮
        confirmText:"返回",//默认是“确定”
        confirmColor: 'skyblue',//确定文字的颜色
        success: function (res) {
          wx.navigateTo({
            url: '../infochange',
          })
        },
      })
      }).catch(err => {
      console.log(err)
      })
    }
  }
})