const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');

const mongoose = require('./config/mongoose');

const routes = require('./routes');
const routeUser = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 3000;

// mongoose
mongoose.connect()
    .then(() => console.log('Mongoose connected...'))
    .catch(err => console.error(err))

// ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false })); 

// express session
app.use(session({
    secret: 'secret-session',
    resave: true,
    saveUninitialized: true
}))

// flash
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

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}...`)
})