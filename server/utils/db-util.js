const allConfig = require("./../../config")
const config = allConfig.database
const mysql = require("mysql")

const pool = mysql.createPool({
  host     :  config.HOST,
  user     : config.USERNAME,
  password : config.PASSWORD,
  database : config.DATABASE
})

// 查找数据
let query = function( sql, values ) {

  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        resolve( err )
      } else {
        // 下面涉及到??的符号，都表示将第二个数组参数依次插入的位置；单个?符号，查看api文档
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })

}

// 创表
let createTable = function( sql ) {
  return query( sql, [] )
}

// 通过id查找数据
let findDataById = function( table,  id ) {
  let  _sql =  "SELECT * FROM ?? WHERE id = ? "
  return query( _sql, [ table, id, start, end ] )
}

// 通过page查找数据
let findDataByPage = function( table, keys, start, end ) {
  let  _sql =  "SELECT ?? FROM ??  LIMIT ? , ?"
  return query( _sql, [keys,  table,  start, end ] )
}

// 插入数据
// values是对象
let insertData = function( table, values ) {
  let _sql = "INSERT INTO ?? SET ?"
  return query( _sql, [ table, values ] )
}

// 更改数据
let updateData = function( table, values, id ) {
  let _sql = "UPDATE ?? SET ? WHERE id = ?"
  return query( _sql, [ table, values, id ] )
}

// 通过id删除数据
let deleteDataById = function( table, id ) {
  let _sql = "DELETE FROM ?? WHERE id = ?"
  return query( _sql, [ table, id ] )
}

// 查找数据
let select = function( table, keys ) {
  let  _sql =  "SELECT ?? FROM ?? "
  return query( _sql, [ keys, table ] )
}

// 查找列
let count = function( table ) {
  let  _sql =  "SELECT COUNT(*) AS total_count FROM ?? "
  return query( _sql, [ table ] )
}

module.exports = {
  query,
  createTable,
  findDataById,
  findDataByPage,
  deleteDataById,
  insertData,
  updateData,
  select,
  count,
}
