module.exports = (app) => {
  app.use(async (ctx, next) => {
    const start = new Date
    await next()
    const ms = new Date - start
    console.log(`${ctx.method} ${ctx.url} - ${ms} ms`)
  })

  return app
}
