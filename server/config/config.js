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
    dialect: 'postgres',
    username: 'mgenhpog',
    password: 'XPDDU6KlEloSzxcecJ8UT8ZU0GCiXW6L',
    database: 'mgenhpog',
    host: 'stampy.db.elephantsql.com',
    port: 5432,
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
};
