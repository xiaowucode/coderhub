const connection = require('../app/database')

class CommentService {
  async create(content, moment_id, user_id) {
    const statement = 'INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);'
    const [result] = await connection.execute(statement, [content, moment_id, user_id])
    return result
  }
  async reply(content, moment_id, commentId, user_id) {
    const statement = 'INSERT INTO comment (content, moment_id, comment_id, user_id) VALUES (?, ?, ?, ?);'
    const [result] = await connection.execute(statement, [content, moment_id, commentId, user_id])
    return result
  }
}

module.exports = new CommentService()