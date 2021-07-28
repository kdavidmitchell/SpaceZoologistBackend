const mongoose = require('mongoose');
const { Schema } = mongoose;

const dayTraceSchema = new Schema({
    dayID: Number,
    dayStartTime: Number,
    dayEndTime: Number,
    dayDeltaTime: Number,
    balanceStart: Number,
    balanceEnd: Number,
});

mongoose.model('daytraces', dayTraceSchema);