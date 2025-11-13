const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const MomentController = require('../controller/moment.controller')
const { verifyPermission } = require('../middleware/permission.middleware')

const momentRouter = new KoaRouter({ prefix: '/moment' })

momentRouter.post('/', verifyAuth, MomentController.create)
momentRouter.get('/', MomentController.list)
momentRouter.get('/:momentId', MomentController.detail)
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, MomentController.update)
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, MomentController.delete)

module.exports = momentRouter