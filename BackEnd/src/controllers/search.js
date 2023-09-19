import Product from "../models/products";
export const searchByNameAndDescription = async (req, res) => {
      try {
          const { keyword } = req.query; // Lấy từ khóa từ query parameter trong URL
          const products = await Product.find({
              $or: [
                  { name: { $regex: keyword, $options: 'i' } }, // Tìm kiếm theo tên
                  { description: { $regex: keyword, $options: 'i' } } // Tìm kiếm theo mô tả
              ]
          });
  
          if (!products || products.length === 0) {
              return res.status(404).json({
                  message: "Không tìm thấy sản phẩm với từ khóa này"
              });
          }
  
          return res.status(200).json({
              products
          });
      } catch (error) {
          return res.status(500).json({
              message: error.message
          });
      }
  };