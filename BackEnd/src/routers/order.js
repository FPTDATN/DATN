import express from 'express'
import { checkPermission } from "../middlewares/checkPermission.js";
import {  createOrder, getOrders, cancelOrder } from '../controllers/order.js';
import { getOrderStatistics, getRevenue, getRevenueByDay } from '../statistics/statisticsOrder.js';
import { stripePay } from '../controllers/pay.js';
const orderroute = express.Router();
orderroute.post('/order',createOrder)
orderroute.get('/order' ,getOrders)
orderroute.put('/order/:orderId/status',cancelOrder)
orderroute.get('/orders',getRevenue)
orderroute.get('/order/statistics',getOrderStatistics)
orderroute.get('/revenue-by-day', getRevenueByDay);

orderroute.post('/create-checkout-session', stripePay)

export default orderroute