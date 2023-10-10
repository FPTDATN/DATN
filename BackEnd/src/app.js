import express from "express";
import mongoose from "mongoose";
import productsRouter from "../src/routers/products";
import authRouter from "../src/routers/auth";
import categoryRouter from "../src/routers/category";
import searchRouter from "../src/routers/search";
import commentRouter from '../src/routers/comments'
import user from "../src/routers/user";
import favourite from "../src/routers/favourite";

import orderroute from "./routers/order";
import cookieParser from "cookie-parser"
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(cookieParser())
app.use("/api", productsRouter);
app.use("/api", authRouter);
app.use("/api", categoryRouter);
app.use("/api", searchRouter);
app.use("/api", user);
app.use('/api', commentRouter);
app.use('/api', favourite);

app.use('/api', orderroute );


mongoose.connect("mongodb://127.0.0.1:27017/DATN");
export const viteNodeApp = app;
