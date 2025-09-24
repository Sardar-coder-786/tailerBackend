import Tailer from '../model/tailer.js'

export const GetTailers = async (req, res) => {
    try {
        const tailer = await Tailer.find();
        if (tailer.length === 0) {
            return res.status(200).json({
                message: "No Tailer Found",
                data: null,
            });
        }
        return res.status(200).json({
            message: "Tailers fetched successfully",
            data: tailer,
        });
    } catch (error) {
        return res.status(500).json({
            message: ["Internal Server Error", error.message],
            data: null,
        });
    }
};

export const GetTailer = async (req, res) => {
    try {
        const { number } = req.params;
        const tailer = await Tailer.findOne({ number });
        res.status(200).json({
            message: 'Tailer fetched successfully',
            data: tailer
        });
    } catch (error) {
        return res.status(500).json({
            message: ["Internal Server Error", error.message],
            data: null,
        });
    }
};

export const CreateTailer = async (req, res) => {
    try {
        const { name, number, adress, shop, password } = req.body;
        if (!name || !number || !adress || !shop || !password) {
            return res.status(400).json({
                message: "Missing required fields",
                data: null,
            });
        }
        const checkNumber = await Tailer.findOne({ number })
        if (checkNumber) {
            return res.status(404).json({
                message: "number already in data",
            });
        }
        const tailer = new Tailer({ name, number, adress, shop, password });
        await tailer.save();
        return res.status(201).json({
            message: "Tailer created successfully",
            data: tailer,
        });
    } catch (error) {
        return res.status(500).json({
            message: ['Internal Server Error', error.message],
            data: null
        })
    }
};

export const Login = async (req, res) => {
    try {
        const { number, password } = req.body;

        if (!number || !password) {
            return res.status(400).json({
                message: "Number and Password required",
                data: null,
            });
        }
        const tailer = await Tailer.findOne({ number });

        if (!tailer) {
            return res.status(400).json({
                message: "Tailer not found",
                data: null,
            });
        }
        if (tailer.password !== password) {
            return res.status(400).json({
                message: "Wrong password",
                data: null,
            });
        }
        if (tailer.login === true) {
            return res.status(403).json({
                message: "Tailer already logged in on another device",
                data: null,
            });
        }

        const logedinTailer = await Tailer.findOneAndUpdate({ number }, { login: true }, { new: true }
        );

        return res.status(200).json({
            message: "Tailer logged in successfully",
            data: logedinTailer,
        });

    } catch (error) {
        return res.status(500).json({
            message: ['Internal Server Error', error.message],
            data: null
        });
    }
};

export const Logout = async (req, res) => {
    try {
        const { number } = req.params;
        if (!number) {
            return res.status(400).json({
                message: "number required fields",
            });
        }
        const tailer = await Tailer.findOne({ number });
        if (tailer?.login === false) {
            return res.status(403).json({
                message: "Tailer already logged out",
                data: null,
            });
        }
        const tailerOut = await Tailer.findOneAndUpdate({ number }, { login: false }, { new: true });
        if (!tailerOut) {
            return res.status(400).json({
                message: "Not loged out",
                data: null,
            });
        }
        return res.status(201).json({
            message: "Tailer loged out successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: ['Internal Server Error', error.message],
            data: null
        })
    }
};

export const UpdateTailer = async (req, res) => {
    try {
        const Tailernumber = req.params.number;
        const { name, number, adress, shop, password } = req.body;
        if (!name && !number && !adress && !shop && !password) {
            return res.status(400).json({
                message: "One field is min required",
                data: null,
            });
        }
        const tailer = await Tailer.findOneAndUpdate({ number: Tailernumber }, req.body, { new: true })
        return res.status(201).json({
            message: "Tailer updated successfully",
            data: tailer,
        });
    } catch (error) {
        return res.status(500).json({
            message: ['Internal Server Error', error.message],
            data: null
        })
    }
};

export const DeleteTailer = async (req, res) => {
    try {
        const { number } = req.params;

        if (!number) {
            return res.status(400).json({
                message: "TailerId is required",
                data: null,
            });
        }
        const tailer = await Tailer.findOneAndDelete({ number });
        if (!tailer) {
            return res.status(201).json({
                message: "Tailer not found",
                data: tailer,
            });
        }

        return res.status(201).json({
            message: "Tailer updated successfully",
            data: tailer,
        });

    } catch (error) {
        return res.status(500).json({
            message: ['Internal Server Error', error.message],
            data: null
        })
    }
};