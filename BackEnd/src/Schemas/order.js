import Joi from "joi";

 export const orderSchema = Joi.object({
  orderNumber: Joi.string().required(),
  status: Joi.string().valid('Đang xử lý','Chờ xác nhận', 'Đã giao hàng', 'Đã hủy').default('Đang xử lý'),
  customerName: Joi.string().required(),
  customer: Joi.object({
    name: Joi.string(),
    address: Joi.string(),
    phoneNumber: Joi.string(),
    email: Joi.string().email(), 
  }),
  shippingAddress: Joi.string(),
  products: Joi.array().items(
    Joi.object({
      product: Joi.string(),
      quantity: Joi.number().integer().min(1), // Số lượng phải là số nguyên không âm
      name: Joi.string(),
      price: Joi.number()
    })
  ),
  buyers: Joi.array().items(
    Joi.object({
      buyer: Joi.string(),
      fullName: Joi.string()
    })
  ),
  
  createdAt: Joi.date().default(() => new Date()), // Thêm trường createdAt vào schema
  updatedAt: Joi.date().default(() => new Date()),
});
