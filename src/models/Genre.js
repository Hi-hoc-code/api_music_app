const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  nameGenre: { type: String, require: true },
  descriptionGenre: String,
  imgGenre: String
});

module.exports = mongoose.model('Genre', GenreSchema);
