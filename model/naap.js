import mongoose from "mongoose";

const NaapSchema = new mongoose.Schema(
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
            unique: true,
            required: true
        },
        siryalNumber: {
            type: String,
            required: true
        },
        kandha: {
            type: String,
            required: true
        },
        lambai: {
            type: String,
        },
        bazo: {
            type: String,
            required: true
        },
        terah: {
            type: String,
            required: true
        },
        ghala: {
            type: String,
            required: true
        },
        kamar: {
            type: String,
            required: true
        },
        daman: {
            type: String,
        },
        shalwar: {
            type: String,
            required: true
        },
        panchah: {
            type: String,
            required: true
        },
        gheer: {
            type: String,
            required: true
        },
        pajmah: {
            type: String,
        },
        torzar: {
            type: String,
            required: true
        },
        farDaman: {
            type: String,
        },
        farBazo: {
            type: String,
        },
        farSaiz: {
            type: String,
        },
        farGhala: {
            type: String,
        },
        farFrontPokect: {
            type: String,
        },
        farSidePokect: {
            type: String,
        },
        farShalwarPokect: {
            type: String,
        },
        farmash: {
            type: String,
        },
        note: {
            type: String,
            default: 'eid se aik manh pehly booking band hu gi'
        },
        farmasharea: {
            type: String,
        },
    },
    { timestamps: true }
);

const Naap = mongoose.model('Naap', NaapSchema);

export default Naap;