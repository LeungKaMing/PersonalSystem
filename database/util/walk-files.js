const fs = require('fs')

/**
 * 遍历目录下的文件目录
 * @param  {string} pathResolve  需进行遍历的目录路径
 * @param  {string} mime         遍历文件的后缀名
 * @return {object}              返回遍历后的目录结果
 */
const walkFile = function(  pathResolve , mime ){

  let files = fs.readdirSync( pathResolve )
  console.log(files, '读取某个目录下的所有文件')

  let fileList = {}

  for( let [ i, item] of files.entries() ) {
    // 把每个文件名用.分隔开
    let itemArr = item.split('\.')
    // 如果分隔后的数组长度大于1，证明该文件不是类似.babelrc这类型，满足需求
    let itemMime = ( itemArr.length > 1 ) ? itemArr[ itemArr.length - 1 ] : 'undefined'
    
    let keyName = item + ''
    console.log(keyName, '文件名')

    // 判断传入的媒体类型 跟 当前项的媒体类型是否相等，相等则记录下来
    if( mime === itemMime ) {
      // 以文件名为键名，传入目录拼接文件名得出的绝对路径为键值
      fileList[ item ] =  pathResolve + item
    }
  }
  console.log(fileList, '满足条件的文件')
  return fileList
}

module.exports = walkFile