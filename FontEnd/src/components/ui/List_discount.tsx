import React, { useEffect, useState } from 'react';
import { useApplyDiscountMutation, useGetDiscountsQuery } from '@/services/discount';
import { List, Card, Button, message } from 'antd';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { formartVND } from '@/utils/formartVND';
import { useSaveDiscountToAnotherMutation, useGetAllDiscountUsersQuery } from '@/services/discountuser';
import { useMeQuery } from "@/services/auth";

const List_discount = () => {
    
    const [selectedDiscounts, setSelectedDiscounts] = useState([]);
    const { data: discountsData, isLoading, isError } = useGetDiscountsQuery();
    const [applyDiscountMutation] = useApplyDiscountMutation();
    const [addedDiscounts, setAddedDiscounts] = useState([]);
    const [saveDiscountToAnotherMutation] = useSaveDiscountToAnotherMutation();
    const { data: saleItems } = useGetAllDiscountUsersQuery();
    const { data } = useMeQuery();

    const handleApplyDiscount = async (discountId) => {
        const result = await applyDiscountMutation(discountId);
        return result;
    };

    useEffect(() => {
        const savedDiscounts = localStorage.getItem('addedDiscounts');
        if (savedDiscounts) {
            setAddedDiscounts(JSON.parse(savedDiscounts));
        }
    }, []);

    const handleAddSale = async (discount) => {
        try {
            if (!data) {
                message.error('Đăng nhập mới thêm được mã giảm giá', { position: 'bottom-right' });
                return;
            }

            const existingDiscount = saleItems?.docs.find((item) => item.code === discount.code);
            if (!existingDiscount) {
                const confirmed = window.confirm(`Bạn có chắc muốn thêm mã giảm giá: ${discount.discount}% không?`);
                if (confirmed) {
                    await saveDiscountToAnotherMutation(discount._id);
                    setAddedDiscounts([...addedDiscounts, discount._id]);
                    setSelectedDiscounts([...selectedDiscounts, discount]);
                    const updatedDiscounts = discountsData?.docs.filter((item) => item._id !== discount._id);
                    localStorage.setItem('addedDiscounts', JSON.stringify([...addedDiscounts, discount._id]));
                    message.success(`Đã thêm mã giảm giá: ${discount.discount}%`, { position: 'bottom-right' });
                    return handleApplyDiscount(discount._id);
                }
            } else {
                message.error('Bạn đã lưu mã giảm giá này rồi!', { position: 'bottom-right' });
            }
        } catch (error) {
            console.error('Lỗi khi lưu mã giảm giá:', error);
            message.error('Có lỗi xảy ra khi lưu mã giảm giá!', { position: 'bottom-right' });
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching discounts</div>;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div>
            {discountsData ? (
                <div className='max-w-5xl px-2 lg:px-4 w-full mx-auto '>
                    <h2 className='text-2xl my-3'>Các mã giảm giá có trong của hàng </h2>
                    <List
                        grid={{ gutter: 16, column: 3 }}
                        dataSource={discountsData.docs}
                        renderItem={discount => (
                            <List.Item>
                                <Card title={`Giảm giá ${discount.discount}%`} extra={<Button
                                    className='text-primary bg-layer p-2 rounded-md my-2'
                                    onClick={() => { handleAddSale(discount); }}
                                    disabled={addedDiscounts.includes(discount._id)}
                                >
                                    {addedDiscounts.includes(discount._id) ? 'Đã lưu mã' : 'Thêm mã'}
                                </Button>}>
                                    <p>Đơn hàng tối thiểu: {formartVND(discount.maxAmount)}</p>
                                    <p>HSD: {formatDate(discount.startDate)}-{formatDate(discount.endDate)}</p>
                                </Card>
                            </List.Item>
                        )}
                    />
                </div>
            ) : (
                <div>404</div>
            )}
        </div>
    );
};

export default List_discount;
