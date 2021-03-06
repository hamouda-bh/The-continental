var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
 require('./models/db.js');
 require('./models/hotel.model.js');
 require('./models/personnelle.model.js');
 require('./models/circuit.model.js');
 require('./models/bus.model.js');
require('./models/driver.model.js');
var indexRouter = require('./routes/index');
var hotelRouter = require('./routes/hotel');
var voyagesRouter = require('./routes/voyages');
var usersRouter = require('./routes/users');
var personnelleRouter = require ('./routes/personnelle');
var circuitRouter= require('./routes/circuit');
var busRouter = require ('./routes/bus');
var driverRouter = require ('./routes/driver');
var transportRouter = require ('./routes/transport');


var logger = require('morgan');
var circuitRouter = require('./routes/circuit');
var logger = require('morgan');
var app = express();

require('./models/db.js');
require('./models/hotel.model.js');
require('./models/personnelle.model.js');
require('./models/voyages.model.js');
require('./models/circuit.model.js');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/hotel', hotelRouter);
app.use('/voyages', voyagesRouter);
app.use('/users', usersRouter);
app.use('/circuit',circuitRouter);
app.use('/personnelle',personnelleRouter);
app.use('/buses',busRouter);
app.use('/drivers',driverRouter);
app.use('/transport',transportRouter);

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
