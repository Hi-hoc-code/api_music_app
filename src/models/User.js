const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    premium: { type: Boolean, default: false },
    favoriteSongs: [{ type: Schema.Types.ObjectId, ref: 'FavoriteSong' }],
    playlists: [{ type: Schema.Types.ObjectId, ref: 'PlayList' }],
    listeningHistory: [{ type: Schema.Types.ObjectId, ref: 'ListeningHistory' }],
    otp: { type: String },
    optDate: { type: Date },
    avatar:String
});

module.exports = mongoose.model('User', UserSchema);
