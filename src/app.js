const app = require('./config/express');
const mongoose = require('./config/mongoose');
const { port, env } = require('./config/vars');

// mongoose
mongoose.connect()
    .then(() => console.log('Mongoose connected...'))
    .catch(err => console.error(err))

app.listen(port, () => {
    console.log(`Listening to port ${port} ${env}...`)
})