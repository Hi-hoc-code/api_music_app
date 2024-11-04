const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComposerSchema = new Schema({
    nameCompose: String,
    imgCompose: String,
    bioCompose: String,
});

module.exports = mongoose.model('Composer', ComposerSchema);
