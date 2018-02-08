/**
 * 管理员用户子路由
 */

const router = require('koa-router')()
const admin = require('./../controllers/admin')

const routers = router.get('/getResume', admin.getResume)
                      .post('/saveResume', admin.saveResume)
                      .get('/getProject', admin.getProject)
                      .post('/saveProject', admin.saveProject)
module.exports = routers