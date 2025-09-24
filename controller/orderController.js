import Order from '../model/order.js';

export const GetOrders = async (req, res) => {
    try {
        const { tailerId } = req.params;
        const order = await Order.find({ Tailer: tailerId });
        if (order.length === 0) {
            return res.status(200).json({
                message: "No order Found",
                data: null,
            });
        }
        return res.status(200).json({
            message: "order fetched successfully",
            data: order,
        });
    } catch (error) {
        return res.status(500).json({
            message: ["Internal Server Error", error.message],
            data: null,
        });
    }
};

export const CreateOrder = async (req, res) => {
    try {
        const { tailerId } = req.params;
        const { name, number, siryalNumber, totalsuit, suittype, sendingDate, sendingDay } = req.body;
        if (!tailerId || !name || !number || !siryalNumber || !sendingDate || !sendingDay || !totalsuit || !suittype) {
            return res.status(400).json({
                message: "Missing required fields",
                data: null,
            });
        }
        const order = new Order({ Tailer: tailerId, name, number, siryalNumber, totalsuit, suittype, sendingDate, sendingDay });
        await order.save();
        return res.status(201).json({
            message: "order placed successfully",
            data: order,
        });
    } catch (error) {
        return res.status(500).json({
            message: ['Internal Server Error', error.message],
            data: null
        })
    }
};

export const DeleteOrder = async (req, res) => {
    try {
        const { tailerId, siryalNumber } = req.params;
        if (!siryalNumber) {
            return res.status(400).json({
                message: "siryalNumber required fields",
                data: null,
            });
        }
        const order = await Order.findOneAndDelete({ Tailer: tailerId, siryalNumber: String(siryalNumber).trim() });
        if (!order) {
            return res.status(400).json({
                message: "siryalNumber is not found",
                data: null,
            });
        }
        return res.status(201).json({
            message: "order Delete successfully",
            data: order,
        });
    } catch (error) {
        return res.status(500).json({
            message: ['Internal Server Error', error.message],
            data: null
        })
    }
};