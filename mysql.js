var mysql = require('mysql');

var mySqlClient = mysql.createConnection({
  host     : "localhost",
  user     : "user",
  password : "password",
  database : "mysqlTest"
});