import Order from "../models/order";

// Controller để tạo đơn hàng
export const createOrder = async (req, res) => {
  try {
    const { orderNumber, status, customerName, shippingAddress, product, buyer } = req.body;
    const newOrder = new Order({ orderNumber, status, customerName, shippingAddress, product, buyer });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Lỗi khi tạo đơn hàng:', error);
    res.status(400).json({ error: 'Không thể tạo đơn hàng' });
  }
};

// Controller để lấy danh sách đơn hàng
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng:', error);
    res.status(500).json({ error: 'Lỗi khi lấy danh sách đơn hàng' });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Tìm đơn hàng dựa trên orderId
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }
    // Cập nhật trạng thái của đơn hàng thành "Đã hủy"
    order.status = 'Đã hủy';

    // Lưu thay đổi vào cơ sở dữ liệu
    const updatedOrder = await order.save();

    return res.status(200).json({ message: 'Đơn hàng đã được hủy thành công', order: updatedOrder });
  } catch (error) {
    console.error('Lỗi khi hủy đơn hàng:', error);
    return res.status(500).json({ error: 'Lỗi server' });
  }
};