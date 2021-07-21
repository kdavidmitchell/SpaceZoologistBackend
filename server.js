const express = require('express');
const keys = require('./config/keys.js');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Setting up DB
const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});
// Setup database models
require('./model/Account');
require('./model/PlayTrace');

// Setup the routes
require('./routes/authenticationRoutes')(app);

app.get('/playtrace', async (req, res) => {
    // placeholder
});

app.listen(keys.port, () => {
    console.log("Listening on " + keys.port);
});