const mongoose = require('mongoose');
const { Schema } = mongoose;

const playTraceSchema = new Schema({
    playerID: String,
    sessionID: String,
    sessionElapsedTime: Number,
    levelTraces: [{ type: Schema.Types.ObjectId, ref: 'leveltraces' }],
});

mongoose.model('playtraces', playTraceSchema);