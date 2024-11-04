const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteSongSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    song: [{ type: Schema.Types.ObjectId, ref: 'Song' }],
    addedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FavoriteSong', FavoriteSongSchema);
