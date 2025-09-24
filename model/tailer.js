import mongoose from "mongoose";

const TailerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        number: {
            type: String,
            unique: true,
            required: true
        },
        adress: {
            type: String,
            required: true
        },
        shop: {
            type: String,
            required: true
        },
        login: {
            type: Boolean
        },
        totalNaap: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

const Tailer = mongoose.model('Tailer', TailerSchema);

export default Tailer;