// miniprogram/pages/admin/infochange/addsinfo/addsinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:"",
    name:"",
    listsname:[""],
    listsno: [""],
    listsphone:[""]
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
    this.data.listsname.push("")
    this.data.listsno.push("")
    this.data.listsphone.push("")
    this.setData({
      listsname: this.data.listsname,
      listsno: this.data.listsno,
      listsphone: this.data.listsphone
    })
    console.log(this.data.listsname);
  },
  bindsname: function(e){
    let index = e.currentTarget.dataset.i
    let tempsname = this.data.listsname
    tempsname[index] = e.detail.value
    // console.log(tempsname);
    
    this.setData({
      listsname: tempsname
    })
  }
})