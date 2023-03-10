// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: ''
});

module.exports= connection