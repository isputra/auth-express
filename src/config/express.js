const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);

const connection = require('./mongoose').connect();
const routes = require('../routes');
const routeUser = require('../routes/user');
const { session_secret } = require('../config/vars');

const app = express();

// Passport config
require('./passport')(passport);

// ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false })); 

// Express session
app.use(session({
    secret: session_secret,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: connection}),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});
  
// Routes
app.use('/',routes);
app.use('/users',routeUser);

module.exports = app;