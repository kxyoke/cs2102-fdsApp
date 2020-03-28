var createError = require('http-errors');
var express = require('express');
//var pool = require('./db');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
// const exphbs = require('express-handlebars');

/*================= LINK YOUR ROUTE FILES HERE ===================*/
var rRouter = require('./routes/restaurantAPI/rRoutes');
var lRouter = require('./routes/loginAPI/loginRoutes');

/*----------------------- END OF LINK ----------------------------*/

var app = express();

// view engine setup
// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*================= REGISTER YOUR ROUTES HERE ====================*/
app.use('/api/restaurant', rRouter);
app.use('/api/login', lRouter);
/*----------------- END OF ROUTE REGISTRATION --------------------*/

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;

