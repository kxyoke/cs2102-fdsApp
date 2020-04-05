if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

var express = require('express');
//var pool = require('./db');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var flash = require('express-flash');
var session = require('express-session');
const passport = require('passport');
const {checkNotAuthenticated, checkAuthenticated} = require('./auth/middleware');
const {isFDS,isCustomer,isRider,isResStaff} = require('./auth/identityMiddleware');
// const exphbs = require('express-handlebars');

/*================= LINK YOUR ROUTE FILES HERE ===================*/
var loginRouter = require('./routes/loginAPI/loginRoutes');
var signupRouter = require('./routes/signupAPI/signupRoutes');
var customerRouter = require('./routes/customerAPI/customerRouter');
var rRouter = require('./routes/restaurantAPI/rRoutes');

/*----------------------- END OF LINK ----------------------------*/

var app = express();
require('./auth/initAuth').initPassport();

// view engine setup
// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');
const corsOptions = {
    credentials:true
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized: false,
    cookie: { maxAge: 604800000 }
}))
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
  });

app.use((err, req, res, next) => {
    res.render('500');
    next(err);
  });

 //authenticate the client side

 app.get('/auth', checkAuthenticated, (req, res) => {
     res.sendStatus(200);
 })
 app.get('/auth/fds', checkAuthenticated, isFDS, (req, res) => {
    res.sendStatus(200);
})
app.get('/auth/rider', checkAuthenticated, isRider, (req, res) => {
    res.sendStatus(200);
})
app.get('/auth/customer', checkAuthenticated, isCustomer, (req, res) => {
    res.sendStatus(200);
})
app.get('/auth/resStaff', checkAuthenticated, isResStaff, (req, res) => {
    res.sendStatus(200);
})

 app.get('/notAuth', checkNotAuthenticated, (req, res) => {
    res.sendStatus(200);
})

app.post('/logout', (req, res)=> {
    console.log('logging out');
    console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
    console.log(`req.user: ${JSON.stringify(req.user)}`)
    req.logout();
    res.send('logout');
})

/*================= REGISTER YOUR ROUTES HERE ====================*/
app.use('/api/login', loginRouter);
app.use('/api/signup', signupRouter);
app.use('/api/customer', customerRouter);
app.use('/api/restaurant', rRouter);

/*----------------- END OF ROUTE REGISTRATION --------------------*/


module.exports = app;

