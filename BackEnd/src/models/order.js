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
    type: Number,
    // enum: ['Đang xử lý', 'Chờ xác nhận', 'Đã giao hàng', 'Đã hủy'],
    default: 0,
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
  payMethod: {
    type: Number,
    default: 0,
    // Phương thức thanh toán
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auth',
  },
  customerPhone: Number,
  totalAmount: {
    type: Number,
    required: true,
  },
  intent_id: {
    type: String,
    unique: true,
    default: null,
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
