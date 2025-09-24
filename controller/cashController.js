import Cash from "../model/cash.js";

export const GetCash = async (req, res) => {
    try {
        const { tailerId, number } = req.params;
        if (!number) {
            return res.status(400).json({
                message: "Customer number is required",
                data: null,
            });
        }
        const cash = await Cash.findOne({
            Tailer: tailerId,
            number: number,
        });
        if (!cash) {
            return res.status(404).json({
                message: "No cash found for this number",
                data: null,
            });
        }
        return res.status(200).json({
            message: "customer cash histary fetched successfully",
            data: cash,
        });
    } catch (error) {
        return res.status(500).json({
            message: ["Internal Server Error", error.message],
            data: null,
        });
    }
};

export const GetCashs = async (req, res) => {
    try {
        const { tailerId } = req.params;
        const cash = await Cash.find({ Tailer: tailerId });
        if (!cash) {
            return res.status(404).json({
                message: "No cash record found",
                data: null,
            });
        }
        return res.status(200).json({
            message: "cash histry fetched successfully",
            data: cash,
        });
    } catch (error) {
        return res.status(500).json({
            message: ["Internal Server Error", error.message],
            data: null,
        });
    }
};

export const CreateCash = async (req, res) => {
    try {
        const { tailerId } = req.params;
        const { name, number } = req.body;
        if (!name || !number) {
            return res.status(400).json({
                message: "Missing required fields",
            });
        }
        const checkNumber = await Cash.findOne({ Tailer: tailerId, number })
        if (checkNumber) {
            return res.status(404).json({
                message: "number already in data",
            });
        }
        const newNash = new Cash({
            Tailer: tailerId, name, number, cash: 0, status: true, history: []
        });
        await newNash.save();
        return res.status(200).json({
            message: "cash create successfully",
            data: newNash,
        });
    } catch (error) {
        return res.status(500).json({
            message: ["Internal Server Error", error.message],
            data: null,
        });
    }
};

export const AddCash = async (req, res) => {
    try {
        const { tailerId } = req.params;
        const { name, number, amount, status, note } = req.body;
        if (!name || !number || !amount || !status) {
            return res.status(400).json({
                message: "Customer number and amount are required",
                data: null,
            });
        }
        const cash = await Cash.findOneAndUpdate(
            { Tailer: tailerId, number },
            {
                $inc: { cash: amount },
                $push: {
                    history: {
                        customerName: name,
                        customerNumber: number,
                        amount,
                        status,
                        note,
                    }
                }
            },
            { new: true }
        );
        if (!cash) {
            return res.status(404).json({
                message: "Customer not found",
                data: null,
            });
        }
        return res.status(200).json({
            message: "Cash added successfully",
            data: cash,
        });
    } catch (error) {
        return res.status(500).json({
            message: ["Internal Server Error", error.message],
            data: null,
        });
    }
};

export const MinusCash = async (req, res) => {
    try {
        const { tailerId } = req.params;
        const { name, number, amount, status, note } = req.body;
        if (!name || !number || !amount || !status) {
            return res.status(400).json({
                message: "Customer number and amount are required",
                data: null,
            });
        }
        const cash = await Cash.findOneAndUpdate(
            { Tailer: tailerId, number },
            {
                $inc: { cash: -amount },
                $push: {
                    history: {
                        customerName: name,
                        customerNumber: number,
                        amount,
                        status,
                        note,
                    }
                }
            },
            { new: true }
        );
        if (!cash) {
            return res.status(404).json({
                message: "Customer not found",
                data: null,
            });
        }
        return res.status(200).json({
            message: "Cash withdrawn successfully",
            data: cash,
        });
    } catch (error) {
        return res.status(500).json({
            message: ["Internal Server Error", error.message],
            data: null,
        });
    }
};

export const DeleteCash = async (req, res) => {
    try {
        const { tailerId, number } = req.params;
        const cash = await Cash.findOneAndDelete({ Tailer: tailerId, number });
        if (!cash) {
            return res.status(404).json({
                message: "No customer record found",
                data: null,
            });
        }
        return res.status(200).json({
            message: "Cash record deleted successfully",
            data: cash,
        });
    } catch (error) {
        return res.status(500).json({
            message: ["Internal Server Error", error.message],
            data: null,
        });
    }
};