const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');

const routes = require('../routes');
const routeUser = require('../routes/user');

const app = express();

// ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false })); 

// Express session
app.use(session({
    secret: 'secret-session',
    resave: true,
    saveUninitialized: true
}))

// Flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});
  
// Routes
app.use('/',routes);
app.use('/users',routeUser);

module.exports = app;