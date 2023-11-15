import Joi from "joi";

export const orderSchema = Joi.object({
  orderNumber: Joi.string(),
  status: Joi.number(),
  customerName: Joi.string().required(),
  email: Joi.string(),
  customerPhone: Joi.number(),
  shippingAddress: Joi.string(),
  products: Joi.array(),
  totalAmount: Joi.number(),
  buyer: Joi.string().required(),
  createdAt: Joi.date().default(() => new Date()), // Thêm trường createdAt vào schema
  updatedAt: Joi.date().default(() => new Date()),
  payMethod: Joi.number()
});
