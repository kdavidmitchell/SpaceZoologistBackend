const mongoose = require('mongoose');
const { Schema } = mongoose;

const levelTraceSchema = new Schema({
    levelID: Number,
    levelStartTime: Number,
    levelEndTime: Number,
    levelDeltaTime: Number,
    levelElapsedDays: Number,
    levelComplete: Boolean,
    dayTraces: [{ type: Schema.Types.ObjectId, ref: 'daytraces' }],
});

mongoose.model('leveltraces', levelTraceSchema);