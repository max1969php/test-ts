// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'forfaix_user',
  password: 'skfdik(hjg5G5',
  database: 'test'
});



// with placeholder
/*connection.query(
  'SELECT * FROM `users` WHERE `name` = ? AND `age` > ?',
  ['nax', 4],
  function(err, results) {
    console.log(results);
  }
);*/

module.exports= connection