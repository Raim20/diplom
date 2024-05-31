const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taxiDriverSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "/svg/profile.svg",
        required: false,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            // default: 'Point',
            // required: true,
        },
        coordinates: {
            type: [Number],
            // required: true,
        },
        // type: { type: String },
        // coordinates: [Number],
    },
    current_location: {
        type: {
            type: String,
            enum: ['Point'],
            // default: 'Point',
            // required: true,
        },
        coordinates: {
            type: [Number],
            // required: true,
        },
        // type: { type: String },
        // coordinates: [Number],
    },
    // carDetails: {
    //     make: String,
    //     model: String,
    //     year: Number,
    //     licensePlate: String,
    // },
    carDetails: {
        make: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        licensePlate: {
            type: String,
            required: true,
            unique: true,
        },
        color: {
            type: String,
            required: true,
        },
    },
    available: {
        type: Boolean,
        default: true,
    },
    current_order: {
        type: Schema.Types.ObjectId,
        ref: 'current_orders',
    },
    past_orders: [{
        confirmed_past_orders: {
            type: Schema.Types.ObjectId,
            ref: 'confirmed_orders',
        },
        addedAt: {
            type: Date,
            default: Date.now,
        },
    }],
}, { timestamps: true });

taxiDriverSchema.index({ location: '2dsphere' });

const get_driver = mongoose.model('data_of_drivers', taxiDriverSchema);

module.exports = get_driver;