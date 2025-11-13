const MomentService = require('../service/moment.service')

class MomentController {
  async create(ctx, next) {
    const { content } = ctx.request.body
    const { id } = ctx.user
    const result = await MomentService.create(content, id)
    ctx.body = {
      code: 0,
      message: '动态发表成功',
      data: result
    }
  }

  async list(ctx, next) {
    const { offset, size } = ctx.query
    const result = await MomentService.queryList(size, offset)
    ctx.body = {
      code: 0,
      message: '查询列表成功',
      data: result
    }
  }

  async detail(ctx, next) {
    const { momentId } = ctx.params
    const result = await MomentService.queryDetail(momentId)
    ctx.body = {
      code: 0,
      message: '查询动态详情成功',
      data: result[0]
    }
  }

  async update(ctx, next) {
    const { momentId } = ctx.params
    const { content } = ctx.request.body
    const result = await MomentService.update(content, momentId)
    ctx.body = {
      code: 0,
      message: '修改动态成功',
      data: result
    }
  }

  async delete(ctx, next) {
    const { momentId } = ctx.params
    const result = await MomentService.delete(momentId)
    ctx.body = {
      code: 0,
      message: '删除动态成功',
      data: result
    }
  }
}

module.exports = new MomentController