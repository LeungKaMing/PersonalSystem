const mongoose = require('./connect')
const Schema = mongoose.Schema

// 用户基本信息库
let userInfoSchema = new Schema({
    userName: {type: String},   // 用户名
    password: {type: String},    // 用户密码
    email: {type: String},    // 用户密码
    userAge: {type: Number},    // 用户年龄
    loginDate: {type: String}   // 登陆日期
})

// 用户简历库
let userResumeSchema = new Schema({
    userName: {type: String},   // 用户名
    resume: {type: String}    // 用户简历Json字符串
})

// 导出一个名为User的model
// module.exports = mongoose.model('User', userInfoSchema)
module.exports = {
    userInfoSchema,
    userResumeSchema
}