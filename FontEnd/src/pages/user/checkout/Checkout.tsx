import { ReactNode, useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hook';
import { checkAuth } from '@/utils/checkAuth';
import Loading from '@/components/ui/Loading';
import { Form, Radio, RadioChangeEvent } from 'antd';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import CheckoutNormal from '@/components/checkout/CheckoutNormal';
import CartComponent from '@/components/cart/CartComponent';
import { formartVND } from '@/utils/formartVND';
import { reduceTotal } from '@/utils/reduce';
import axios from 'axios';
interface Discount {
    _id: number | string;
    code: string;
    discount: number;
    maxAmount: number;
    count: number;
    startDate: Date;
    endDate: Date;
}
const LocationList: React.FC = () => {
    const { data: authData, isLoading: authLoading } = checkAuth();
    const [form] = Form.useForm();
    const [discountCode, setDiscountCode] = useState('');
    const [appliedDiscount, setAppliedDiscount] = useState(false);
    const [discounts, setDiscounts] = useState<Discount[]>([]);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [appliedDiscountCode, setAppliedDiscountCode] = useState<string>('');
    const [discountedTotal, setDiscountedTotal] = useState<number>(0);
    // áp mã giảm giá 
    // Hàm xử lý thay đổi mã giảm giá từ input
    const handleDiscountCodeChange = (value: string) => {
        setDiscountCode(value);
    };
    // Hàm xử lý khi nhấn nút áp dụng mã giảm giá
    const applyDiscount = () => {
        if (discountCode.trim() === '') {
            alert('Vui lòng nhập mã giảm giá.');
            return;
        }

        if (appliedDiscountCode) {
            alert('Bạn đã áp dụng một mã giảm giá rồi.');
            return;
        }
        const foundDiscount = discounts.find((discount) => discount.code === discountCode);

        if (foundDiscount) {
            const currentDate = new Date();

            if (currentDate >= new Date(foundDiscount.startDate) && currentDate <= new Date(foundDiscount.endDate)) {
                // Mã giảm giá hợp lệ, áp dụng giảm giá
                setAppliedDiscountCode(discountCode); // Lưu mã giảm giá đã áp dụng
                setAppliedDiscount(true);
                setDiscountAmount(foundDiscount.discount); // Cập nhật state discountAmount với số tiền giảm giá

                // Tính lại tổng số tiền sau khi áp mã giảm giá
                const totalCartPrice = reduceTotal(cartItems); // Tổng giá trị đơn hàng
                const discountAmountInMoney = (foundDiscount.discount / 100) * totalCartPrice;
                const discountedPrice = totalCartPrice - discountAmountInMoney;
                // Đặt lại tổng số tiền sau khi áp mã giảm giá
                // Nếu cần lưu giá trị này để hiển thị, bạn có thể lưu vào state khác
                setDiscountedTotal(discountedPrice);
                console.log('Tổng sau khi áp mã giảm giá:', discountedPrice);

                alert('Mã giảm giá đã được áp dụng!');
            } else {
                // Mã giảm giá hết hạn
                alert('Mã giảm giá đã hết hạn.');
            }
        } else {
            // Mã giảm giá không hợp lệ
            alert('Mã giảm giá không hợp lệ.');
        }
    };
    useEffect(() => {
        // Gửi yêu cầu API để lấy danh sách mã giảm giá từ locaso
        axios.get('http://localhost:8080/api/discounts')
            .then((response) => {
                // Lưu danh sách mã giảm giá vào state discounts
                setDiscounts(response.data.docs);
            })
            .catch((error) => {
                console.error('Error fetching discounts:', error);
            });
    }, []);

    // Pay method
    const [payMethod, setPayMethod] = useState(0);
    const [methodBody, setMethodBody] = useState<ReactNode>(<div></div>);
    const [loading, setLoading] = useState(false);
    const { cartItems } = useAppSelector((state) => state.cart);
    let holder: any = {};
    cartItems.forEach((d) => {
        if (holder.hasOwnProperty(d._id)) {
            holder[d._id] = holder[d._id] + d.quantity;
        } else {
            holder[d._id] = d.quantity;
        }
    });

    let obj2 = [];

    for (const prop in holder) {
        obj2.push({ key: prop, value: holder[prop] });
    }

    // console.log(obj2);

    const onChange = (e: RadioChangeEvent) => {
        setPayMethod(e.target.value);
    };

    useEffect(() => {
        if (authData) {
            form.setFieldsValue({
                email: authData.email,
                username: authData.username,
            });
        }
    }, [authData, form]);

    useEffect(() => {
        if (payMethod === 1) {
            setLoading(true);
            setMethodBody(
                <div>
                    <CheckoutForm form={form} cartItems={cartItems} authData={authData!} payMethod={payMethod} />
                </div>,
            );
        } else if (payMethod === 0) {
            setLoading(true);
            setMethodBody(
                <div className="mt-2">
                    <CheckoutNormal
                        form={form}
                        cartItems={cartItems}
                        payMethod={payMethod}
                        discountedTotal={discountedTotal} 
                    />
                </div>,
            );

        }
    }, [payMethod, loading]);
    // áp mã 
    return (
        <div>
            <div>
                {authLoading ? (
                    <div className="h-screen">
                        <Loading />
                    </div>
                ) : (
                    <div>
                        {cartItems.length === 0 ? (
                            <div className="flex items-center flex-col h-screen justify-center gap-y-2">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/4555/4555971.png"
                                    className="w-[360px] h-[360px] opacity-25"
                                    alt=""
                                />

                                <h1 className="mt-10 text-xl font-semibold">Giỏ hàng của bạn hiện đang trống.</h1>
                                <p className="max-w-[960px] text-center">
                                    Trước khi tiến hành thanh toán, bạn phải thêm một số sản phẩm vào giỏ hàng của mình.
                                    Bạn sẽ tìm thấy rất nhiều sản phẩm thú vị trên trang "Cửa hàng" của chúng tôi.
                                </p>

                                <a href="/" className="uppercase bg-primary/90 text-white text-center px-4 py-2">
                                    Trở lại cửa hàng
                                </a>
                            </div>
                        ) : (
                            <div>
                                {authLoading ? (
                                    <div className="h-screen">
                                        <Loading />
                                    </div>
                                ) : (
                                    <div className="grid sm:px-10 lg:grid-cols-2 gap-x-6 lg:px-20 xl:px-32 py-10">
                                        <div>
                                            <CartComponent />
                                            <div className="mt-3 text-xl">


                                                <div className="mt-3 text-xl">
                                                    <p>
                                                        {appliedDiscount
                                                            ? `Tổng : ${formartVND(discountedTotal)}`
                                                            : `Tổng: ${formartVND(reduceTotal(cartItems))}`
                                                        }
                                                    </p>
                                                </div>

                                            </div>
                                            <div>
                                                {/* áp mã giảm giá  */}
                                                <div className="border-dashed border lg:border-0 md:border-0 p-6 flex border-gray-300">
                                                    <input
                                                        type="text"
                                                        className="border w-2/3 lg:w-auto md:w-auto outline-none px-2 py-2"
                                                        placeholder="Mã giảm giá"
                                                        onChange={(e) => handleDiscountCodeChange(e.target.value)}
                                                    />
                                                    <button
                                                        className="ml-2 font-semibold !bg-primary w-1/3 lg:w-auto md:w-auto px-2 py-2 text-white"
                                                        onClick={applyDiscount}
                                                    >
                                                        ÁP MÃ GIẢM GIÁ
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='border p-4 shadow-lg rounded'>
                                            <Radio.Group onChange={onChange} value={payMethod}>
                                                <Radio className="w-full mt-2" value={0}>
                                                    Thanh toán khi nhận hàng
                                                </Radio>
                                                <Radio className="w-full mt-2" value={1}>
                                                    Thanh toán ngay
                                                </Radio>
                                            </Radio.Group>
                                            {methodBody}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
export default LocationList;
