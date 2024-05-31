const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const currentUserOrderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'data_of_users',
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
    // status: {
    //     type: String,
    //     enum: ['pending', 'accepted', 'onTheWay', 'completed', 'cancelled'],
    //     default: 'pending',
    // },
    fare: {
        type: Number,
        required: true,
        min: 0,
    },
    // comment: String,
}, { timestamps: true });

currentUserOrderSchema.index({ pickupLocation: '2dsphere', destination: '2dsphere' });

const get_current_user_order = mongoose.model('current_user_orders', currentUserOrderSchema);

module.exports = get_current_user_order;