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
   //event.zt更新值 1通过 2未通过,(event.tno,event.paper)主键
      sql = "UPDATE st SET zt='" + event.zt + "' WHERE sno='" + event.sno
      const [rows, fields] = await connection.execute(sql)
      console.log(rows)
      return rows;
      
 
    //}
    // const [rows, fields] = await connection.execute('SELECT * from admin')
    // return rows;
  } catch (err) {
    console.log("链接错误", err)
    return err
  }
}