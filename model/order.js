import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        Tailer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tailer',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true
        },
        siryalNumber: {
            type: String,
            unique: true,
            required: true
        },
        totalsuit: {
            type: String,
            required: true
        },
        suittype: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        sendingDate: {
            type: Date,
            required: true
        },
        sendingDay: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const Order = mongoose.model('Order', OrderSchema);

export default Order;