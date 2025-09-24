import express from "express";
import { GetCash, GetCashs, CreateCash, DeleteCash, AddCash, MinusCash } from "../controller/cashController.js";

const router = express.Router();

router.get('/:tailerId/:number', GetCash)
router.get('/:tailerId', GetCashs)
router.post('/createCash/:tailerId', CreateCash)
router.put('/addcash/:tailerId', AddCash)
router.put('/minusCash/:tailerId', MinusCash)
router.delete('/:tailerId/:number', DeleteCash)

export default  router;