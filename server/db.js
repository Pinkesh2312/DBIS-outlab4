const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "abcd@1234",
  port: 5432,
  database: "outlab4"
});

module.exports = pool;
