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
    let usersID = (JSON.parse(req.body.usersID));
    console.log('d', usersID);
    console.log('e', placeholder);
    // simple query
    var quer = db.query('SELECT id,userID,title,text,completed from`todos` where `completed`>=? AND `userID` IN (?) AND  `title` LIKE ?', [req.body.completedSelector, usersID, placeholder], function (err, results, fields) {
        //console.log(results); // results contains rows returned by server
        //console.log(fields); // fields contains extra meta data about results, if available
        res.status(200).send({ results
        });
    });
    console.log(quer.sql);
});
/* POST new todos. */
router.post('/newTodos', function (req, res, next) {
    // simple query
    db.query('INSERT INTO `todos`(userID, title, text,createdAt, updatedAt) VALUES (?,?,?, NOW(),NOW())', [req.body.userID, req.body.title, req.body.text], function (err, results, fields) {
        // console.log(results); // results contains rows returned by server
        //console.log(fields); // fields contains extra meta data about results, if available
        res.status(200).send({ results
        });
    });
});
/* UPDATE todos. */
router.post('/updateTodos', function (req, res, next) {
    // simple query
    db.query('UPDATE `todos` SET title=?, text=?, updatedAt=NOW() WHERE id=?', [req.body.title, req.body.text, req.body.id], function (err, results, fields) {
        // console.log(results); // results contains rows returned by server
        //console.log(fields); // fields contains extra meta data about results, if available
        res.status(200).send({ results
        });
    });
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
    let placeholder = '%' + req.params.text + '%';
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
/* GET single todos by id. */
router.get('/todos/:usersid', function (req, res, next) {
    // console.log(req.params.id)
    // simple query
    db.query('SELECT * FROM `todos` WHERE `id` =?', [req.params.id], function (err, results, fields) {
        // console.log(results); // results contains rows returned by server
        //console.log(fields); // fields contains extra meta data about results, if available
        res.status(200).send({ results
        });
    });
});
module.exports = router;
