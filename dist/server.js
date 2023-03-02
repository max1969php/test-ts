var createError = require('http-errors');
var cors = require('cors');
var express = require('express');
var path = require('path');
const db = require("../src/db/dbConfig");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const port = 3001;
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dbRouter = require('./routes/db');
var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/html/index.html'));
});
app.use('/users', usersRouter);
app.use('/db', dbRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
module.exports = app;
