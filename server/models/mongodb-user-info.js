// 模型层需要处理跟数据库交互的SQL语句
// 所有sql语句都要封装起来
const dbUtils = require('../../database/mongodb/index.js')

const user = {
  /** 
   * 数据库创建用户
   * @param {object} model 用户数据模型
   * @return {object} mysql执行结果
   */
  async create (model, schema) {
    console.log(model)
    let result = await dbUtils.insertData(model, schema)
    return result
  },

  /**
   * 查找一个存在用户的数据
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  async getExistOne(options, schema) {
    // let _sql = `
    // SELECT * from user_info
    //   where email="${options.email}" or name="${options.name}"
    //   limit 1`
    // 根据名字去查找特定用户
    let result = await dbUtils.find(options, schema)
    return result
  },

  /**
   * 根据账户名和密码查找用户的数据
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  async getOneByUserNameAndPassword (options) {
    // let _sql = `
    // SELECT * from user_info
    //   where email="${options.email}" or name="${options.name}"
    //   limit 1`
    // 根据名字去查找特定用户
    console.log(options)
    let result = await dbUtils.find(options, 'user')
    // 数据库有多于1条以上的数据，默认取第一条
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },

  /**
   * 更新存在用户的数据
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  async update (oldCondition, newCondition, schema) {
    // let _sql = `
    // SELECT * from user_info
    //   where email="${options.email}" or name="${options.name}"
    //   limit 1`
    // 根据名字去查找特定用户
    let result = await dbUtils.findOneAndUpdate(oldCondition, newCondition, schema)
    // 数据库有多于1条以上的数据，默认取第一条
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result[0]
    } else {
      result = null
    }
    return result
  }
}

module.exports = user
