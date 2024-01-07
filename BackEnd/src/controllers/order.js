import { orderSchema } from "../Schemas/order.js";
import Order from "../models/order.js";
import shortid from 'shortid';
import Discount from "../models/discount.js";
import { senderMail } from "../utils/senderMail.js";
import TimeLine from "../models/timeline.js";

export const createOrder = async (req, res) => {
  try {
    const { error } = orderSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const orderNumber = shortid.generate();

    const { status, fullName, shipping, products, userId, phone, payMethod, total, email, isPaid, discountCode } = req.body;

    let discountAmount = 0;

    // Kiểm tra xem người dùng đã nhập mã giảm giá hay không
    if (discountCode !== undefined) {
      const now = new Date();
      const appliedDiscount = await Discount.findOne({ code: discountCode });

      if (
        appliedDiscount &&
        appliedDiscount.count > 0 &&
        now >= appliedDiscount.startDate &&
        now <= appliedDiscount.endDate &&
        total >= appliedDiscount.maxAmount
      ) {
        const userUsedDiscount = appliedDiscount.usedBy.find((user) => user.userId.toString() === userId);

        if (userUsedDiscount && userUsedDiscount.used) {
          return res.status(400).json({ error: 'Bạn đã sử dụng mã giảm giá này trước đó' });
        }

        discountAmount = total * (appliedDiscount.discount / 100);
        appliedDiscount.count -= 1;

        if (userUsedDiscount) {
          userUsedDiscount.used = true;
        } else {
          appliedDiscount.usedBy.push({ userId, used: true });
        }

        await appliedDiscount.save();
      }
    }

    const newOrder = new Order({
      orderNumber,
      isPaid,
      status,
      fullName,
      shipping,
      products,
      total: total - discountAmount,
      phone,
      payMethod,
      email,
      userId,
      discountCode,
      discountAmount,
    });

    const savedOrder = await newOrder.save();
    return res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Lỗi khi tạo đơn hàng:', error);
    return res.status(500).json({ error: 'Không thể tạo đơn hàng' });
  }
};



