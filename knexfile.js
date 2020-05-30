require('dotenv/config');
const path = require('path');

module.exports = {
  client: 'postgresql',
  connection: {
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
};
