const mongoose = require('mongoose');
const { Schema } = mongoose;

const setTraceSchema = new Schema({
    playerID: String,
    result: String,
    numDays: Number,
    currency: Number,
    failure: String,
    foodScore: Number,
    terrainScore: Number,
});

mongoose.model('settraces', setTraceSchema);