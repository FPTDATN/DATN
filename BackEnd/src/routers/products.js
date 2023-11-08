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
import { getRevenueStatistics } from "../statistics/statisticsCollect.js";

const router = express.Router();
router.get("/products", getAll);
router.get("/products/quanlity", getQuanlityProduct);

router.get("/products/:id", getById);
router.delete("/products/:id", remove);
router.post("/products", create);
router.patch("/products/:id", update);
router.get("/products/revenue-statistics", getRevenueStatistics);
export default router;
