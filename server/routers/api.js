// restful api子路由 => 所谓的restful意为不同方法对应不同操作，所以用 router.get/post/put 此类方法表达
const router = require('koa-router')()
const userInfoController = require('./../controllers/user-info')

// 所谓的控制层就是当服务端接收用户请求时所要响应的操作 => 路由层始终是找控制层
// 链式写法
const routers = router.get('/user/getUserInfo.json', userInfoController.getLoginUserInfo)
                      .post('/user/signIn.json', userInfoController.signIn)
                      .post('/user/signUp.json', userInfoController.signUp)

module.exports = routers