import express from "express"
import mongoose from "mongoose"
import productsRouter from "../src/routers/products"

const app = express();
app.use(express.json());
app.use('/api',productsRouter)



mongoose.connect("mongodb://127.0.0.1:27017/DATN")
export const viteNodeApp = app;
