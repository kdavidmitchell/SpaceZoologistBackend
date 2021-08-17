const express = require('express');
const keys = require('./config/keys.js');
const compression = require('compression');
const helmet = require('helmet');
const app = express();
const bodyParser = require('body-parser');

// Set up middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression());
app.use(helmet());

// Setting up DB
const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

// Setup database models
require('./model/Account');
require('./model/PlayTrace');
require('./model/LevelTrace');
require('./model/DayTrace');
require('./model/JournalTrace');

// Setup debugger
const debugInit = require('./debuggers.js').init;

// Setup the routes
require('./routes/authenticationRoutes')(app);
require('./routes/traceRoutes')(app);

app.listen(keys.port, () => {
    debugInit("Listening on " + keys.port);
});