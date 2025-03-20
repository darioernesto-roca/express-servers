const { Pool } = require("pg");
require("dotenv").config();

// Create a new pool with the connection details
// from the .env file. The `ssl` option is required
// I'm using Neon https://console.neon.tech/ to host my database
// so I need to set `rejectUnauthorized` to `false`.

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false }, // ✅ Required for Neon
});

/**
 * Executes a database query with parameters.
 * @param {string} text - SQL query string
 * @param {Array} [params] - Query parameters
 * @returns {Promise} Query result
 */
const query = async (text, params = []) => {
  try {
    const result = await pool.query(text, params); // ✅ No need to call `pool.connect()`
    return result;
  } catch (err) {
    console.error("❌ Database query error:", err.stack);
    throw err;
  }
};

module.exports = { pool, query };