import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema(
    {
        customerName: { type: String},
        customerNumber: { type: Number},
        amount: { type: Number},
        status: { type: Boolean, required: true },
        note: { type: String },
        date: { type: Date, default: Date.now },
        _id: false
    }
);

const CashSchema = new mongoose.Schema(
    {
        Tailer: { type: mongoose.Schema.Types.ObjectId, ref: 'Tailer', required: true },
        name: { type: String, required: true },
        number: { type: Number, required: true },
        cash: { type: Number, required: true },
        status: { type: Boolean, required: true },
        history: [HistorySchema]
    },
    { timestamps: true }
);

const Cash = mongoose.model("Cash", CashSchema);

export default Cash;
