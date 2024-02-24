const { Pool } = require('pg');

const dbPool = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE
};

if (process.env.NODE_ENV === 'production') {
  dbPool.ssl = {
    rejectUnauthorized: false
  }
}

const db = new Pool(dbPool);

module.exports = db;