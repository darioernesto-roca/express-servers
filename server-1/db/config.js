const { Pool } = require('pg');
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

/**
 * Executes a database query with parameters.
 * @param {string} text - SQL query string
 * @param {Array} [params] - Query parameters
 * @returns {Promise} Query result
 */
const query = async (text, params) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } catch (err) {
    console.error("Database query error:", err.stack);
    throw err;
  } finally {
    client.release();
  }
};

module.exports = { pool, query };
