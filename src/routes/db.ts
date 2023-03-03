var express = require('express');
var router = express.Router();
const db = require("../db/dbConfig");
import bodyParser from 'body-parser';
import { Users } from "./../types";
import { Todo } from "./../types";
const users: Users[] = [];
const todo: Todo[] = [];
const fs = require('fs');

router.use(bodyParser.urlencoded({ extended: false }));

/* POST new todos. */
router.post('/newTodos', function(req, res, next) {
// simple query
db.query(
  'INSERT INTO `todos`(userID, title, text,createdAt, updatedAt) VALUES (?,?,?, NOW(),NOW())',
  [req.body.userID,req.body.title,req.body.text],
     function(err, results, fields) {
     // console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results, if available
  res.status(200).send({results
  });
    }
  )
});

/* UPDATE todos. */
router.post('/updateTodos', function(req, res, next) {
// simple query
db.query(
  'UPDATE `todos` SET title=?, text=?, updatedAt=NOW() WHERE id=?',
  [req.body.title,req.body.text,req.body.id],
     function(err, results, fields) {
     // console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results, if available
  res.status(200).send({results
  });
    }
  )
});

/* DELETE todos by id. */
router.get('/deleteTodos/:id', function(req, res, next) {
 // console.log(req.params.id)
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

/* GET todos listing. */
router.get('/todos', function(req, res, next) {
// simple query
console.log('todos')
db.query(
    'SELECT id,userID,title,text,completed FROM `todos`',
    function(err, results, fields) {
     // console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results, if available
  res.status(200).send({ results });
    }
  )
});/* GET todos listing where there is searched text. */
router.get('/textTodos/:text/:completed', function(req, res, next) {
// simple query
let placeholder='%'+req.params.text+'%';
let completed=0
if((req.params.completed)=='todos') {completed=0}else{completed=1}
console.log(req.params.completed,completed)
db.query(
    'SELECT id,userID,title,text,completed FROM `todos` WHERE `title` LIKE ? AND `completed`>=?',
    [placeholder,completed],
    function(err, results, fields) {
     // console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results, if available
  res.status(200).send({ results });
    }
  )
});

/* GET todos listing. */
router.get('/completedTodos', function(req, res, next) {
db.query(
    'SELECT id,userID,title,text,completed FROM `todos` where completed=1',
    function(err, results, fields) {
     // console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results, if available
  res.status(200).send({ results });
    }
  )
});
/* GET single user. */
router.get('/users/:id', function(req, res, next) {
   // console.log(req.params.id)
// simple query
db.query(
    'SELECT * FROM `users` WHERE `id` =?',
    [req.params.id],
    function(err, results, fields) {
     // console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results, if available
  res.status(200).send({results});
    }
  )
});

/* GET todos by user id. */
router.get('/todosByUser/:id', function(req, res, next) {
   // console.log(req.params.id)
// simple query
db.query(
    'SELECT * FROM `todos` WHERE `userID` =?',
    [req.params.id],
    function(err, results, fields) {
     // console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results, if available
  res.status(200).send({results
  });
    }
  )
});

/* GET single todos by id. */
router.get('/todos/:id', function(req, res, next) {
   // console.log(req.params.id)
// simple query
db.query(
    'SELECT * FROM `todos` WHERE `id` =?',
    [req.params.id],
    function(err, results, fields) {
     // console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results, if available
  res.status(200).send({results
  });
    }
  )
});
module.exports = router;

