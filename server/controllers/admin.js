// 逻辑层
const userInfoService = require('../services/admin-info')
// 代号
// const userCode = require('./../codes/user')

module.exports = {
  // /**
  //  * 获取菜单 忽略
  //  */
  // async getMenu ( ctx ) {
  //   // let formData = ctx.request.body
  //   let result = {
  //     success: false,
  //     message: 'pls login',
  //     data: [
  //       {
  //         name: '个人设置'
  //       },
  //       {
  //         name: '简历设置'
  //       },
  //       {
  //         name: '项目列表'
  //       }
  //     ],
  //     code: ''
  //   }
  //   ctx.body = result
  // },

  // /**
  //  * 个人设置
  //  * find
  //  */
  // async getPersonConfig (ctx) {
  //   let formData = ctx.request.body
  //   let result = {
  //     success: false,
  //     message: 'pls login',
  //     code: '',
  //     data: null
  //   }

  //   let userResult = await userInfoService.getExistOne(formData)
  //   console.log(userResult)
  //   // if (userResult) {
  //   //   result.data = userResult
  //   //   result.success = true
  //   //   result.code = 200
  //   // }
  //   // ctx.body = result
  // },

  /**
   * 获取简历设置
   * find
   * 20180208 done
   */
  async getResume (ctx) {
    let formData = ctx.request.query
    let result = {
      success: false,
      message: 'pls login',
      code: '',
      data: null
    }

    let userResult = await userInfoService.getResume(formData)
    if (userResult) {
      result.data = userResult
      result.msg = 'success'
      result.success = true
      result.code = 200
    }
    ctx.body = result
  },

  /**
   * 保存简历设置
   * 先查一下当前简历id是否存在，存在则更新，不存在则创建
   */
  async saveResume (ctx) {
    let formData = ctx.request.body
    let result = {
      success: false,
      message: 'pls login',
      code: '',
      data: null
    }

    // 不存在则插入新数据，存在则更新旧数据 => 这个逻辑交给服务层去做，控制层只做结构
    let userResult = await userInfoService.saveResume(formData)
    // console.log(userResult)
    // ctx.body = result
  },

  /**
   * 获取项目列表
   * find + id
   */
  async getProject (ctx) {
    let result = {
      success: false,
      message: 'pls login',
      code: '',
      data: null
    }

    let userResult = await userInfoService.getProject(formData)
    console.log(userResult)
    // if (userResult) {
    //   result.data = userResult
    //   result.success = true
    //   result.code = 200
    // }
    // ctx.body = result
  },

  /**
   * 保存项目列表
   * 先查一下当前项目id是否存在，存在则更新，不存在则创建
   */
  async saveProject (ctx) {
    let result = {
      success: false,
      message: 'pls login',
      code: '',
      data: null
    }

    let userResult = await userInfoService.saveProject(formData)
    console.log(userResult)
    // if (userResult) {
    //   result.data = userResult
    //   result.success = true
    //   result.code = 200
    // }
    // ctx.body = result
  }
}