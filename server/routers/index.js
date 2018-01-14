// 汇总
const router = require('koa-router')()

const home = require('./home')  // 首页 api
const api = require('./api')  // restful api
const admin = require('./admin')  // 管理页 api
const work = require('./work')  // 工作页 api
// const error = require('./error')  // 错误页 api

// allowedMethods()意为允许所有方法
router.use('/', home.routes(), home.allowedMethods())
router.use('/api', api.routes(), api.allowedMethods())  //举例: /api/user/getUserInfo.json
router.use('/admin', admin.routes(), admin.allowedMethods())
router.use('/work', work.routes(), work.allowedMethods())
// router.use('/error', error.routes(), error.allowedMethods())

module.exports = router