const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
    nameSong: String,
    imgSong: String,
    audio: String,
    artist: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
    composer: [{ type: Schema.Types.ObjectId, ref: 'Composer' }],
    genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
    album: { type: Schema.Types.ObjectId, ref: 'Album' },
    releaseDate: Date,
    duration: Number,
    view: { type: Number, default: 0 }
});

module.exports = mongoose.model('Song', SongSchema);
