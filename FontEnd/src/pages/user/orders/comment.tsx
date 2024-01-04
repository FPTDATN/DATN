import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Rate, Spin, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAddOrderCommentMutation } from '@/services/ordercomments';
import { useMeQuery } from '@/services/auth';
import { useGetOrderByIdQuery } from '@/services/order'; // Import the query to get order details
import UploadFileServer from '@/components/uploads/up';
import UploadVideoServer from '@/components/uploads/video';

const OrderBinhluan: React.FC<{ orderId: string;  handleUpdateProduct: () => void }> = ({
    orderId,

}) => {
    const [addComment, { data: commentData, isLoading }] = useAddOrderCommentMutation();
    const navigate = useNavigate();
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState();
    const router = useNavigate();
    const { data: authData } = useMeQuery();
    const { data: orderData } = useGetOrderByIdQuery(orderId);
    const [images, setImages] = useState<string[]>([]);
    const [videos, setVideos] = useState<string[]>([]);
    const [ratingValue] = useState();
 
    const [feedback, setFeedback] = useState(() => {
        const storedFeedback = localStorage.getItem('feedback');
        return storedFeedback !== null ? storedFeedback : '';
    });

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    const handleRatingChange = (value: any) => {
        setRating(value);
        switch (value) {
            case 1:
                setFeedback('Tệ');
                break;
            case 2:
                setFeedback('Không hài lòng');
                break;
            case 3:
                setFeedback('Bình thường');
                break;
            case 4:
                setFeedback('Hài lòng');
                break;
            case 5:
                setFeedback('Tuyệt vời');
                break;
            default:
                setFeedback('');
        }
    };

    const handleSubmit = async () => {
        if (comment.trim() === '') {
            console.error('Comment text is required');
            return;
        }
        if (!authData) {
            return router('/account/signin');
        }

        try {
            const productIds = orderData?.products?.map((product) => product._id) || [];

            await addComment({
                text: comment,
                rating: rating,
                userId: authData?._id,
                orderId: orderId,
                productId: productIds,
                images: images,
                videos:videos,
                status: 5,
            });
           
            setComment('');
            alert('Bình luận của bạn đã được gửi thành công.');
            window.location.reload();
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    };

    useEffect(() => {
        if (commentData) {
            notification.success({
                message: 'Thành công',
                description: 'Bình luận của bạn đã được gửi thành công.',
            });
            setComment('');
         
        }
    }, [commentData]);

    return (
        <Spin spinning={isLoading}>
            <div className="max-w-5xl mx-auto bg-white  py-4 mt-3">
                <div className="px-4 py-2">
                    <div className="text-xl">Đánh giá </div>
                    <div className="container mx-auto py-8">
                        <div className="flex">
                            <div className="w-1/2 pl-6 border-l">
                                <Form name="review_form" initialValues={{ rating: rating }}>
                                    <Form.Item
                                        name="rating"
                                        label="Chất lượng sản phẩm"
                                        rules={[{ required: true, message: 'Vui lòng đánh giá sản phẩm!' }]}
                                    >
                                        <div className="flex">
                                            <Rate allowHalf value={ratingValue} onChange={handleRatingChange} />
                                            <p className="px-1 text-amber-400">{feedback}</p>
                                        </div>
                                    </Form.Item>
                                    <Form.Item
                                        name="text"
                                        label="Đánh giá chi tiết"
                                        rules={[{ required: true, message: 'Vui lòng nhập đánh giá chi tiết!' }]}
                                    >
                                        <Input.TextArea rows={4} placeholder="Để lại đánh giá" onChange={handleCommentChange} />
                                    </Form.Item>
                                    <Form.Item label="Thêm ảnh" >
                                        <UploadFileServer setImages={setImages} />
                                    </Form.Item>
                                    <Form.Item label="Thêm video" >
                                        <UploadVideoServer setVideos={setVideos} />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button disabled={images.length === 0} onClick={handleSubmit} loading={isLoading}>
                                            {isLoading ? 'Đang gửi...' : 'Gửi đánh giá'}
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Spin>
    );
};

export default OrderBinhluan;
