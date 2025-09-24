import express, { json } from "express";
import dotenv from "dotenv"
import morgan from "morgan";
import cors from "cors";
import { dbConnect } from "./config/dpConnect.js";
import TailerRotutes from "./route/tailerRoutes.js";
import NaapRoutes from "./route/naapRoutes.js";
import CashRoutes from "./route/cashRoutes.js";
import Order from "./route/orderRoutes.js";

dotenv.config();
dbConnect();
const app = express();

app.use(json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/tailer', TailerRotutes);
app.use('/api/naap', NaapRoutes);
app.use('/api/cash', CashRoutes);
app.use('/api/order', Order);

app.listen(process.env.PORT,process.env.HOST, () => {
    console.log(`Your Server Runing on http://${process.env.HOST}:${process.env.PORT||5001}`);
})