const crypto = require('crypto')

function md5password(password) {
  const md5 = crypto.createHash('md5')

  const password_md5 = md5.update(password).digest('hex')

  return password_md5
}

module.exports = md5password