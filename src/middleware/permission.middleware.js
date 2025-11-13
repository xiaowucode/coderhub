const { OPERATION_IS_NOT_ALLOWED } = require('../config/error')
const PermissionService = require('../service/permission.service')

const verifyPermission = async (ctx, next) => {
  const user_id = ctx.user.id
  const keyName = Object.keys(ctx.params)[0]
  const resourceId = ctx.params[keyName]
  const resourceName = keyName.replace('Id', '')
  const result = await PermissionService.checkResource(resourceName, resourceId, user_id)
  if (!result) {
    return ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
  }
  await next()
}

module.exports = {
  verifyPermission
}