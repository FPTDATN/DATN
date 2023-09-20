import express from "express";
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from "../controllers/products";
import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router();
router.get("/products", getAll);
router.get("/products/:id", getById);
router.delete("/products/:id", checkPermission, remove);
router.post("/products", checkPermission, create);
router.patch("/products/:id", checkPermission, update);

export default router;
