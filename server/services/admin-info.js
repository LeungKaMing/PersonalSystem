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
      'userId': formData.userId
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
    if (!check.length) {
      result = await userModel.create(formData, 'resume')
    } else {
      // model.update() 第一个选项为查询条件，第二个选项为更新查询出来数据的某个字段
      result = await userModel.update({'userId': formData.userId}, {$set: {'resume': formData.resume}}, 'resume')
    }
    return result
  },

  /**
   * 查找用户姓名查找对应个人简历
   */
  async getProject (formData) {
    // 对表单数据的用户名 和 邮箱字段在数据库中进行查找
    let resultData = await userModel.getExistOne({
      'projectId': formData.projectId
    }, 'project')
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
    let check = await admin.getProject(formData)
    if (!check.length) {
      result = await userModel.create(formData, 'project')
    } else {
      // model.update() 第一个选项为查询条件，第二个选项为更新查询出来数据的某个字段
      result = await userModel.update({'projectId': formData.projectId}, {$set: {'projectUrl': formData.projectUrl}}, 'project')
    }
    return result
  }
}

module.exports = admin