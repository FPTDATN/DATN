import Order from "../models/order.js";



export const getRevenue = async (req, res) => {
  try {
    // Lấy danh sách đơn hàng
    const orders = await Order.find();

    // Tính tổng doanh thu
    const totalRevenue = orders.reduce((total, order) => total + order.total, 0);

    // Gửi kết quả về cho client
    return res.status(200).json({ totalRevenue });
  } catch (error) {
    console.error('Lỗi khi thống kê doanh thu:', error);
    return res.status(500).json({ error: 'Lỗi khi thống kê doanh thu' });
  }
};