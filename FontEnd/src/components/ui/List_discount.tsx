import { useEffect, useState } from 'react';
import { useGetDiscountsQuery, useApplyDiscountMutation } from '@/services/discount';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { toast } from 'react-toastify';
import { formartVND } from '@/utils/formartVND';

const List_discount = () => {
    const { data: discountsData, isLoading, isError } = useGetDiscountsQuery();
    const [selectedDiscounts, setSelectedDiscounts] = useState([]);

    const [applyDiscountMutation] = useApplyDiscountMutation();
    const addSale = async (discount) => {
        const confirmAdd = window.confirm('Bạn có muốn thêm  mã ưu đãi này vào danh sách đã chọn không?');
        if (confirmAdd) {
            try {
                const result = await applyDiscountMutation(discount._id);
                setSelectedDiscounts([...selectedDiscounts, discount]);
                toast.success(`Đã thêm ưu đãi: ${discount.discount}`, {
                    position: 'bottom-right',
                });
                return result
            } catch (error) {
                console.error('Lỗi khi áp dụng mã giảm giá:', error);
                toast.error('Có lỗi xảy ra khi thêm ưu đãi!', {
                    position: 'bottom-right',
                });
            }
        }
    };
    useEffect(() => {
        localStorage.setItem('selectedDiscounts', JSON.stringify(selectedDiscounts));
    }, [selectedDiscounts]);

    useEffect(() => {
        const storedSelectedDiscounts = localStorage.getItem('selectedDiscounts');
        if (storedSelectedDiscounts) {
            setSelectedDiscounts(JSON.parse(storedSelectedDiscounts));
        }
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error fetching discounts</div>;
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Chuyển đổi thành chuỗi ngày/tháng/năm
      };
    return (
        <div>
            {discountsData ? (
                <div className='max-w-5xl px-2 lg:px-4 w-full mx-auto '>
                    <div className=' flex justify-between'>
                    <h2 className='text-2xl my-3'>Các mã giảm giá có trong của hàng </h2>
                    <button className='bg-primary my-3'><a href="/">Sản phẩn </a></button>
                    </div>
                    
                    {discountsData.docs.length > 0 ? (
                        <div className='grid grid-cols-4 gap-5 rounded-md'>
                        {discountsData.docs.map((discount) => (
                            <div className='bg-green-500 rounded-md' key={discount._id}>
                                <button className='' onClick={() => addSale(discount)}>
                                    <p className='text-reds p-1'>Giá trị giảm giá: {discount.discount}%</p>
                                    <p className='text-xl'>Đơn hàng tối thiểu: {formartVND(discount.maxAmount)}</p>
                                    <p>HSD: {formatDate(discount.startDate)}-{formatDate(discount.endDate)}</p>
                                </button>
                            </div>
                        ))}
                    </div>
                    ) : (
                        <div>  Không có mã giảm giá </div>
                    )}
                </div>
            ) : (
                <div>404</div>
            )}
        </div>
    );
};
export default List_discount;
