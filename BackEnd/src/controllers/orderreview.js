import Ordercomments from '../models/orderreview.js'
import Auth from '../models/auth.js';
import Order from '../models/order.js';
import Product from '../models/products.js';


export const getOrderComments = async (_req, res) => {
    try {
        const ordercomment = await Ordercomments.find().populate(['userId']);

        if (ordercomment.length === 0) {
            return res.status(200).json(ordercomment);
        }

        return res.status(200).json(ordercomment);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const createOrderComment = async (req, res) => {
    const { userId, productId, orderId, text, rating, images, videos, status } = req.body;

    try {
        const existingUser = await Auth.findById(userId);

        if (!existingUser) return res.status(401).json({ message: 'Phải đăng nhập mới được bình luận' });

        const existingOrder = await Order.findById(orderId);

        if (!existingOrder) return res.status(400).json({ message: 'Không tìm thấy đơn hàng' });

        const existingProduct = await Product.findById(productId);

        if (!existingProduct) return res.status(400).json({ message: 'Không tìm thấy sản phẩm' });
        // const newComment = await Ordercomments.create({
        //     userId,
        //     orderId,
        //     text,
        //     productId,
        //     rating,
        //     images,
        //     videos,
        //     status
        //   });
        const newComments = [];
        const productIds = Array.isArray(productId) ? productId : [productId];
        productIds.forEach(async (productIds) => {
            const newComment = await Ordercomments.create({
                userId,
                orderId,
                text,
                productId: productIds,
                rating,
                images,
                videos,
                status
            });
            newComments.push(newComment._id);
        });
        // await Auth.findByIdAndUpdate(userId, {
        //     $addToSet: {
        //       ordercomment: newComment._id,
        //     },
        //   });
          
        //   await Order.findByIdAndUpdate(orderId, {
        //     $addToSet: {
        //       ordercomment: newComment._id,
        //     },
        //   });
        await Auth.findByIdAndUpdate(userId, {
            $addToSet: {
                ordercomment: { $each: newComments },
            },
        });

        await Order.findByIdAndUpdate(orderId, {
            $addToSet: {
                ordercomment: { $each: newComments },
            },
        });
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status: 5 },
            { new: true }
        );
        return res.status(200).json({
            message: 'Thêm bình luận thành công và cập nhật trạng thái của đơn hàng',
            newComment,
            updatedOrder,
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const updateOrderComment = async (req, res) => {

    const { id } = req.params;

    const { text, userId, productId, orderId, rating, images, videos } = req.body;

    try {
        const existingComment = await Ordercomments.findOne({ _id: id });

        const existingUser = await Auth.findOne({ _id: userId });

        const existingOrder = await Order.findOne({ _id: orderId });

        if (!existingUser) return res.status(401).json({ message: "Unauthorized" });

        if (!existingOrder) return res.status(400).json({ message: "Không tìm thấy đơn hàng " });

        if (!existingComment) return res.status(403).json({ message: "Không tìm thấy bình luận" });

        const existingProduct = await Product.findById(productId);

        if (!existingProduct) return res.status(400).json({ message: 'Không tìm thấy sản phẩm' });

        const newComment = await Ordercomments.findOneAndUpdate({ _id: id }, { userId, orderId, text, rating, images, videos }, { new: true })

        return res.status(201).json({ newComment, message: "Đánh giá sản phẩm thành công", })

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}

export const removeOrderComment = async (req, res) => {

    try {

        const { id } = req.params;

        const existingComment = await Ordercomments.findOneAndRemove({ _id: id });

        if (!existingComment) {
            return res.status(400).json({ message: "Không tìm thấy bình luận này" })
        }

        await Order.findOneAndUpdate({ ordercomment: id }, {
            $pull: {
                ordercomment: id
            }
        });
        await Auth.findOneAndUpdate({ ordercomment: id }, {
            $pull: {
                ordercomment: id
            }
        })

        return res.status(200).json({ message: "Bình luận đã được xóa" })

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}


export const getByIdOrderComment = async (req, res) => {
    const { id } = req.params;

    try {
        const ordercomment = await Ordercomments.findById(id).populate('userId', 'orderId');

        if (!ordercomment) {
            return res.status(404).json({ message: 'Không tìm thấy bình luận' });
        }

        return res.status(200).json(ordercomment);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};