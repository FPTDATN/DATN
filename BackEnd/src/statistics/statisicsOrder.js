import Order from "../models/order.js";

export const getRevenueByMonth = async (req, res) => {
    try {
      // Lấy danh sách đơn hàng từ cơ sở dữ liệu
      const data = await Order.find();
  
      // Tính tổng doanh thu từ danh sách đơn hàng
      let totalRevenue = 0;
      data.forEach((order) => {
        totalRevenue += order.totalAmount;
      });
  
      // Trả về kết quả thống kê doanh thu
      res.status(200).json({ totalRevenue });
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      res.status(500).json({ error: "Lỗi khi lấy danh sách đơn hàng" });
    }
  };