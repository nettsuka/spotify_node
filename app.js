var createError = require('http-errors');
var express = require('express');
var path = require('path');
var sess = require('express-session');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');

var app = express();

//Specify that connections from localhost:4200 (the client app) are allowed
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('trust proxy', 1);
app.use(session(sess));

app.use('/', indexRouter);

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/client'));

app.get('/*', function(req,res) {
    
res.sendFile( path.resolve( 
  path.join(__dirname+'/dist')
) );
});

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

module.exports = app;