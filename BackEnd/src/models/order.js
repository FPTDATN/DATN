import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
      orderNumber: {
            type: String,
            required: true,
          },
          status: {
            type: String,
            enum: ['Đang xử lý', 'Đã giao hàng', 'Đã hủy'],
            default: 'Đang xử lý',
          },
          customerName: String,
          shippingAddress: String,
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', 
          },
          buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Auth', 
          },
          createdAt: {
            type: Date,
            default: Date.now, 
          },
          updatedAt: {
            type: Date,
            default: Date.now, 
          },
    });
   export default  mongoose.model('Order', orderSchema);