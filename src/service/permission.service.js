const connection = require('../app/database')

class PermissionService {
  async checkResource(resourceName, resourceId, user_id) {
    const statement = `SELECT * FROM ${resourceName} WHERE id = ? AND user_id = ?;`
    const [result] = await connection.execute(statement, [resourceId, user_id])
    return !!result.length
  }
}

module.exports = new PermissionService()