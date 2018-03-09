// 逻辑层
const userInfoService = require('../services/user-info')
// 代号
const userCode = require('./../codes/user')

// 控制层永远都是做好结构result = {success: false, message: '', data: null, code: ''}
module.exports = {
  /**
   * 登录操作 ok
   * @param  {obejct} ctx 上下文对象
   * @desc 所有方法用到的session值是由这里进行设置的，例如getLoginUserInfo方法
   */
  async signIn( ctx ) {
    // 获取post请求主体
    let formData = ctx.request.body
    let result = {
      success: false,
      message: '',
      data: null,
      code: ''
    }
    console.log(formData, 'in controller')
    // 把请求主体带到数据库中查询，判断是否存在对应用户
    let userResult = await userInfoService.signIn( formData )
    // 存在，则进一步判断post请求主体的字段是否跟数据库返回的对应字段相等
    if ( userResult ) {
      if ( formData.userName === userResult.userName ) {
        result.success = true
      } else {
        // 传入的名字字段找不到，应提示账户或密码错误
        result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR
        result.code = 'FAIL_USER_NAME_OR_PASSWORD_ERROR'
      }
    } else {
      // 数据库中找不到数据，应提示该用户不存在
      result.code = 'FAIL_USER_NO_EXIST',
      result.message = userCode.FAIL_USER_NO_EXIST
    }
    // // 如果是由表单方式提交的，则记录到session => 所谓session就是只要在当前浏览器窗口就能任意调用
    // if ( formData.source === 'form' && result.success === true ) {
    //   // 给session设置值
    //   let session = ctx.session
    //   session.isLogin = true
    //   session.userName = userResult.userName
    //   session.userId = userResult.id
    //   // 登录成功后跳转至work
    //   ctx.redirect('/work')
    // } else {
    //   // 找到对应账户信息返回
    //   ctx.body = result
    // }
    ctx.body = result
  },

  /**
   * 注册操作
   * @param   {obejct} ctx 上下文对象
   * 去除无意义逻辑 20180309 done
   */
  async signUp( ctx ) {
    // 获取post请求主体
    let formData = ctx.request.body
    let userResult
    let result = {
      success: false,
      message: '',
      code: '',
      data: null
    }

    // 把请求主体带到数据库中查询，验证状态
    let validateResult = userInfoService.validatorSignUp( formData )  // 这个校验方法后面可以提取到后端公共方法
    if ( validateResult.success === false ) {
      result = validateResult
      ctx.body = result
      return
    }

    // 把请求主体带到数据库中查询，查找是否存在相应用户
    let existOne  = await userInfoService.getExistOne(formData)
    
    // 不存在则注册，存在则返回错误信息
    if ( !existOne.length  ) {
      // 不存在，则创建一个
      userResult = await userInfoService.create({
        // email: formData.email,
        password: formData.password,
        userName: formData.userName,
        create_time: new Date().getTime(),
        level: 1,
      })
    } else {
      result.code = 404
      result.message = userCode.FAIL_USER_NAME_IS_EXIST // 查到数据库有同名用户就告诉用户已经注册了
      ctx.body = result
      return false
    }

    if ( userResult) {
      result.success = true
      result.message = '注册成功'
    } else {
      result.message = userCode.ERROR_SYS
    }
    ctx.body = result
  },


  /**
   * 获取用户信息
   * @param    {obejct} ctx 上下文对象
   */
  async getLoginUserInfo( ctx ) {
    // 由于获取用户信息都是需要登录后才能获取的，上面登录接口已经设置了session，所以这个方法可以直接获取了
    let session = ctx.session
    let isLogin = session.isLogin
    let userName = session.userName

    console.log( 'session=', session )

    let result = {
      success: false,
      message: '',
      data: null,
    }
    
    // 登录状态 并且 存在用户名
    if ( isLogin === true && userName ) {
      // 把请求主体带到数据库中查询，通过用户名字查找用户信息
      let userInfo = await userInfoService.getUserInfoByUserName( userName )
      if ( userInfo ) {
        result.data = userInfo
        result.success = true
      } else {
        result.message = userCode.FAIL_USER_NO_LOGIN
      }
    } else {
      // TODO
      result.message = 'pls login.'
    }

    ctx.body = result
  },

  /**
   * 校验用户是否登录
   * @param  {obejct} ctx 上下文对象
   */
  validateLogin( ctx ) {
    let result = {
      success: false,
      message: userCode.FAIL_USER_NO_LOGIN,
      data: null,
      code: 'FAIL_USER_NO_LOGIN',
    } 
    let session = ctx.session
    // 检验session中isLogin字段是否为真
    if( session && session.isLogin === true  ) {
      result.success = true
      result.message = ''
      result.code = ''
    }
    return result
  }
}