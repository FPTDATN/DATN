import { useEffect, useState } from 'react';
import { useApplyDiscountMutation, useGetDiscountsQuery } from '@/services/discount';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { toast } from 'react-toastify';
import { formartVND } from '@/utils/formartVND';
import "./List_discount.css"
import { addSaleItem } from '@/slices/sale';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
const List_discount = () => {
    const [selectedDiscounts, setSelectedDiscounts] = useState([]);
    const { data: discountsData, isLoading, isError } = useGetDiscountsQuery();
    console.log(discountsData)
    const dispatch = useDispatch();
    const saleItems = useSelector((state) => state.sales.saleItems);
    const [applyDiscountMutation] = useApplyDiscountMutation();
    const handleAddSale = async (discount) => {
        try {
          const existingDiscount = saleItems.find((item) => item._id === discount._id);
          if (!existingDiscount) {
            const result = await applyDiscountMutation(discount._id);
            setSelectedDiscounts([...selectedDiscounts, discount]);
            dispatch(addSaleItem(discount));
            const updatedDiscounts = discountsData?.docs.filter(
                (item) => item._id !== discount._id
              );
              console.log(updatedDiscounts)
            toast.success(`Đã thêm mã giảm giá: ${discount.discount}%`, {
              position: 'bottom-right',
            });
            
            return result;
          } else {
            toast.error(`Bạn đã lưu mã giảm giá này rồi !`, {
              position: 'bottom-right',
            });
          }
        } catch (error) {
          console.error('Lỗi khi áp dụng mã giảm giá:', error);
          toast.error('Có lỗi xảy ra khi thêm ưu đãi!', {
            position: 'bottom-right',
          });
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
                    <div className=' flex justify-between'>
                        <h2 className='text-2xl my-3'>Các mã giảm giá có trong của hàng </h2>
                        {/* <button className='btn__background--liner'><a href="/">Sản phẩn </a></button> */}
                        <Link to='/'>
                            <button className="btn__background--liner mt-5 mb-5" type="button">

                                <strong>Sản phẩm</strong>
                                <div id="container-stars">
                                    <div id="stars"></div>
                                </div>

                                <div id="glow">
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                </div>

                            </button>
                        </Link>
                    </div>
                    {discountsData.docs.length > 0 ? (
                        <div className='grid grid-cols-4 gap-4 rounded-md'>
                            {discountsData.docs.map((discount) => (
                                <div className='back__box--test' key={discount._id}>
                                    <button className='' onClick={() => handleAddSale(discount)}>
                                        <p className=''>Giá trị giảm giá: {discount.discount}%</p>
                                        <p className=''>Đơn hàng tối thiểu: {formartVND(discount.maxAmount)}</p>
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
