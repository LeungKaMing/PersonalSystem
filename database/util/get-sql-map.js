const fs = require('fs')
const walkFile = require('./walk-files')

/**
 * 获取sql目录下的文件目录数据
 * @return {object} 
 */
function getSqlMap () {
  let basePath = __dirname
  console.log(basePath, '当前目录路径')
  basePath = basePath.replace(/\\/g, '\/')

  let pathArr = basePath.split('\/')
  pathArr = pathArr.splice( 0, pathArr.length - 1 )
  console.log(pathArr, '上一级目录路径')

  basePath = pathArr.join('/') + '/sql/'
  console.log(basePath, '拼接出sql脚本所存放的目录路径')

  let fileList = walkFile( basePath, 'sql' )
  console.log(fileList, '遍历出该目录下所有带.sql后缀的文件')

  return fileList
}

module.exports = getSqlMap