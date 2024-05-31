const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const confirmedOrderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'data_of_users',
        required: true,
    },
    driver: {
        type: Schema.Types.ObjectId,
        ref: 'data_of_drivers',
        required: true,
    },
    pickupLocation: {
        type: {
            type: String,
            enum: ['Point'],
            // default: 'Point',
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
        // [Number],
        // required: true,
    },
    destination: {
        type: {
            type: String,
            enum: ['Point'],
            // default: 'Point',
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
        // type: { type: String },
        // coordinates: [Number],
        // required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'onTheWay', 'completed', 'cancelled'],
        default: 'pending',
    },
    fare: {
        type: Number,
        required: true,
        min: 0,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    comment: String,
}, { timestamps: true });

confirmedOrderSchema.index({ pickupLocation: '2dsphere', destination: '2dsphere' });

const get_confirmed_order = mongoose.model('confirmed_orders', confirmedOrderSchema);

module.exports = get_confirmed_order;