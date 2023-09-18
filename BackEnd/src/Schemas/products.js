import joi from "joi";

export const productSchema = joi.object({
  name: joi.string().required("name là trương dữ liệu bắt buộc"),
  price: joi.number().required("price là trường dữ liệu bắt buộc"),
  sale_off: joi.number(),
  description: joi.string().required("Description là trường bắt buộc"),
  quantity: joi.number().required("Quantity không được để trống"),
  color: joi.string().required("Color không được để trống"),
  size: joi.number().min(3).required("Size không dduocj để trống"),
  images: joi.string().required("Images không được bỏ trống"),
  categoryId: joi.string().required("categoryId là trường dữ liệu bắt buộc"),
});
