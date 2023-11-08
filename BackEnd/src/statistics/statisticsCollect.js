import Products from '../models/products.js';

export const getRevenueStatistics = async (req, res) => {
  try {
    const products = await Products.find({ sold: { $gt: 0 } });
    let totalRevenue = 0;

    products.forEach((product) => {
      const revenue = product.sold * product.price;
      totalRevenue += revenue;
    });

    return res.status(200).json({
      message: "Thống kê doanh thu",
      totalRevenue,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};