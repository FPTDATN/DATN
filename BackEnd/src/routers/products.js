import express from "express";
import {
  create,
  getAll,
  getById,
  getQuanlityProduct,
  remove,
  update,
} from "../controllers/products.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const router = express.Router();
router.get("/products", getAll);
router.get("/products/quanlity", getQuanlityProduct);

router.get("/products/:id", getById);
router.delete("/products/:id", checkPermission, remove);
router.post("/products", checkPermission, create);
router.patch("/products/:id", checkPermission, update);

export default router;
