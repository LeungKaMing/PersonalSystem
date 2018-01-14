/**
 * 用户业务操作
 * 逻辑层主要对从控制层传入的类似FormData的大型数据进行筛选，把精简后的数据传去模型层做处理。
 */
const validator = require('validator')
// 模型层
// const userModel = require('./../models/user-info')  //MySQL
const userModel = require('./../models/mongodb-user-info')  //MongoDB
// 代号
const userCode = require('./../codes/user')

const user = {
  /**
   * 创建用户
   * @param  {object} user 用户信息
   * @param  {object} schema 数据库结构
   * @return {object}      创建结果
   */
  async create( user ) {
    let result = await userModel.create(user, 'user')
    return result
  },
  
  /**
   * 创建用户简历
   * @param  {object} user 用户信息
   * @param  {object} schema 数据库结构
   * @return {object}      创建结果
   */
  async saveResume ( formData ) {
    formData = {userName: formData.userName, resume: JSON.stringify(formData)}
    let result = await userModel.create(formData, 'resume')
    return result
  },

  /**
   * 更新用户简历
   * @param  {object} user 用户信息
   * @param  {object} schema 数据库结构
   * @return {object}      创建结果
   */
  async updateResume ( oldCondition, newCondition ) {
    oldCondition = {userName: oldCondition.userName, resume: oldCondition.resume}
    newCondition = {userName: newCondition.userName, resume: JSON.stringify(newCondition)}
    let result = await userModel.updateResume(oldCondition, newCondition, 'resume')
    return result
  },

  /**
   * 查找存在用户信息
   * @param  {object} formData 查找的表单数据
   * @return {object|null}      查找结果
   */
  async getExistOne( formData ) {
    // 对表单数据的用户名 和 邮箱字段在数据库中进行查找
    let resultData = await userModel.getExistOne({
      'userName': formData.userName
    }, 'user')
    return resultData
  },

  /**
   * 登录业务操作
   * @param  {object} formData 登录表单信息
   * @return {object}          登录业务操作结果
   */
  async signIn( formData ) {
    // 对表单数据的用户名 和 邮箱字段在数据库中进行查找
    let resultData = await userModel.getOneByUserNameAndPassword({
      'password': formData.password,
      'userName': formData.userName})
    return resultData
  },

  /**
   * 根据用户名查找用户业务操作
   * @param  {string} userName 用户名
   * @return {object|null}     查找结果
   */
  async getUserInfoByUserName( userName ) {
    // 将传入的用户名放在数据库中进行查找
    let resultData = await userModel.getUserInfoByUserName( userName ) || {}
    let userInfo = {
      // id: resultData.id,
      email: resultData.email,
      userName: resultData.name,
      detailInfo: resultData.detail_info,
      createTime: resultData.create_time
    }
    return userInfo
  },

  /**
   * 检验用户注册数据
   * @param  {object} userInfo 用户注册数据
   * @return {object}          校验结果
   */
  validatorSignUp( userInfo ) {
    let result = {
      success: false,
      message: '',
    }
    // 各种校验规则，不需要跟数据库有交互
    if ( /[a-z0-9\_\-]{6,16}/.test(userInfo.userName) === false ) {
      result.message = userCode.ERROR_USER_NAME
      return result
    }
    if ( !/[\w+]{6,16}/.test( userInfo.password )  ) {
      result.message = userCode.ERROR_PASSWORD
      return result
    }
    result.success = true
    return result
  },

  /**
   * 查找用户姓名查找对应个人简历
   */
  async getResume (formData) {
    // 对表单数据的用户名 和 邮箱字段在数据库中进行查找
    let resultData = await userModel.getExistOne({
      'userName': formData.userName
    }, 'resume')
    return resultData
  }
}

module.exports = user