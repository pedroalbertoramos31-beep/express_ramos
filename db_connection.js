const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'express',
  password: 'secreto123',
  port: 5432,
});

module.exports = pool;
