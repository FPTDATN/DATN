import express from "express";
import {
  createCategory,
  getAllCategory,
  getByIdCategory,
  removeCategory,
  updateCategory,
} from "./../controllers/category";

const router = express.Router();

router.get("/category", getAllCategory);
router.get("/category/:id", getByIdCategory);
router.post("/category", createCategory);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", removeCategory);

export default router;
