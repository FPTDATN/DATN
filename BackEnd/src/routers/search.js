import express from "express";
import { searchByNameAndDescription, searchUserByNameAndEmail } from "../controllers/search";
const router = express.Router();
router.get('/products/search/pr',searchByNameAndDescription);
router.get('/User/search/n',searchUserByNameAndEmail);
export default router