// pages/atopic/atopic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:"",
    name:""
  },
  test:function(){
  //  wx.cloud.downloadFile({fileID: 'cloud://test-3gstj04bdab809db.7465-test-3gstj04bdab809db-1304701408/161272180057300000001README.md',
  //  success: res => {
  //    console.log(res)
  //        wx.getFileSystemManager().saveFile({
  //       tempFilePath: res.tempFilePath, // 传入一个本地临时文件路径, http://tmp/开头的
  //       filePath: wx.env.USER_DATA_PATH + '/abc',
  //       //wx.env.USER_DATA_PATH + '/abc', //保存到用户目录/abc文件中，此处文件名自定义，因为tempFilePath对应的是一大长串字符
  //       success(res) {
  //         console.log('save ->', res) // res.savedFilePath 为一个本地缓存文件路径
  //         wx.showToast({
  //           title: '文件已保存至：' + res.savedFilePath,
  //           icon: 'none',
  //           duration: 1500
  //         })
  //       }
  //     })
  //  }
  // })
    
// if (result.statusCode == 200) {
//     wx.getFileSystemManager().saveFile({
//         tempFilePath: result.tempFilePath, // 传入一个本地临时文件路径, http://tmp/开头的
//         filePath: wx.env.USER_DATA_PATH + '/abc', //保存到用户目录/abc文件中，此处文件名自定义，因为tempFilePath对应的是一大长串字符
//         success(res) {
//           console.log('save ->', res) // res.savedFilePath 为一个本地缓存文件路径
//           wx.showToast({
//             title: '文件已保存至：' + res.savedFilePath,
//             icon: 'none',
//             duration: 1500
//           })
//         }
//       })
// }
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

  }
})