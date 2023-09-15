import express from "express";
import { create, getAll, getById, remove, update } from "../controllers/products";

const router = express.Router();
router.get('/products', getAll)
router.get('/products/:id', getById)
router.delete('/products/:id', remove)
router.post('/products', create)
router.patch('/products/:id',update)

export default router