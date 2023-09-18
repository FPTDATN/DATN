import Products from "../models/products";
import { productSchema } from "../Schemas/products";
import Category from "../models/category";

export const getAll = async (req, res) => {
  try {
    const products = await Products.find();
    return res.status(200).json({
      products,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const create = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }
    const products = await Products.create(req.body);
    //
    // Thêm ObjectId vào thuộc tính products trong model Category
    //
    await Category.findByIdAndUpdate(products.categoryId, {
      $addToSet: {
        product: products._id,
      },
    });
    if (products.length === 0) {
      return res.status(200).json({
        message: "Không thêm được sản phẩm",
      });
    }
    return res.json(products);
  } catch ({ errors }) {
    return res.status(500).json({
      message: errors,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const products = await Products.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).json({
      message: "Xóa sản phẩm thành công",
    });
  } catch (errors) {
    return res.status(500).json({
      message: errors,
    });
  }
};

export const getById = async (req, res) => {
  try {
    const products = await Products.findById(req.params.id);
    return res.status(200).json({
      products,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
export const update = async (req, res) => {
  try {
    const products = await Products.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (products.length === 0) {
      return res.status(200).json({
        message: "Cập nhật sản phẩm không thành công",
      });
    }
    return res.json(products);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
