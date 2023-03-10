var express = require('express');
var router = express.Router();
const db = require("../db/dbConfig");
import bodyParser from 'body-parser';

router.use(bodyParser.urlencoded({ extended: false }));

/* POST CREATE EXERCISE QUERY. */
router.post('/exercise', function(req, res, next) {
  let placeholder='%'+req.body.searchText+'%';
  let usersID=(req.body.usersID)
  //  query standard
  let query='SELECT todos.id,todos.userID,todos.title,todos.text,todos.completed,users.name from`todos` join `users` on todos.userID = users.id where `completed`>=? AND  `title` LIKE ? AND `userID` IN (?) order by todos.id'
  //QUERY PER IL CASO USER=undefine, null, '' , tipicamente alla prima chiamata in attesa della
  //risposta async alla chiamta per elenco users, Manca la clause  "AND `userID` IN (?)"
  if(usersID=='' ||usersID=='NULL'||usersID===undefined||usersID=='undefined')query='SELECT todos.id,todos.userID,todos.title,todos.text,todos.completed,users.name from`todos` join `users` on todos.userID = users.id where `completed`>=? AND  `title` LIKE ?  order by todos.id'
  // simple query
db.query(
  query,
  [req.body.completedSelector,placeholder,usersID],
     function(err, results, fields) {
      //console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results, if available
  res.status(200).send({results
  });
    }
  )
});

/* GET single todos by id. */
router.get('/singleTodo/:id', function(req, res, next) {
// simple query
db.query(
   'SELECT todos.id,todos.userID,todos.title,todos.text,todos.completed,users.name FROM `todos` JOIN `users` ON todos.userID = users.id WHERE todos.id =?',
   [req.params.id],
   function(err, results, fields) {
    //console.log(results); // results contains rows returned by server
     //console.log(fields); // fields contains extra meta data about results, if available
  res.status(200).send({results
  });
    }
  )
});

/* UPDATE todos AS TEXT AND COMPLETED FLAG. */
router.post('/updateTodos', function(req, res, next) {
// simple query
db.query(
  'UPDATE `todos` SET text=?,completed=?, updatedAt=NOW() WHERE id=?',
  [req.body.text,req.body.completed,req.body.id],
     function(err, results, fields) {
     //console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results, if available
  res.status(200).send({results
  });
    }
  )
});
/* DELETE todos by id. */
router.get('/deleteTodos/:id', function(req, res, next) {
// simple query
db.query(
    'DELETE FROM `todos` WHERE `id` =?',
    [req.params.id],
    function(err, results, fields) {
     // console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results, if available
  res.status(200).send({results
  });
    }
  )
});

/* POST new todos. */
router.post('/newTodos', function(req, res, next) {
// simple query
db.query(
  'INSERT INTO `todos`(userID, title, text,createdAt, updatedAt) VALUES (?,?,?, NOW(),NOW())',
  [req.body.userID,req.body.title,req.body.text],
     function(err, results, fields) {
     console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results, if available
  res.status(200).send({results
  });
    }
  )
});

/* GET users listing. */
router.get('/users', function(req, res, next) {
// simple query
db.query(
    'SELECT * FROM `users`',
    function(err, results, fields) {
     // console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results, if available
  res.status(200).send({results
  });
    }
  )
});

module.exports = router;

