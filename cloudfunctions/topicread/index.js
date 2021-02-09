// // 云函数入口文件
// const cloud = require('wx-server-sdk')
// //引入mysql操作模块
// const mysql = require('mysql2/promise')
// cloud.init()
// // 云函数入口函数
// exports.main = async(event, context) => {
//   //链接mysql数据库的test库，这里你可以链接你mysql中的任意库
//   try {
//     const connection = await mysql.createConnection({
//       host: "rm-uf6pwqdk6w416nt1buo.mysql.rds.aliyuncs.com",
//       database: "graduation project management",
//       user: "lyx",
//       password: "Lyx123456"
//     })
//     if (event.status == "teacher"){              
//       sql = "SELECT * from topic where tno = '00000001'"
//       // sql = "INSERT INTO topic(tno,paper,intro,zt) VALUES('"+event.tno+"','"+event.paper+"','"+event.intro+"','0')"
//       const [rows, fields] = await connection.execute(sql)
//       return rows;
//     }
//     else if(event.status == "admin"){
//       const [rows, fields] = await connection.execute('SELECT * from topic')
//       return rows;
//     }
//     // const [rows, fields] = await connection.execute('SELECT * from admin')
//     // return rows;
//   } catch (err) {
//     console.log("链接错误", err)
//     return err
//   }
// }

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
      user: "lt",
      password: "Lengtian123"
    })
    if (event.e = "getpassword"){               //for login
      // console.log(event.userid);
      sql = "SELECT * from topic where tno = '" + event.userid + "'"
      const [rows, fields] = await connection.execute(sql)
      return rows;
    }
    // const [rows, fields] = await connection.execute('SELECT * from admin')
    // return rows;
  } catch (err) {
    console.log("链接错误", err)
    return err
  }
}
