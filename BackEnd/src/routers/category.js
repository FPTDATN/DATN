import express from "express";
import {
  createCategory,
  getAllCategory,
  getByIdCategory,
  removeCategory,
  updateCategory,
} from "./../controllers/category.js";
import { checkPermission } from "../middlewares/checkPermission.js";
const router = express.Router();

router.get("/category", checkPermission, getAllCategory);
router.get("/category/:id", getByIdCategory);
router.post("/category", checkPermission, createCategory);
router.put("/category/:id", checkPermission, updateCategory);
router.delete("/category/:id", checkPermission, removeCategory);

export default router;
