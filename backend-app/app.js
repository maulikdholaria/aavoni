var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var logger = require('morgan');
var fs = require('fs');

var config = require('./config');
var indexRouter = require('./routes/index');
var searchWeddingPlannerRouter = require('./routes/searchWeddingPlanner');
var searchVenueRouter = require('./routes/searchVenue');
var usersRouter = require('./routes/users');
var venueRouter = require('./routes/venue');
var plannerRouter = require('./routes/planner');
var leadsRouter = require('./routes/leads');

var app = express();

console.log("Starting for ENV: " + app.get('env') );
console.log(config);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cookieSession({
  name: 'session',
  keys: ['user'],
  maxAge: 365 * 24 * 60 * 60 * 1000 // 365 days
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/venue', venueRouter);
app.use('/api/planner', plannerRouter);
app.use('/api/leads/', leadsRouter);
app.use('/api/search/wedding-planner', searchWeddingPlannerRouter);
app.use('/api/search/venue', searchVenueRouter);
app.use('/images', express.static(path.join(__dirname, 'public')))
app.use('/site-assets', express.static(path.join(__dirname, 'public')))

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
