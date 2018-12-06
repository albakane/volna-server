let mysql = require('mysql');
let connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'root',
  database : 'volna',
  multipleStatements : true
});
connection.connect();

module.exports = connection;