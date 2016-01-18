const users = require('../controllers/users')

module.exports = (router) => {
  router.get('/users', users.index)
  router.get('/users/:id', users.show)
  router.post('/users', users.create)
  router.post('/login', users.login)

  return router
}
