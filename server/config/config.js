require('dotenv').config();

module.exports = {
  development: {
    username: 'andeladeveloper',
    password: null,
    database: 'Document',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false
  },
  test: {
    use_env_variable: 'postgres://mgenhpog:XPDDU6KlEloSzxcecJ8UT8ZU0GCiXW6L@stampy.db.elephantsql.com:5432/mgenhpog',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
};
