import express from "express";
import { create, getAll, getById, remove } from "../controllers/products";

const router = express.Router();
router.get('/products', getAll)
router.get('/products/:id', getById)
router.delete('/products/:id', remove)
router.post('/products', create)

export default router