// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    path:"",
    filename:""
  },
up:function(){
  let that = this
  wx.chooseMessageFile({
    count: 1,  //能选择文件的数量
    type: 'file', //能选择文件的类型,我这里只允许上传文件.还有视频,图片,或者都可以
    success(res) { 

      console.log(res)
    var filename = res.tempFiles[0].name;
    var newfilename = filename + ""; 
    
   
     that.setData({
     path: res.tempFiles[0].path, //将文件的路径保存在页面的变量上,方便 wx.uploadFile调用
     filename: filename    //渲染到wxml方便用户知道自己选择了什么文件
     })
     console.log(that.data)
     wx.cloud.uploadFile({
    cloudPath:Date.now()+that.data.filename,
    filePath:that.data.path,
    success: res =>{
      console.log(res.fileID)
    }
  })
    }

   })
   
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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