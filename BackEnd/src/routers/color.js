import express from "express";
import { create, getAll, getById, remove, updata } from "../controllers/color.js";
import { checkPermission } from "../middlewares/checkPermission.js";


const router = express.Router();
router.get('/color',getAll)
router.get('/color/:id',getById)
router.post('/color',checkPermission,create)
router.put('/color/:id',checkPermission,updata)
router.delete('/color/:id',checkPermission,remove)


export default router