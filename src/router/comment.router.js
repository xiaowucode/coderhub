const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const CommentController = require('../controller/comment.controller')

const commentRouter = new KoaRouter({ prefix: '/comment' })

commentRouter.post('/', verifyAuth, CommentController.create)
commentRouter.post('/reply', verifyAuth, CommentController.reply)

module.exports = commentRouter