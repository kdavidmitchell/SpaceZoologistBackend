const mongoose = require('mongoose');
const { Schema } = mongoose;

const journalTraceSchema = new Schema({
    journalStartTime: Number,
    journalEndTime: Number,
    journalDeltaTime: Number,
    journalNotes: String,
});

mongoose.model('journaltraces', journalTraceSchema);