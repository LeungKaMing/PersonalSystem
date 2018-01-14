// 逻辑层
const userInfoService = require('../services/user-info')
// 代号
const userCode = require('./../codes/user')

module.exports = {
  /**
   * 获取菜单
   */
  async getMenu ( ctx ) {
    // let formData = ctx.request.body
    let result = {
      success: false,
      message: 'pls login',
      data: [
        {
          name: '个人设置'
        },
        {
          name: '简历设置'
        },
        {
          name: '项目列表'
        }
      ],
      code: ''
    }
    ctx.body = result
  },

  /**
   * 个人设置
   */
  async getPersonConfig (ctx) {
    let formData = ctx.request.body
    let result = {
      success: false,
      message: 'pls login',
      code: '',
      data: null
    }

    let userResult = await userInfoService.getExistOne(formData)
    console.log(userResult)
    // if (userResult) {
    //   result.data = userResult
    //   result.success = true
    //   result.code = 200
    // }
    // ctx.body = result
  },

  /**
   * 获取简历设置
   */
  async getResume (ctx) {
    let result = {
      success: false,
      message: 'pls login',
      code: '',
      data: null
    }

    // let userResult = await userInfoService.getUserInfoByUserName
    // if (userResult) {
    //   result.data = userResult
    //   result.success = true
    //   result.code = 200
    // }
    ctx.body = result
  },

  /**
   * 保存简历设置
   */
  async saveResume (ctx) {
    let formData = ctx.request.body
    let result = {
      success: false,
      message: 'pls login',
      code: '',
      data: null
    }

    // 不存在则插入新数据，存在则更新旧数据
    let oldCondition = await userInfoService.getResume(formData)
    if (!oldCondition) {
      oldCondition = await userInfoService.saveResume(formData)
      console.log(oldCondition, '我在控制层插入新数据')
      result.success = true
      result.code = 200
      result.msg = '插入新数据'
      result.data = null
    } else {
      console.log(oldCondition, '我在控制层查找到适合数据')
      oldCondition = await userInfoService.updateResume(oldCondition, formData)
      result.success = true
      result.code = 200
      result.msg = '更新数据成功'
      result.data = oldCondition
    }
    ctx.body = result
  },

  /**
   * 项目列表
   */
  async getProjects (ctx) {
    let result = {
      success: false,
      message: 'pls login',
      code: '',
      data: null
    }

    // let userResult = await userInfoService.getUserInfoByUserName
    // if (userResult) {
    //   result.data = userResult
    //   result.success = true
    //   result.code = 200
    // }
    ctx.body = result
  }
}