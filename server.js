const express = require('express');
const keys = require('./config/keys.js');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Setting up DB
const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});
// Setup database models
require('./model/Account');
require('./model/PlayTrace');
require('./model/LevelTrace');
require('./model/DayTrace');
require('./model/JournalTrace');

// Setup the routes
require('./routes/authenticationRoutes')(app);
require('./routes/traceRoutes')(app);

app.listen(keys.port, () => {
    console.log("Listening on " + keys.port);
});