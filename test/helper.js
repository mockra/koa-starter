const config = require('../config')

afterEach( async function (done) {
  const tables = await thinky.r.db(config.thinky.db).tableList()
  _.each(tables, async (table) => {
    await thinky.r.table(table).delete()
  })
  done()
})
