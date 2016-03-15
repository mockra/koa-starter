const thinky = require('../util/thinky')
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')
const type = thinky.type

const User = thinky.createModel('User', {
  id: type.string(),
  email: type.string(),
  username: type.string(),
  name: type.string(),
  token: type.string(),
  password: type.string()
})

User.ensureIndex('token')
User.ensureIndex('email')

User.define('comparePassword', function (candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return reject(err)
      resolve(isMatch)
    })
  })
})

User.define('hashPassword', function () {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return reject(err)
      bcrypt.hash(this.password, salt, null, (err, hash) => {
        if (err) return reject(err)
        this.password = hash
        resolve()
      })
    })
  })
})

User.define('generateToken', function () {
  const user = this
  return new Promise(async (resolve, reject) => {
    while (!user.token ||
      await User.filter({token: user.token}).count().execute()) {
      user.token = crypto.randomBytes(16).toString('hex')
    }
    resolve()
  })
})

module.exports = User
