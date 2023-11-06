const mysql = require("mySQL");

const db = mysql.createPool({
  host: "localhost",
  user: "test",
  password: "dbpass232",
  database: "db23201",
});

module.exports = db;
