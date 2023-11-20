import Order from "../models/order.js";



export const getRevenue = async (req, res) => {
  try {
    const orders = await Order.find();

    const totalRevenue = orders.reduce((total, order) => total + order.total, 0);

    return res.status(200).json({ totalRevenue });
  } catch (error) {
    console.error('Lỗi khi thống kê doanh thu:', error);
    return res.status(500).json({ error: 'Lỗi khi thống kê doanh thu' });
  }
};

export const getOrderStatistics = async (req, res) => {
  try {
    // Lấy số lượng đơn hàng
    const totalOrders = await Order.countDocuments();

    // Lấy số lượng đơn hàng theo trạng thái
    const statusCounts = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // Tính tổng số lượng đơn hàng theo trạng thái
    const orderStatistics = statusCounts.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    return res.status(200).json({
      totalOrders,
      orderStatistics,
    });
  } catch (error) {
    console.error('Lỗi khi lấy thống kê đơn hàng:', error);
    return res.status(500).json({ error: 'Lỗi khi lấy thống kê đơn hàng' });
  }
};