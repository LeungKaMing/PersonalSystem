const mongoose = require('./connect')
const Schema = mongoose.Schema

// 用户基本信息库
let userInfoSchema = new Schema({
    userId: {type: String},   // 用户Id
    userName: {type: String},   // 用户名
    password: {type: String},    // 用户密码
    email: {type: String},    // 用户密码
    userAge: {type: Number},    // 用户年龄
    loginDate: {type: String}   // 登陆日期
})

// 用户简历库(一个用户对应一个简历，唯一)
let userResumeSchema = new Schema({
    userId: {type: String},   // 用户名Id [public key]
    resumeId: {type: String},    // 用户简历Id
    resume: {type: String}    // 用户简历Json字符串
})

// 项目信息库
let userProjectSchema = new Schema({
    userId: {type: String},   // 用户名Id [public key]
    projectId: {type: String},    // 用户项目Id
    projectName: {type: String},    // 用户项目名
    projectUrl: {type: String},    // 用户项目内容
})

// 导出一个名为User的model
// module.exports = mongoose.model('User', userInfoSchema)
module.exports = {
    userInfoSchema,
    userResumeSchema,
    userProjectSchema
}