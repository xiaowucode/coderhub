const koa = require('koa')
const bodyparser = require('koa-bodyparser')
const registerRouters = require('../router')

const app = new koa()

app.use(bodyparser())
registerRouters(app)

module.exports = app