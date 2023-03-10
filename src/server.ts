const createError = require('http-errors');
const cors = require('cors')
const express = require('express');
const path = require('path');
const db = require("../src/db/dbConfig");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const port = 3001
const dbRouter = require('./routes/db')
const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile( path.join(__dirname, '/public/html/index.html'))
}); 
app.use('/db',dbRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;
