const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_NOT_EXISTS, PASSWORD_IS_INCORRENT, UNAUTHORIZATION } = require("../config/error")
const UserService = require('../service/users.service')
const md5password = require("../utils/md5-password")
const { PUBLIC_KEY } = require('../config/screct')
const jwt = require('jsonwebtoken')

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body

  if (!name || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }

  const users = await UserService.findUserByName(name)
  const user = users[0]
  if (!user) {
    return ctx.app.emit('error', NAME_IS_NOT_EXISTS, ctx)
  }

  if (user.PASSWORD !== md5password(password)) {
    return ctx.app.emit('error', PASSWORD_IS_INCORRENT, ctx)
  }

  ctx.user = user

  await next()
}

const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization
  const token = authorization.replace('Bearer ', '')
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    ctx.user = result

    await next()
  } catch (error) {
    ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
}

module.exports = { verifyLogin, verifyAuth }