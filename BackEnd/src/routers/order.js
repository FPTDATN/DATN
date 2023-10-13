import express from 'express'
import { checkPermission } from "../middlewares/checkPermission.js";
import {  createOrder, getOrders, cancelOrder } from '../controllers/order.js';
const orderroute = express.Router();
orderroute.post('/order',createOrder)
orderroute.get('/order' ,getOrders)
orderroute.put('/order/:orderId/status',checkPermission ,cancelOrder)
export default orderroute