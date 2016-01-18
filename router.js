const router = require('koa-router')()

module.exports = (app) => {
  require('./routes/users')(router)

  app
    .use(router.routes())
    .use(router.allowedMethods())

  return app
}
