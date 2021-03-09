// 云函数入口文件
const cloud = require('wx-server-sdk')
//引入mysql操作模块
const mysql = require('mysql2/promise')
cloud.init()
// 云函数入口函数
exports.main = async(event, context) => {
  //链接mysql数据库的test库，这里你可以链接你mysql中的任意库
  try {
      const connection = await mysql.createConnection({
      host: "rm-uf6pwqdk6w416nt1buo.mysql.rds.aliyuncs.com",
      database: "graduation project management",
      user: "lyx",
      password: "Lyx123456"
    })
    //event指的是触发云函数的事件，当小程序端调用云函数时，event 就是小程序端调用云函数时传入的参数，
    //外加后端自动注入的小程序用户的 openid 和小程序的 appid
    let sql="UPDATE st SET zt='" + event.zt + "',tno='" + event.tno + "',title='" + event.paper + "' WHERE sno='" + event.sno +"' "
    const [rows, fields] = await connection.execute(sql)
    return rows;

  } catch (err) {
    console.log("链接错误", err)
    return err
  }
}
