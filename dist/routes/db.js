"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
const db = require("../db/dbConfig");
const body_parser_1 = __importDefault(require("body-parser"));
const users = [];
const todo = [];
router.use(body_parser_1.default.urlencoded({ extended: false }));
/* POST new todo. */
router.post('/newTodo', function (req, res, next) {
    // simple query
    db.query('INSERT INTO `todo`(userID, title, text,createdAt, updatedAt) VALUES (?,?,?, NOW(),NOW())', [req.body.userID, req.body.title, req.body.text], function (err, results, fields) {
        // console.log(results); // results contains rows returned by server
        //console.log(fields); // fields contains extra meta data about results, if available
        res.status(200).send({ results
        });
    });
});
/* UPDATE todo. */
router.post('/updateTodo', function (req, res, next) {
    // simple query
    db.query('UPDATE `todo` SET title=?, text=?, updatedAt=NOW() WHERE id=?', [req.body.title, req.body.text, req.body.id], function (err, results, fields) {
        // console.log(results); // results contains rows returned by server
        //console.log(fields); // fields contains extra meta data about results, if available
        res.status(200).send({ results
        });
    });
});
/* DELETE todo by id. */
router.get('/deleteTodo/:id', function (req, res, next) {
    // console.log(req.params.id)
    // simple query
    db.query('DELETE FROM `todo` WHERE `id` =?', [req.params.id], function (err, results, fields) {
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
/* GET todo listing. */
router.get('/todo', function (req, res, next) {
    // simple query
    console.log('todo');
    db.query('SELECT * FROM `todo`', function (err, results, fields) {
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
/* GET todo by user id. */
router.get('/todoByUser/:id', function (req, res, next) {
    // console.log(req.params.id)
    // simple query
    db.query('SELECT * FROM `todo` WHERE `userID` =?', [req.params.id], function (err, results, fields) {
        // console.log(results); // results contains rows returned by server
        //console.log(fields); // fields contains extra meta data about results, if available
        res.status(200).send({ results
        });
    });
});
/* GET single todo by id. */
router.get('/todo/:id', function (req, res, next) {
    // console.log(req.params.id)
    // simple query
    db.query('SELECT * FROM `todo` WHERE `id` =?', [req.params.id], function (err, results, fields) {
        // console.log(results); // results contains rows returned by server
        //console.log(fields); // fields contains extra meta data about results, if available
        res.status(200).send({ results
        });
    });
});
module.exports = router;
