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
    username: 'andeladeveloper',
    password: null,
    database: 'DMS',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
};
