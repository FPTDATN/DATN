import express from 'express'
import { cancelOrder, createOrder, getOrders } from '../controllers/order';
const orderroute = express.Router();
orderroute.post('/orders',createOrder)
orderroute.get('/orders',getOrders)
orderroute.delete('/orders/:orderId',cancelOrder)
export default orderroute