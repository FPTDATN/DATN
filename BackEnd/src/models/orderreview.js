import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
    {
        text: {
            type: String,
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'Auth',
            required: true,
        },
        orderId: {
            type: mongoose.Types.ObjectId,
            ref: 'Order',
            required: true,
        },
        parentOrderId: {
            type: mongoose.Types.ObjectId,
            required: false,
            ref: 'Comment',
            default: null
        },
        productId: {
            type: mongoose.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Ordercomments', commentSchema);
