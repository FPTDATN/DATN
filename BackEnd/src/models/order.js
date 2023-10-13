import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  customerName: String,
  status: {
    type: String,
    enum: ['Đang xử lý','Chờ xác nhận', 'Đã giao hàng', 'Đã hủy'],
    default: 'Đang xử lý',
  },
  shippingAddress: String,
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: Number,
      name: String,
      price: Number 
    },
  ],
  buyers:[
    {
    buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auth', 
   },
   fullName: String,
  } ],
  totalAmount: {
    type: Number,
    required: true,
  },
  timestamps: {
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
});
orderSchema.plugin(mongoosePaginate);
export default mongoose.model('Order', orderSchema);
