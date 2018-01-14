const fs = require('fs')
const getSqlMap = require('./get-sql-map')

let sqlContentMap = {}

/**
 * 读取sql文件内容
 * @param  {string} fileName 文件名称
 * @param  {string} path     文件所在的路径
 * @return {string}          脚本文件内容
 */
function getSqlContent( fileName,  path ) {
  let content = fs.readFileSync( path, 'binary' )
  console.log(content, '满足条件的内容')
  sqlContentMap[ fileName ] = content
}

/**
 * 封装所有sql文件脚本内容
 * @return {object} 
 */
function getSqlContentMap () {
  let sqlMap = getSqlMap()
  for( let key in sqlMap ) {
    // key为文件名，value为绝对路径
    getSqlContent( key, sqlMap[key] )
  }
  console.log(sqlContentMap, '得出键名为文件名，值为内容的对象')
  return sqlContentMap
}

module.exports = getSqlContentMap