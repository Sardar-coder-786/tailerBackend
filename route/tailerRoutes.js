import express from "express";
import { GetTailers, GetTailer, CreateTailer, Login, UpdateTailer, DeleteTailer, Logout } from "../controller/tailerController.js";

const router = express.Router();

router.get('/tailers', GetTailers)
router.get('/:number', GetTailer)
router.post('/createtailer', CreateTailer)
router.post('/login', Login)
router.post('/logout/:number', Logout)
router.put('/updateTailer/:number', UpdateTailer)
router.delete('/deleteTailer/:number', DeleteTailer)

export default  router;