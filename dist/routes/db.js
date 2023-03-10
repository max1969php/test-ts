"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
const db = require("../db/dbConfig");
const body_parser_1 = __importDefault(require("body-parser"));
const fs = require('fs');
router.use(body_parser_1.default.urlencoded({ extended: false }));
/* POST CREATE EXERCISE QUERY. */
router.post('/exercise', function (req, res, next) {
    console.log('a', req.body);
    console.log('b', req.body.completedSelector);
    console.log('c', req.body.usersID);
    let placeholder = '%' + req.body.searchText + '%';
    let usersID = (req.body.usersID);
    console.log('d', usersID);
    console.log('e', placeholder);
    let query = 'SELECT todos.id,todos.userID,todos.title,todos.text,todos.completed,users.name from`todos` join `users` on todos.userID = users.id where `completed`>=? AND  `title` LIKE ? AND `userID` IN (?) order by todos.id';
    if (usersID == '' || usersID == 'NULL' || usersID === undefined || usersID == 'undefined')
        query = 'SELECT todos.id,todos.userID,todos.title,todos.text,todos.completed,users.name from`todos` join `users` on todos.userID = users.id where `completed`>=? AND  `title` LIKE ?  order by todos.id';
    // simple query
    var quer = db.query(query, [req.body.completedSelector, placeholder, usersID], function (err, results, fields) {
        //console.log(results); // results contains rows returned by server
        //console.log(fields); // fields contains extra meta data about results, if available
        res.status(200).send({ results
        });
    });
    console.log(quer.sql);
});
/* GET single todos by id. */
router.get('/singleTodo/:id', function (req, res, next) {
    // console.log(req.params.id)
    // simple query
    db.query('SELECT todos.id,todos.userID,todos.title,todos.text,todos.completed,users.name FROM `todos` JOIN `users` ON todos.userID = users.id WHERE todos.id =?', [req.params.id], function (err, results, fields) {
        //console.log(results); // results contains rows returned by server
        //console.log(fields); // fields contains extra meta data about results, if available
        res.status(200).send({ results
        });
    });
});
/* UPDATE todos AS TEXT AND COMPLETED FLAG. */
router.post('/updateTodos', function (req, res, next) {
    // simple query
    var quer = db.query('UPDATE `todos` SET text=?,completed=?, updatedAt=NOW() WHERE id=?', [req.body.text, req.body.completed, req.body.id], function (err, results, fields) {
        console.log(results); // results contains rows returned by server
        //console.log(fields); // fields contains extra meta data about results, if available
        res.status(200).send({ results
        });
    });
    console.log(quer.sql);
});
/* DELETE todos by id. */
router.get('/deleteTodos/:id', function (req, res, next) {
    // console.log(req.params.id)
    // simple query
    db.query('DELETE FROM `todos` WHERE `id` =?', [req.params.id], function (err, results, fields) {
        // console.log(results); // results contains rows returned by server
        //console.log(fields); // fields contains extra meta data about results, if available
        res.status(200).send({ results
        });
    });
});
/* POST new todos. */
router.post('/newTodos', function (req, res, next) {
    // simple query
    var quer = db.query('INSERT INTO `todos`(userID, title, text,createdAt, updatedAt) VALUES (?,?,?, NOW(),NOW())', [req.body.userID, req.body.title, req.body.text], function (err, results, fields) {
        console.log(results); // results contains rows returned by server
        //console.log(fields); // fields contains extra meta data about results, if available
        res.status(200).send({ results
        });
    });
    console.log(quer.sql);
});
/* GET users listing. */
router.get('/users', function (req, res, next) {
    // simple query
    db.query('SELECT * FROM `users`', function (err, results, fields) {
        // console.log(results); // results contains rows returned by server
        //console.log(fields); // fields contains extra meta data about results, if available
        res.status(200).send({ results
        });
    });
});
/* GET todos listing. */
router.get('/todos', function (req, res, next) {
    // simple query
    console.log('todos');
    db.query('SELECT id,userID,title,text,completed FROM `todos`', function (err, results, fields) {
        // console.log(results); // results contains rows returned by server
        //console.log(fields); // fields contains extra meta data about results, if available
        res.status(200).send({ results });
    });
}); /* GET todos listing where there is searched text. */
router.get('/textTodos/:text/:completed', function (req, res, next) {
    // simple query
    let placeholder = "%" + req.params.text + "%";
    let completed = 0;
    if ((req.params.completed) == 'todos') {
        completed = 0;
    }
    else {
        completed = 1;
    }
    console.log(req.params.completed, completed);
    db.query('SELECT id,userID,title,text,completed FROM `todos` WHERE `title` LIKE ? AND `completed`>=?', [placeholder, completed], function (err, results, fields) {
        // console.log(results); // results contains rows returned by server
        //console.log(fields); // fields contains extra meta data about results, if available
        res.status(200).send({ results });
    });
});
/* GET todos listing. */
router.get('/completedTodos', function (req, res, next) {
    db.query('SELECT id,userID,title,text,completed FROM `todos` where completed=1', function (err, results, fields) {
        // console.log(results); // results contains rows returned by server
        //console.log(fields); // fields contains extra meta data about results, if available
        res.status(200).send({ results });
    });
});
/* GET single user. */
router.get('/users/:id', function (req, res, next) {
    // console.log(req.params.id)
    // simple query
    db.query('SELECT * FROM `users` WHERE `id` =?', [req.params.id], function (err, results, fields) {
        // console.log(results); // results contains rows returned by server
        //console.log(fields); // fields contains extra meta data about results, if available
        res.status(200).send({ results });
    });
});
/* GET todos by user id. */
router.get('/todosByUser/:id', function (req, res, next) {
    // console.log(req.params.id)
    // simple query
    db.query('SELECT * FROM `todos` WHERE `userID` =?', [req.params.id], function (err, results, fields) {
        // console.log(results); // results contains rows returned by server
        //console.log(fields); // fields contains extra meta data about results, if available
        res.status(200).send({ results
        });
    });
});
module.exports = router;
