var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var logger = require('morgan');
var fs = require('fs');
const fileUpload = require('express-fileupload');

var config = require('./config');
var indexRouter = require('./routes/index');
var searchWeddingPlannerRouter = require('./routes/searchWeddingPlanner');
var searchVenueRouter = require('./routes/searchVenue');
var usersRouter = require('./routes/users');
var venueRouter = require('./routes/venue');
var plannersRouter = require('./routes/planners');
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
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(fileUpload());

// Determine user authentication & authorization
app.use(function(req, res, next) {
  req.session.isAuthenticated = false;
  req.session.isAdmin = false;

  if(req.session.user != undefined || req.session.user != null) {
  	req.session.isAuthenticated = true;
  	const loggedinEmail = req.session.user.email;
    if(loggedinEmail.match(/@aavoni.com$/g)) {
  	  req.session.isAdmin = true;
    }
  } 
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(config['IMAGE_BASE_DIR']));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/venue', venueRouter);
app.use('/api/planners/', plannersRouter);
app.use('/api/leads/', leadsRouter);
app.use('/api/search/wedding-planner', searchWeddingPlannerRouter);
app.use('/api/search/venue', searchVenueRouter);
app.use('/images', express.static(config['IMAGE_BASE_DIR']));
app.use('/site-assets', express.static(path.join(__dirname, 'public')));

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
