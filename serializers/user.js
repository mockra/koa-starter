const serialize = require('rest-serializer')
const _ = require('lodash')

module.exports = function (data) {
  const key = ((_.isArray(data)) ? 'users' : 'user')
  const options = { without: ['token', 'password', 'passwordConfirmation'] }

  return serialize(key, data, options)
}
