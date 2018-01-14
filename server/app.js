const Koa = require('koa')
const app = new Koa()

// modules
const path = require('path')
const convert = require('koa-convert')  // koa1插件通过它来转换
const static = require('koa-static')  // 管理静态资源中间件
const views = require('koa-views')  // 管理模板引擎中间件
const bodyParser = require('koa-bodyparser')  // 处理post请求参数的中间件
const logger = require('koa-logger')  // 日志中间件
// const session = require('koa-session-minimal')  // 会话中间件
// const mysqlStore = require('koa-mysql-session') // 与mysql通讯所用中间件【只需要知道session中间件包含这个中间件】

// database
const config = require('../config') // 数据库配置

// routes
const routers = require('./routers/index')  // 路由配置

// // MySQL存储session相关配置
// const sessionMysqlConfig = {
//   user: config.database.USERNAME,
//   password: config.database.PASSWORD,
//   database: config.database.DATABASE,
//   host: config.database.HOST
// }

// // 配置session中间件
// app.use(session({
//   key: 'USER_SID',
//   store: new mysqlStore(sessionMysqlConfig)
// }))

// 配置log中间件
app.use(convert(logger()))

// 配置获取Post Data的中间件
app.use(bodyParser())

// 配置静态资源 
app.use(convert(static(
  path.join(__dirname, '../static')
)))

// 配置服务端渲染引擎所使用的模板信息
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))

// 配置路由的中间件
app.use(routers.routes()).use(routers.allowedMethods())

app.listen(config.port, () => {
  console.log(`Listening to ${config.port}`)
})
