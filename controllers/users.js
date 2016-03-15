const User = require('../models/user')
const serialize = require('../serializers/user')

exports.index = async (ctx, next) => {
  const currentUser = ctx.state.currentUser
  if (!currentUser) ctx.throw(401, 'no user found')
  ctx.body = serialize(currentUser)
}

exports.create = async (ctx, next) => {
  const user = new User(ctx.request.body.user)
  await user.hashPassword()
  await user.generateToken()

  const existing = await User.filter({email: user.email}).count().execute()
  if (existing) ctx.throw(422, 'User with that email already exists.')

  await user.save()
  ctx.status = 201
  ctx.body = serialize(user)
}

exports.show = async (ctx, next) => {
  const user = await User.get(ctx.params.id)
  ctx.body = serialize(user)
}

exports.login = async (ctx, next) => {
  const body = ctx.request.body
  const users = await User.filter({email: body.user.email}).run()
  const user = users[0]
  if (!user) ctx.throw(401, 'no user found')

  const validAuth = await user.comparePassword(body.user.password)
  if (!validAuth) ctx.throw(401, 'invalid login details')
  ctx.body = { token: user.token, email: user.email }
}
