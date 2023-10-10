import express from "express";
import mongoose from "mongoose";
import productsRouter from "./routers/products.js";
import authRouter from "./routers/auth.js";
import categoryRouter from "./routers/category.js";
import searchRouter from "./routers/search.js";
import commentRouter from './routers/comments.js'
import user from "./routers/user.js";
import favourite from "./routers/favourite.js";

import orderroute from "./routers/order.js";
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

const PORT = 8080;

mongoose.connect("mongodb://127.0.0.1:27017/DATN");

app.listen(PORT, () => {
    console.log(`server is running: http://localhost:${PORT}`);
});
