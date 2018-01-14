/**
 * 管理员用户子路由
 */

const router = require('koa-router')()
const admin = require('./../controllers/admin')

const routers = router.get('/getMenu', admin.getMenu)
                    .get('/getResume', admin.getResume)
                    .post('/saveResume', admin.saveResume)

module.exports = routers