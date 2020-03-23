const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const routes = require('./routes');
const routeUser = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 3000;

// mongoose
mongoose.connect('mongodb://localhost:27017/test', 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Mongoose connected...'))
    .catch(err => console.error(err))

// ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false })); 

// Routes
app.use('/',routes);
app.use('/users',routeUser);

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}...`)
})