import express from "express";
import { GetOrders,CreateOrder, DeleteOrder } from "../controller/orderController.js";

const router = express.Router();

router.get('/:tailerId', GetOrders)
router.post('/createOrder/:tailerId', CreateOrder)
router.delete('/:tailerId/:siryalNumber', DeleteOrder)

export default  router;
