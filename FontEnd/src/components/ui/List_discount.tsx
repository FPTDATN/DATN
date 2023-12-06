import { useEffect, useState } from 'react';
import { useGetDiscountsQuery, useApplyDiscountMutation } from '@/services/discount';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { toast } from 'react-toastify';

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

    return (
        <div>
            {discountsData ? (
                <div>
                    {discountsData.docs.length > 0 ? (
                        <Slider className='w-48'>
                            {discountsData.docs.map((discount) => (
                                <div key={discount._id}>
                                    <button className='text-layer' onClick={() => addSale(discount)}>
                                        <p>Discount: {discount.discount}</p>
                                    </button>
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <div>No discounts available</div>
                    )}
                </div>
            ) : (
                <div>No discounts available</div>
            )}
        </div>
    );
};

export default List_discount;
