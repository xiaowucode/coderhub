const app = require('../app')
const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_ALREADY_EXISTS, NAME_IS_NOT_EXISTS, PASSWORD_IS_INCORRENT } = require('../config/error')


app.on('error', (error, ctx) => {
  let code = 0
  let message = ''
  
  switch (error) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001
      message = '用户名或者密码不能为空！'
      break
    case NAME_IS_ALREADY_EXISTS:
      code = -1002
      message = '用户名已存在，不能使用！'
      break
    case NAME_IS_NOT_EXISTS:
      code = -1003
      message = '用户不存在'
      break
    case PASSWORD_IS_INCORRENT:
      code = -1004
      message = '密码错误，请重新输入！'
  }

  ctx.body = { code, message }
})