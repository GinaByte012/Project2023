
var mysql = require('mysql');

var client = mysql.createConnection({
  host: 'localhost',  // 데이터베이스 서버가 있는 주소.
  port: 3306,
  user: 'dbid232',     // 데이터베이스에 접근하기 위한 ID
  password: 'dbpass232',     // 데이터베이스에 접근하기 위한 Password
  database: 'db23201'   // 접근하고자 하는 데이터베이스 이름
});

// connection.connect();
// client.query('SELECT * from user', function (error, results, fields) {
//   if (error) {
//     console.log(error);
//   }
//   console.log(results);
// });
// connection.end()

module.exports = client;