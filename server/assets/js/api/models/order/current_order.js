const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const currentOrderSchema = new Schema({
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
        // type: { type: String },
        // coordinates: [Number],
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
    // customerApproval: {
    //     type: Boolean,
    //     default: false,
    // },
    // driverApproval: {
    //     type: Boolean,
    //     default: false,
    // },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    comment: String,
}, { timestamps: true });

currentOrderSchema.index({ pickupLocation: '2dsphere', destination: '2dsphere' });

const get_current_order = mongoose.model('current_orders', currentOrderSchema);

module.exports = get_current_order;