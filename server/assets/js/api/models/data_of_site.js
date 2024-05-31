const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const data_of_site = new Schema({
    language: {
        type: [String],
        required: true,
        unique: true,
    },
    platform: {
        pc: {
            windows: {
                name: {
                    type: String,
                    required: true,
                    unique: true,
                },
                version: {
                    type: [String],
                    required: true,
                    unique: true,
                },
            },
            macos: {
                name: {
                    type: String,
                    required: true,
                    unique: true,
                },
                version: {
                    type: [String],
                    required: true,
                    unique: true,
                },
            },
            linux: {
                name: {
                    type: String,
                    required: true,
                    unique: true,
                },
                version: {
                    type: [String],
                    required: true,
                    unique: true,
                },
            },
        },
        console: {
            playstation: {
                name: {
                    type: String,
                    required: true,
                    unique: true,
                },
                version: {
                    type: [String],
                    required: true,
                    unique: true,
                },
            },
            xbox: {
                name: {
                    type: String,
                    required: true,
                    unique: true,
                },
                version: {
                    type: [String],
                    required: true,
                    unique: true,
                },
            },
            nintendo: {
                name: {
                    type: String,
                    required: true,
                    unique: true,
                },
                version: {
                    type: [String],
                    required: true,
                    unique: true,
                },
            },
        },
        mobile: {
            android: {
                name: {
                    type: String,
                    required: true,
                    unique: true,
                },
                version: {
                    type: [String],
                    required: true,
                    unique: true,
                },
            },
            ios: {
                name: {
                    type: String,
                    required: true,
                    unique: true,
                },
                version: {
                    type: [String],
                    required: true,
                    unique: true,
                },
            },
        },
    },
});

const get_data_of_site = mongoose.model('data_of_site', data_of_site);

module.exports = get_data_of_site;