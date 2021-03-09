// pages/atopicneed/atopicneed.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:"",
    name:"",
    showLoading: true
  },
  down:function(e){
    console.log(e.currentTarget.dataset.fileid);
    let str = e.currentTarget.dataset.fileid;
    let index = str.lastIndexOf("/");
    str =str.substring(index,str.length);
    console.log(str);
    wx.showModal({
      title: '提示',
      content: '是否确认要下载此课题材料',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')  
          wx.showLoading({
            title: '下载中...',
            mask:true
          })
        wx.cloud.downloadFile({
        fileID: e.currentTarget.dataset.fileid,
         success: res => {
         console.log(res)
         wx.getFileSystemManager().saveFile({
        tempFilePath: res.tempFilePath, // 传入一个本地临时文件路径, http://tmp/开头的
        filePath: wx.env.USER_DATA_PATH + str,
        //wx.env.USER_DATA_PATH + '/abc', //保存到用户目录/abc文件中，此处文件名自定义，因为tempFilePath对应的是一大长串字符
        success(res) {
          wx.hideLoading()
          console.log('save ->', res) // res.savedFilePath 为一个本地缓存文件路径
          wx.showToast({
            title: '文件已保存至：' + res.savedFilePath,
            icon: 'none',
            duration: 1500
          })
        }
      })
   }
  })
        } 
        else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
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

  }
})