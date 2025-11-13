const connection = require('../app/database')

class MomentService {
  async create(content, user_id) {
    const statement = 'INSERT INTO moment (content, user_id) VALUES (?, ?);'
    const [result] = await connection.execute(statement, [content, user_id])
    return result
  }

  async queryList(size = 5, offset = 0) {
    const statement = `
      SELECT 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'createTime', u.createAt, 'updateTime', u.updateAt) user
        FROM moment m
      LEFT JOIN user u ON u.id = m.user_id
      LIMIT ? OFFSET ?;`
    const [result] = await connection.execute(statement, [size, offset])
    return result
  }

  async queryDetail(momentId) {
    const statement = `
      SELECT 
        m.id id, m.content content, DATE_FORMAT(m.createAt, '%Y-%m-%d %H:%i:%s') createTime, DATE_FORMAT(m.updateAt, '%Y-%m-%d %H:%i:%s') updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'createTime', DATE_FORMAT(u.createAt, '%Y-%m-%d %H:%i:%s'), 'updateTime', DATE_FORMAT(u.updateAt, '%Y-%m-%d %H:%i:%s')) user
      FROM moment m
      LEFT JOIN user u ON u.id = m.user_id
      WHERE m.id = 12;`
    const [result] = await connection.execute(statement, [momentId])
    return result
  }

  async update(content, momentId) {
    const statement = 'UPDATE moment SET content = ? WHERE id = ?;'
    const [result] = await connection.execute(statement, [content, momentId])
    return result
  }

  async delete(momentId) {
    const statement = 'DELETE FROM moment WHERE id = ?;'
    const [result] = await connection.execute(statement, [momentId])
    return result
  }
}

module.exports = new MomentService()