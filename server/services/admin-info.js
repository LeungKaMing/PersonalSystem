/**
 * 用户业务操作
 * 逻辑层主要对从控制层传入的类似FormData的大型数据进行筛选，把精简后的数据传去模型层做处理。
 */
// 模型层
// const userModel = require('./../models/user-info')  //MySQL
const userModel = require('./../models/mongodb-user-info')  //MongoDB
// 代号
// const userCode = require('./../codes/user')

const admin = {
  /**
   * 查找用户姓名查找对应个人简历
   */
  async getResume (formData) {
    // 对表单数据的用户名 和 邮箱字段在数据库中进行查找
    let resultData = await userModel.getExistOne({
      'userName': formData.userName
    }, 'resume')
    return resultData
  },

  /**
   * 创建/保存用户简历
   * @param  {object} user 用户信息
   * @param  {object} schema 数据库结构
   * @return {object}      创建结果
   */
  async saveResume ( formData ) {
    let result
    let check = await admin.getResume(formData)
    // formData = {userName: formData.userName, resume: JSON.stringify(formData)}
    if (!check) {
      result = await userModel.create(formData, 'resume')
    } else {
      check[0].resume = JSON.parse(check[0].resume)
      formData.resume = JSON.parse(formData.resume)
      result = await userModel.update(check[0].resume, formData.resume, 'resume')
    }
    // return result
  },

  // /**
  //  * 更新用户简历
  //  * @param  {object} user 用户信息
  //  * @param  {object} schema 数据库结构
  //  * @return {object}      创建结果
  //  */
  // async updateResume ( oldCondition, newCondition ) {
  //   oldCondition = {userName: oldCondition.userName, resume: oldCondition.resume}
  //   newCondition = {userName: newCondition.userName, resume: JSON.stringify(newCondition)}
  //   let result = await userModel.updateResume(oldCondition, newCondition, 'resume')
  //   return result
  // },

  /**
   * 查找用户姓名查找对应个人简历
   */
  async getProject (formData) {
    // 对表单数据的用户名 和 邮箱字段在数据库中进行查找
    let resultData = await userModel.getExistOne({
      'userName': formData.userName
    }, 'resume')
    return resultData
  },

  /**
   * 创建/保存用户简历
   * @param  {object} user 用户信息
   * @param  {object} schema 数据库结构
   * @return {object}      创建结果
   */
  async saveProject ( formData ) {
    let result
    let check = await userModel.getExistOne(formData, 'resume')
    formData = {userName: formData.userName, resume: JSON.stringify(formData)}
    if (!check) {
      result = await userModel.create(formData, 'resume')
    } else {
      console.log(check, '已存在条件')
      console.log(formData, '已存在条件')
      // result = await userModel.update(check, formData, 'resume')
    }
    return result
  }

  // /**
  //  * 更新用户简历
  //  * @param  {object} user 用户信息
  //  * @param  {object} schema 数据库结构
  //  * @return {object}      创建结果
  //  */
  // async updateProject ( oldCondition, newCondition ) {
  //   oldCondition = {userName: oldCondition.userName, resume: oldCondition.resume}
  //   newCondition = {userName: newCondition.userName, resume: JSON.stringify(newCondition)}
  //   let result = await userModel.updateResume(oldCondition, newCondition, 'resume')
  //   return result
  // }
}

module.exports = admin