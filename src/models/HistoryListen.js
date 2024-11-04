const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListeningHistorySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    song: [{ type: Schema.Types.ObjectId, ref: 'Song' }],
    listenedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ListeningHistory', ListeningHistorySchema);
