const dbUtils = require('../mongodb/index')
// 初始化添加一组数据
// dbUtils.insertData({
//     userName: 'ljm',   // 用户名
//     password: '19920926ljm',    // 用户密码
//     email: '510314588@qq.com',    // 用户密码
//     userAge: 25,    // 用户年龄
//     loginDate: new Date().getTime()
// })

// 支持初始化添加多组数据
dbUtils.insertData([{
    userName: 'ljm',   // 用户名
    password: '19920926ljm',    // 用户密码
    email: '510314588@qq.com',    // 用户密码
    userAge: 25,    // 用户年龄
    loginDate: new Date().getTime()
}, 
{
    userName: 'leung',   // 用户名
    password: 'leung123',    // 用户密码
    email: '510314588@qq.com',    // 用户密码
    userAge: 25,    // 用户年龄
    loginDate: new Date().getTime()
}])