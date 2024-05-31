const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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

userSchema.index({ location: '2dsphere' });

const get_user = mongoose.model('data_of_users', userSchema);

module.exports = get_user;