import express from "express";
import { create, getAll, getById, remove, updata } from "../controllers/size.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const router = express.Router()
router.get('/size',getAll)
router.get('/size/:id',getById)
router.post('/size',checkPermission,create)
router.put('/size/:id',checkPermission,updata)
router.delete('/size/:id',checkPermission,remove)

export default router