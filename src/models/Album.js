const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    nameAlbum: String,
    imgAlbum: String,
    releaseDate: Date,
    artist: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
});

module.exports = mongoose.model('Album', AlbumSchema);
