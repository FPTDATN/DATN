import express  from "express";
import { create, getAll, getById } from "../controllers/products";

const router = express.Router();
router.get('/products',getAll)
router.get('/products/:id',getById)
router.post('/products',create)

export default router