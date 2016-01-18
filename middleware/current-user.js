const User = require('../models/user')

module.exports = (app) => {
  app.use(async function (ctx, next) {
    const authHeader = ctx.request.header.authorization || ''
    const tokenParts = authHeader.match('token\=\"([a-z0-9]*)\"') || []
    const token = (tokenParts.length ? tokenParts[1] : null)

    if (token) {
      const users = await User.filter({ token: token })
      const user = users[0]

      ctx.state.currentUser = user
    }

    await next()
  })

  return app
}
