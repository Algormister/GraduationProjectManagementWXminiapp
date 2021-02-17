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
    if (event.e == "getpassword"){               //for login
      // console.log(event.userid);
      sql = "SELECT * from user where userid = '" + event.userid + "'"
      const [rows, fields] = await connection.execute(sql)
      return rows;
    }
    if (event.e == "addS"){
      for (let i = 0; i < event.listsname.length; i++)
      {
        let sql = 'INSERT INTO `graduation project management`.`s` (`sname`,`sno`,`sphone`) VALUES ("' + event.listsname[i] + '","' + event.listsno[i] + '","' + event.listsphone[i] + '");'
        await connection.execute(sql)
        sql = 'INSERT INTO `graduation project management`.`user` (`userid`,`password`,`name`,`zw`) VALUES ("' + event.listsno[i] + '","123456","' + event.listsname[i] + '","student");'
        await connection.execute(sql)
      }
      return 1
    }
    if (event.e == "addT"){
      for (let i = 0; i < event.listtname.length; i++)
      {
        let sql = 'INSERT INTO `graduation project management`.`t` (`tname`,`tno`,`tphone`) VALUES ("' + event.listtname[i] + '","' + event.listtno[i] + '","' + event.listtphone[i] + '");'
        await connection.execute(sql)
        sql = 'INSERT INTO `graduation project management`.`user` (`userid`,`password`,`name`,`zw`) VALUES ("' + event.listtno[i] + '","123456","' + event.listtname[i] + '","teacher");'
        await connection.execute(sql)
      }
      return 1
    }
    if (event.e == "delS"){
      for (let i = 0; i < event.listsno.length; i++)
      {
        let sql = 'DELETE FROM `graduation project management`.`s` WHERE `sno`="' + event.listsno[i] + '";'
        await connection.execute(sql)
        sql = 'DELETE FROM `graduation project management`.`user` WHERE `userid`="' + event.listsno[i] + '";'
        await connection.execute(sql)
      }
      return 1
    }
    if (event.e == "delT"){
      for (let i = 0; i < event.listtno.length; i++)
      {
        let sql = 'DELETE FROM `graduation project management`.`t` WHERE `tno`="' + event.listtno[i] + '";'
        await connection.execute(sql)
        sql = 'DELETE FROM `graduation project management`.`user` WHERE `userid`="' + event.listtno[i] + '";'
        await connection.execute(sql)
      }
      return 1
    }
    // const [rows, fields] = await connection.execute('SELECT * from admin')
    // return rows;
  } catch (err) {
    console.log("链接错误", err)
    return err
  }
}