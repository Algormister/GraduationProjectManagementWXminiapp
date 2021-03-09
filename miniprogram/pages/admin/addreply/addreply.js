// miniprogram/pages/admin/infochange/addsinfo/addsinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:"",
    name:"",
    listsno: [""],
    listdate:[""],
    listspace:[""],
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
    this.data.listsno.push("")
    this.data.listspace.push("")
    this.data.listdate.push("")
    this.setData({
      listsno: this.data.listsno,
      listspace: this.data.listspace,
      listdate: this.data.listdate
    })
    // console.log(this.data.listsname);
     console.log(this.data.listsno);
  },
  bindsno: function(e){
    let index = e.currentTarget.dataset.i
    let tempsno = this.data.listsno
    tempsno[index] = e.detail.value
    this.setData({
      listsno: tempsno
    })
  },
  binddate: function(e){
    let index = e.currentTarget.dataset.i
    let tempdate = this.data.listdate
    tempdate[index] = e.detail.value
    this.setData({
      listdate: tempdate
    })
  },
  bindspace: function(e){
    let index = e.currentTarget.dataset.i
    let tempspace = this.data.listspace
    tempspace[index] = e.detail.value
    this.setData({
      listspace: tempspace
    })
  },
  submit: function(){
    let that = this
    let flag = true
    console.log(that.data.listsname);
    this.setData({
      showLoading: true
    })
    for (let i = 0; i < that.data.listsno.length; i++)
    {
      if (that.data.listsno[i].length != 8)
      {
        flag = false
      }
    }
    if (!flag){
      this.setData({
        showLoading: false
      })
      wx.showToast({
        title: '填写有误(学号为8位)',
        icon: 'none',
        duration: 2000,
        mask:true
      })
    }
    else{
      wx.cloud.callFunction({ 
      name: 'mysql',
      data: {
        e: 'reply',
        listsno: that.data.listsno,
        listdate: that.data.listdate,
        listspace:that.data.listspace
      }
      }).then(res => {
      console.log(res);
      that.setData({
        showLoading: false
      })
      if (res.result != 1)
      {
        wx.showToast({
          title: '提交失败(学号已存在)',
          icon: 'none',
          duration: 2000,
          mask:true
        })
      }
      else{
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
      }
      }).catch(err => {
      console.log(err)
      })
    }
  }
})