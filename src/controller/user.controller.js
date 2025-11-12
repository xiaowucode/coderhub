const UserService = require('../service/users.service')

class UserController {
  async create(ctx, next) {
    const user = ctx.request.body
    console.log('请求数据', user)

    const result = await UserService.create(user)
    ctx.body = {
      message: '创建用户成功',
      data: result
    }
  }
}

module.exports = new UserController