const { Pool } = require('pg');

const dbPool = {
  connectionString: process.env.DATABASE_URL
};

if (process.env.NODE_ENV === 'production') {
  //@ts-ignore
  dbPool.ssl = {
    rejectUnauthorized: false
  }
}

const db = new Pool(dbPool);

module.exports = db;

export {};
