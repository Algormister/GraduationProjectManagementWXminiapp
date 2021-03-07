// pages/ttopic/ttopic.js
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
    fileID:""
  },
  // test:function(){
  //   wx.cloud.callFunction({
  //     name: 'topicwri',
  //     data: {
  //       tno: that.data.userid,
  //       paper:'test'
  //     }
  //   }).then(res =>{
  //     console.log("2")
  //     console.log(res.result)
  //   })
  // },
  up:function(){
    let that = this
    wx.chooseMessageFile({
      count: 1,  //能选择文件的数量
      type: 'file', //能选择文件的类型,我这里只允许上传文件.还有视频,图片,或者都可以
      success(res) { 
  
        //console.log(res)
      var filename = res.tempFiles[0].name;
      var newfilename = filename + ""; 
      
     
       that.setData({
       path: res.tempFiles[0].path, //将文件的路径保存在页面的变量上,方便 wx.uploadFile调用
       filename: filename    //渲染到wxml方便用户知道自己选择了什么文件
       })
       //console.log(that.data)
      }
    })
  },
  formSubmit:function(e){
     this.setData({
      title:e.detail.value.title
    })
    var that = this
    let err = false
    if (this.data.title == "" || this.data.path == ""){
      wx.showToast({
        title: '请把表单填写完整',
        icon: 'none',
        duration: 2000,
        mask:true
      })
    }
   else{
    wx.showLoading({
      title: '提交中...',
      mask:true
    })
    wx.cloud.uploadFile({
      cloudPath:Date.now()+that.data.userid+that.data.filename,
      filePath:that.data.path,
      success: res =>{
        //console.log(res.fileID)
        that.setData({
          fileID:res.fileID
        })
        wx.cloud.callFunction({
      name: 'topicwri',
      data: {
        tno: that.data.userid,
        paper:that.data.title,
        intro:that.data.fileID
      }
    }).then(res =>{
      console.log(res)
      console.log(res.result.errno)
      wx.hideLoading()
      if(res.result.errno != undefined){
        console.log("1")
        wx.showToast({
          title: '提交失败',
          icon: 'none',
          duration: 2000,
          mask:true
        })
        wx.cloud.deleteFile({
          fileList: [that.data.fileID]
        })
      }
      else{
        console.log("2")
        wx.showToast({
          title: '提交成功',
          icon: 'none',
          duration: 2000,
          mask:true
        })
      }
      that.setData({
        title:"",
        path:"",
        filename:"",
        fileID:"",
      })
    })
      }
    })
    
    
   }
    //console.log(this.data.title)

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

  }
})