import express from "express";
import { searchByNameAndDescription } from "../controllers/search";
const router = express.Router();
router.get('/products/search/pr',searchByNameAndDescription);
export default router