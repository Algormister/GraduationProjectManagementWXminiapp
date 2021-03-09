//app.js
App({
  globalData:{
    datestart:'',
    dateend: '',
    timestart: '00:00',
    timeend: '00:00',
    currentdate: '',
    currenttime: '00:00'
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'test-3gstj04bdab809db',
        traceUser: true,
      })
    }
    // this.getdata().then(res => {
    //   let date = new Date()
    //   let datestr = date.getFullYear() + '-' + this.getmonth(date) + '-' + this.getdate(date)
    //   this.globalData.currentdate = datestr
    //   // console.log(res);
    //   this.globalData.datestart = res.result[0].datestart
    //   this.globalData.dateend = res.result[0].dateend
    //   this.globalData.timestart = res.result[0].timestart
    //   this.globalData.timeend = res.result[0].timeend
    //   console.log(this.globalData.datestart);
    // }).catch(err => {
    //   console.log(err);
    // })
  },
  getmonth(date){
    let month = date.getMonth() + 1
    let monthstr = ''
    if (month < 10){
      monthstr = '0' + month.toString()
    }
    else{
      monthstr = month.toString()
    }
    return monthstr
  },
  getdate(date){
    let datestr = ''
    if (date.getDate() < 10){
      datestr = '0' + date.getDate()
    }
    else{
      datestr = date.getDate()
    }
    return datestr
  },
  getdata(){  
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({   //给云函数
        name: 'mysql', //调用的云函数
        data: {
          e: 'gettime',  //数据
        }
      }).then(res => {  //event console.log(res)
        resolve(res)
      }).catch(err =>{ 
        reject(err)
      })
    })
  }
})