// Controller để lấy danh sách đơn hàng
export const getOrders = async (req, res) => {
  const {
    _limit = 20,
    _sort = "createdAt",
    _order = "asc",
    _page = 1,
    startDate,
    endDate,
  } = req.query;

  const options = {
    limit: parseInt(_limit),
    page: parseInt(_page),
    sort: {
      ['createdAt']: -1
    },
  };
  const filter = {};
  if (startDate && endDate) {
    filter.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }
  try {
    const data = await Order.paginate(filter, options);

    if (data.docs.length === 0) {
      return res.status(200).json({
        message: "Không có dữ liệu",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng:', error);
    res.status(500).json({ error: 'Lỗi khi lấy danh sách đơn hàng' });
  }
};


export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, isPaid } = req.body;

    // Tìm đơn hàng dựa trên orderId
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    // Kiểm tra xem trạng thái mới cung cấp hợp lệ hay không
    // if (!['Đang xử lý', 'Chờ xác nhận', 'Đã giao hàng', 'Đã hủy'].includes(status)) {
    //   return res.status(400).json({ message: 'Trạng thái mới không hợp lệ' });
    // }

    // Cập nhật trạng thái của đơn hàng thành trạng thái mới
    const newSatus = await Order.updateOne({ _id: orderId }, { status, isPaid }, { new: true })

    // html
    let items = order.products.map((product, index) => (
      `<tr key="${index}">
      <td style="border:1px solid #ccc; padding:6px 12px;">
          <img width="60" height="60" src="${product.images[0]}" alt="${product.name}"/>
      </td>
      <td style="border:1px solid #ccc; padding:6px 12px;">
          ${product.name} x <b>${product.quantity}</b>
      </td>
      <td style="border:1px solid #ccc; padding:6px 12px;">
          ${product.color}
      </td>
      <td style="border:1px solid #ccc; padding:6px 12px;">
          ${product.size}
      </td>
      <td style="border:1px solid #ccc; padding:6px 12px;">
          ${product.price * product.quantity} VND
      </td>
  </tr>`
    )).join('')

    let htmlOrders = `
      <section>
          <div>
              <div>
                  <p>
                      <b>Hóa đơn</b> : #${order.orderNumber}
                  </p>
                  <p>
                      <b>Ngày tạo </b>: ${order?.createdAt?.toLocaleDateString()}
                  </p>
                  <p>
                      <b>Tên khách hàng </b>: ${order.fullName}
                  </p>
                  <p>
                      <b>Địa chỉ </b>: ${order.shipping}
                  </p>
                  <p>
                      <b>Số điện thoại </b>: 0${order.phone}
                  </p>
              </div>

              <br />

              <div>
                  <table>
                      <thead>
                          <tr>
                              <th style="border:1px solid #ccc; padding: 6px 12px;"></th>
                              <th style="border:1px solid #ccc; padding: 6px 12px;">
                                  Sản phẩm
                              </th>
                              <th style="border:1px solid #ccc; padding: 6px 12px;">Màu</th>
                              <th style="border:1px solid #ccc; padding: 6px 12px;">Size</th>
                              <th style="border:1px solid #ccc; padding: 6px 12px;">Giá</th>
                          </tr>
                      </thead>
                      <tbody>
                          ${items}
                      </tbody>
                  </table>

                  <br />

                  <div>
                      <div>
                          <table>
                              <tbody>
                                  <tr>
                                      <td>Tổng giá:</td>
                                      <b>${order.total} VND</b>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>

              <br />

              <div>
                  <b>
                      <h2>Thank you, happy shopping again</h2>
                  </b>
              </div>
          </div>
      </section>`

    // Lưu thay đổi vào cơ sở dữ liệu

    let confirm = `
      <div>
        <h3>Shop A-Shirt thông báo:</h3>
        
        <h1 style="font-weight:500;">Đơn hàng của bạn đã được xác nhận.</h1>
        
        <b>Cảm ơn quý khách đã ủng hộ</b>
      </div>
    `
    let cancelled = `
      <div>
        <h3>Shop A-Shirt thông báo:</h3>
       
        <h1 style="font-weight:500;">Đơn hàng của bạn đã được hủy theo yêu cầu.</h1>
        
        <b>Cảm ơn quý khách đã ủng hộ</b>
      </div>
    `

    if (status === 1) {
      await senderMail(order.email, htmlOrders)
      await TimeLine.create({
        orderId: order._id,
        status: 1,
      })
    } else if (status === 2) {
      await senderMail(order.email, confirm)
      await TimeLine.create({
        orderId: order._id,
        status: 2,
      })
    } else if (status === 0) {
      await senderMail(order.email, cancelled)
      await TimeLine.create({
        orderId: order._id,
        status: 0,
      })
    }

    return res.status(200).json({ message: 'Cập nhật trạng thái thành công', order: newSatus });
  } catch (error) {
    console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
    return res.status(500).json({ error: error.message });
  }
};
export const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    return res.json(order);
  } catch (error) {
    console.error('Lỗi khi lấy đơn hàng theo ID:', error);
    return res.status(500).json({ error: 'Lỗi khi lấy đơn hàng' });
  }
};
export const returnOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, isPaid, LydoHoandon, Motahoandon, Emaill, products } = req.body;


    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        $set: {
          status,
          isPaid,
          LydoHoandon,
          Motahoandon,
          Emaill,
          products
        },
      },
      { new: true }
    );

    return res.status(200).json({
      message: 'Cập nhật trạng thái hoàn hàng và thông tin thành công',
      order: updatedOrder,
    });
  } catch (error) {
    console.error('Lỗi khi cập nhật trạng thái hoàn hàng và thông tin:', error);
    return res.status(500).json({ error: error.message });
  }
};

export const applyDiscountCodeOrder = async (req, res) => {
  const { orderId, discountCode } = req.params;
  console.log('Discount Code:', discountCode);
  console.log('Order ID:', orderId);

  try {
    // Kiểm tra xem mã giảm giá có tồn tại không
    const existingDiscountCode = await Discount.findById(discountCode);

    if (!existingDiscountCode) {
      return res.status(400).json({ message: 'Mã giảm giá không tồn tại hoặc không hợp lệ' });
    }

    // Lấy thông tin đơn hàng
    const existingOrder = await Order.findById(orderId);
    if (!existingOrder) {
      return res.status(400).json({ message: 'Đơn hàng không tồn tại' });
    }

    // Áp dụng mã giảm giá và cập nhật đơn hàng
    existingOrder.discountCode = discountCode;
    existingOrder.totalAmount -= existingDiscountCode.amount; // Giả sử giảm giá trực tiếp từ tổng tiền

    // Lưu đơn hàng đã cập nhật
    const updatedOrder = await existingOrder.save();

    return res.status(200).json({ updatedOrder, message: 'Mã giảm giá đã được áp dụng thành công' });
  } catch (error) {
    console.error('Error:', error); // Log the detailed error
    return res.status(500).json({
      message: 'Có lỗi xảy ra khi xử lý mã giảm giá',
    });
  }
}

export const timeLineOrder = async (req, res) => {

  try {

    const timelines = await TimeLine.find().populate('orderId')

    if (timelines.length === 0) {
      return res.status(201).json({ message: 'Trống' })
    }

    return res.status(200).json(timelines)

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

}
