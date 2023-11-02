import Joi from "joi";

export const orderSchema = Joi.object({
  orderNumber: Joi.string().required(),
  status: Joi.string().valid('Đang xử lý', 'Chờ xác nhận', 'Đã giao hàng', 'Đã hủy').default('Đang xử lý'),
  customerName: Joi.string().required(),
  email: Joi.string(),
  shippingAddress: Joi.string(),
  products: Joi.array(),
  totalAmount: Joi.number(),
  buyers: Joi.array().items({
    buyer: Joi.string(),
    fullName: Joi.string()
  }),
  createdAt: Joi.date().default(() => new Date()), // Thêm trường createdAt vào schema
  updatedAt: Joi.date().default(() => new Date()),
});
