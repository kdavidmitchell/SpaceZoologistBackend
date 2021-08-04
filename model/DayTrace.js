const mongoose = require('mongoose');
const { Schema } = mongoose;

const dayTraceSchema = new Schema({
    dayID: Number,
    dayStartTime: Number,
    dayEndTime: Number,
    dayDeltaTime: Number,
    balanceStart: Number,
    balanceEnd: Number,
    journalTraces: [{ type: Schema.Types.ObjectId, ref: 'journaltraces' }],
});

mongoose.model('daytraces', dayTraceSchema);