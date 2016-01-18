const Koa = require('koa')
const convert = require('koa-convert')
const cors = require('kcors')
const app = new Koa()
const bodyParser = require('koa-bodyparser')

app.use(convert(cors()))

app.use(bodyParser())

require('./middleware/logger')(app)
require('./middleware/current-user')(app)
require('./router')(app)

app.use(ctx => {
  ctx.body = 'Hello World'
})

app.listen(3010)

module.exports = app
