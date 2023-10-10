import express from "express";
import { create, getAll, getById, remove, updata } from "../controllers/brand.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const router = express.Router()
router.get('/brand',checkPermission,getAll)
router.get('/brand/:id',checkPermission,getById)
router.post('/brand',checkPermission,create)
router.put('/brand/:id',checkPermission,updata)
router.delete('/brand/:id',checkPermission,remove)
export default router