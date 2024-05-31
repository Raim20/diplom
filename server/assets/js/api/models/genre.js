const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const data_of_genre = new Schema({
    id_of_genre: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
});

const get_genre = mongoose.model('genre', data_of_genre);

module.exports = get_genre;