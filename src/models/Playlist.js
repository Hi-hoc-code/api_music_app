const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayListSchema = new Schema({
    name: String,
    imgPlaylist: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }]
});

module.exports = mongoose.model('PlayList', PlayListSchema);
