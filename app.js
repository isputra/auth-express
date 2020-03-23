const express = require('express');
const expressLayouts = require('express-ejs-layouts'); 
const routes = require('./routes');
const routeUser = require('./routes/user');
const app = express();

const PORT = process.env.PORT || 3000;

// ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Routes
app.use('/',routes);
app.use('/users',routeUser);

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}...`)
})