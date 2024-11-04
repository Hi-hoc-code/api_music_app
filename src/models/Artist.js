const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: String,
    imgArtist: String,
    bio: String,
});

module.exports = mongoose.model('Artist', ArtistSchema);
