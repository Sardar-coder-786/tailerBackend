import express from "express";
import { GetNaap, GetNaapsByTailer, CreateNaap, UpdateNaap, DeleteNaap } from "../controller/naapController.js";

const router = express.Router();

router.get('/:tailerId', GetNaapsByTailer)
router.post('/createNaap/:tailerId', CreateNaap)
router.put('/updateNaap/:tailerId/:snumber', UpdateNaap)
router.delete('/deleteNaap/:tailerId/:number', DeleteNaap)

export default  router;