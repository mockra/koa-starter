const currentEnv = process.env.NODE_ENV || 'development'

module.exports = {
  thinky: {
    host: process.env.RDB_HOST || 'localhost',
    port: 28015,
    authKey: process.env.RDB_AUTH || '',
    db: process.env.RDB_DB || 'app_name_' + currentEnv
  }
}
