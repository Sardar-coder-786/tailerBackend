import Tailer from '../model/tailer.js'
import Naap from '../model/naap.js'


export const GetNaap = async (req, res) => {
    try {
        const { tailerId, number } = req.params;
        if (!number) {
            return res.status(400).json({
                message: "Customer number is required",
                data: null,
            });
        }
        const naap = await Naap.findOne({
            Tailer: tailerId,
            number: number,
        });
        if (!naap) {
            return res.status(404).json({
                message: "No customer naap found for this number",
                data: null,
            });
        }
        return res.status(200).json({
            message: "Naap fetched successfully",
            data: naap,
        });
    } catch (error) {
        return res.status(500).json({
            message: ["Internal Server Error", error.message],
            data: null,
        });
    }
};

export const GetNaapsByTailer = async (req, res) => {
    try {
        const { tailerId } = req.params;
        const naaps = await Naap.find({ Tailer: tailerId });
        res.status(200).json({
            message: 'Naaps fetched successfully',
            data: naaps
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

export const CreateNaap = async (req, res) => {
    try {
        const { tailerId } = req.params;
        const { name, number, siryalNumber, kandha, lambai, bazo, terah, ghala, kamar, daman, shalwar, panchah, gheer, pajmah, torzar, farDaman, farBazo, farSaiz, farGhala, farFrontPokect, farSidePokect, farShalwarPokect, farmash, note, farmasharea } = req.body;

        if (!tailerId || !name || !number || !siryalNumber || !kandha || !bazo || !terah || !ghala || !kamar || !shalwar || !panchah || !gheer || !torzar) {
            return res.status(400).json({
                message: "Missing required fields",
                data: null,
            });
        }
        const checktailer = await Tailer.findOne({ _id: tailerId })
        if (!checktailer) {
            return res.status(404).json({
                message: "Tailer not found",
            });
        }
        const naap = new Naap({ Tailer: tailerId, name, number, siryalNumber, kandha, lambai, bazo, terah, ghala, kamar, daman, shalwar, panchah, gheer, pajmah, torzar, farDaman, farBazo, farSaiz, farGhala, farFrontPokect, farSidePokect, farShalwarPokect, farmash, note, farmasharea });
        await naap.save();

        await Tailer.findByIdAndUpdate(tailerId, {
            $inc: { totalNaap: 1 }
        });
        return res.status(201).json({
            message: "Naap created successfully",
            data: naap,
        });
    } catch (error) {
        return res.status(500).json({
            message: ['Internal Server Error', error.message],
            data: null
        })
    }
};

export const UpdateNaap = async (req, res) => {
    try {
        const { tailerId, snumber } = req.params;
        if (!snumber) {
            return res.status(400).json({
                message: "number is required",
                data: null,
            });
        }
        
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "At least one field is required to update",
                data: null,
            });
        }

        const naap = await Naap.findOneAndUpdate({ Tailer: tailerId, number: snumber }, req.body, { new: true });
        if (!naap) {
            return res.status(404).json({
                message: "Naap not found",
            });
        }
        return res.status(201).json({
            message: "Naap updated successfully",
            data: naap,
        });

    } catch (error) {
        return res.status(500).json({
            message: ['Internal Server Error', error.message],
            data: null
        })
    }
};

export const DeleteNaap = async (req, res) => {
    try {
        const { tailerId, number } = req.params;

        if (!number) {
            return res.status(400).json({
                message: "number is required",
                data: null,
            });
        }
        const naap = await Naap.findOneAndDelete({ Tailer: tailerId, number });
        if (!naap) {
            return res.status(201).json({
                message: "naap not found",
            });
        }

        await Tailer.findByIdAndUpdate(tailerId, {
            $inc: { totalNaap: -1 }
        });

        return res.status(201).json({
            message: "Naap updated successfully",
            data: naap,
        });

    } catch (error) {
        return res.status(500).json({
            message: ['Internal Server Error', error.message],
            data: null
        })
    }
};