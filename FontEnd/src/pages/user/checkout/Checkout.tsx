import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/store/hook';
import Loading from '@/components/ui/Loading';
import { Button, Divider, Form, Input, Menu, message, Tooltip } from 'antd';
import { formartVND } from '@/utils/formartVND';
import { reduceTotal } from '@/utils/reduce';
import axios from 'axios';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { useCreateOrderMutation } from '@/services/order';
import { Status } from '@/types/status';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetUserByIdQuery } from '@/services/user';
import { useMeQuery } from '@/services/auth';
import { useRemoveDiscountCodeFromUserMutation } from '@/services/user';
import { useApplyDiscountCodeOrderMutation } from '@/services/order';

interface Discount {
    _id?: number | string;
    code: string;
    discount: number;
    maxAmount: number;
    count: number;
    startDate: Date;
    endDate: Date;
}

const StyleInput = styled(Input)`
    border-radius: 2px;
    padding: 10px 12px;

    &:focus-within {
        border-color: #333;
    }

    &:hover {
        border-color: #333;
    }
`;

const StyleBill = styled.div`
    position: absolute;
    left: 0;
    width: 100%;
    height: 10px;
    background-color: transparent;
    background-image: radial-gradient(farthest-side, transparent 6px, #f7f7f7 0);
    background-size: 15px 15px;
`;

const StyleButton = styled(Button)`
    background-color: #ca6f04;
    padding: 12px 0;
    height: auto;
    text-align: center;
    color: #fff !important;
    width: 100%;
    border-radius: 2px;
    border-color: #ca6f04 !important;
    font-size: 16px;

    &:hover {
        opacity: 0.9;
    }
`;
const LocationList: React.FC = () => {
    // Router
    const router = useNavigate();

    // Slice
    const { cartItems } = useAppSelector((state) => state.cart);
    // Mutations

    const [orders, { data: order, isSuccess: orderSuccess, isError: orderError, isLoading: orderLoading }] =
        useCreateOrderMutation();
    // const { data: authData, isLoading: authLoading } = checkAuth();
    const { data: authData, isLoading: authLoading } = useMeQuery();
    const [form] = Form.useForm();
    const [discountCode, setDiscountCode] = useState('');
    const [appliedDiscount, setAppliedDiscount] = useState(false);
    const [discounts, setDiscounts] = useState<Discount[]>([]);
    const [_discountAmount, setDiscountAmount] = useState(0);
    const [appliedDiscountCode, setAppliedDiscountCode] = useState<string>('');
    const [discountedTotal, setDiscountedTotal] = useState<number>(reduceTotal(cartItems));
    const [savedAddSales, setSavedAddSales] = useState([]);
    const [selectedDiscount, setSelectedDiscount] = useState('');
    const [selectedUserDiscount, setSelectedUserDiscount] = useState('');

    // Mount
    const { data: userData } = useMeQuery();
    const user_id = userData?._id || '';
    const { data: userById } = useGetUserByIdQuery(user_id);
    // console.log('test',user_id)

    const listMyVoucher = userById?.data?.discountCodes;
    // console.log('test',listMyVoucher)

    const shouldLog = useRef(true);

    // áp mã giảm giá
    const handleUserDiscountChange = (value: string) => {
        setSelectedUserDiscount(value);
    };
    // Hàm xử lý khi nhấn nút áp dụng mã giảm giá
    const applyDiscount = () => {
        if (selectedUserDiscount.trim() === '') {
            toast.error('Vui lòng chọn mã giảm giá.');
            return;
        }

        if (appliedDiscountCode) {
            toast.success('Áp mã thanh toán thành công !');
            return;
        }

        const foundDiscount = listMyVoucher?.find((discount) => discount.code === selectedUserDiscount);

        if (foundDiscount) {
            if (discountedTotal < foundDiscount.maxAmount) {
                toast.warning(
                    `Tổng giá trị đơn hàng (${formartVND(discountedTotal)}) đơn hàng phải lớn hơn (${formartVND(
                        foundDiscount.maxAmount,
                    )}).`,
                );
                return;
            }

            const currentDate = new Date();

            if (currentDate >= new Date(foundDiscount.startDate) && currentDate <= new Date(foundDiscount.endDate)) {
                // Mã giảm giá hợp lệ, áp dụng giảm giá
                // Thêm mã giảm giá vào mảng discounts
                setDiscounts((prevDiscounts) => [...prevDiscounts, foundDiscount]);
                setAppliedDiscountCode(foundDiscount._id);
                setAppliedDiscount(true);
                setDiscountAmount(foundDiscount.discount);
                const totalCartPrice = reduceTotal(cartItems);
                const discountAmountInMoney = (foundDiscount.discount / 100) * totalCartPrice;
                const discountedPrice = totalCartPrice - discountAmountInMoney;
                setDiscountedTotal(discountedPrice);
                toast.success('Mã giảm giá đã được áp dụng!');
            } else {
                toast.error('Mã giảm giá đã hết hạn.');
            }
        } else {
            toast.error('Mã giảm giá không hợp lệ.');
        }
    };

    // hủy áp dụng mã
    const cancelDiscount = () => {
        setAppliedDiscount(false);
        setDiscountAmount(0);
        setAppliedDiscountCode('');
        setDiscountedTotal(reduceTotal(cartItems));
        setSelectedUserDiscount(''); // Reset the selected user discount
        toast.info('Đã hủy áp dụng mã giảm giá.');
    };
    // Pay method
    const [payMethod, setPayMethod] = useState(0);
    // const [loading, setLoading] = useState(false);

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
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    useEffect(() => {
        if (authData) {
            form.setFieldsValue({
                email: authData.email,
                username: authData.username,
            });
        }
    }, [authData, form]);

    const handleSubmitCheckout = async (values: any) => {
        try {
            const { username, address1, address2, city, ...customer } = values;
            const shipping = `${address1} - ${address2} - ${city}`;
            if (payMethod === 0) {
                orders({
                    ...customer,
                    total: discountedTotal,
                    status: Status.INFORMATION,
                    userId: authData?._id! || '',
                    payMethod,
                    products: cartItems,
                    isPaid: true,
                    shipping,
                });
                console.log(customer);
            }

            if (payMethod === 1) {
                axios
                    .post('http://localhost:8080/api/vnpay/create_payment_url', {
                        amount: discountedTotal,
                        bankCode: '',
                        orderDescription: 'vnpay',
                        orderType: 2,
                        language: '',
                        orderid: Math.random(),
                        products: cartItems,
                        shipping,
                        userId: authData?._id! || '',
                        ...customer,
                    })
                    .then((res) => {
                        window.location = res.data.url;
                    });
            }
        } catch (error) {
            return message.error('Đã có lỗi xảy ra');
        }
    };

    useEffect(() => {
        if (orderSuccess) {
            message.success('Thanh toán thành công');
            router(`/success/${order?._id}`);
        }

        if (orderError) {
            message.error('Thanh toán không thành công');
        }
    }, [orderSuccess, orderError]);

    // áp mã
    return (
        <div className="bg-white max-w-5xl mx-auto mb-10">
            {authLoading ? (
                <div className="h-screen">
                    <Loading />
                </div>
            ) : (
                <Form
                    layout="vertical"
                    className="grid grid-cols-1 mt-10 gap-x-4 lg:grid-cols-2 w-full"
                    onFinish={handleSubmitCheckout}
                    form={form}
                >
                    <div className="p-4">
                        <Form.Item
                            name={'email'}
                            label={'Địa chỉ email'}
                            rules={[{ required: true, message: 'Bắt buộc' }]}
                        >
                            <StyleInput />
                        </Form.Item>

                        <Form.Item
                            name={'fullName'}
                            label={'Tên của bạn'}
                            rules={[{ required: true, message: 'Bắt buộc' }]}
                        >
                            <StyleInput />
                        </Form.Item>

                        <Form.Item
                            rules={[{ required: true, message: 'Bắt buộc' }]}
                            label={'Địa chỉ 1'}
                            name={'address1'}
                        >
                            <StyleInput />
                        </Form.Item>

                        <Form.Item
                            rules={[{ required: true, message: 'Bắt buộc' }]}
                            label={'Địa chỉ 2'}
                            name={'address2'}
                        >
                            <StyleInput />
                        </Form.Item>

                        <Form.Item rules={[{ required: true, message: 'Bắt buộc' }]} label={'Thành phố'} name={'city'}>
                            <StyleInput />
                        </Form.Item>

                        <Form.Item
                            name={'phone'}
                            label={'Số điện thoại'}
                            rules={[{ required: true, message: 'Bắt buộc' }]}
                        >
                            <StyleInput />
                        </Form.Item>
                    </div>
                    <div className="bg-gray-100 px-4 py-4 relative lg:px-7 lg:py-7">
                        <div>
                            <StyleBill style={{ top: '-10px', backgroundPosition: '-3px -5px, 0 0' }} />
                            <h1 className="text-center font-medium text-xl mb-7">ĐƠN HÀNG CỦA BẠN</h1>
                            <div className=" bg-white px-7 py-7">
                                <div className="flex justify-between">
                                    <span>SẢN PHẨM</span>
                                    <span>TỔNG</span>
                                </div>
                                <Divider />

                                {cartItems.map((item, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between px-2 py-1">
                                            <span className="break-words text-sm w-[calc(100%-100px)]">
                                                [Đặt hàng trước] {item.name} -{' '}
                                                <b>
                                                    {item?.color} - {item?.size}
                                                </b>
                                                <strong className="ml-2">× {item.quantity}</strong>
                                            </span>

                                            <span className="text-gray-500">
                                                {formartVND(item.price * item.quantity)}
                                            </span>
                                        </div>
                                        <Divider />
                                    </div>
                                ))}

                                <div className="border-dashed lg:border-0 md:border-0">
                                    <div className="mt-3 text-xl">
                                        <p>
                                            {appliedDiscount
                                                ? `Tổng : ${formartVND(discountedTotal)}`
                                                : `Tổng: ${formartVND(reduceTotal(cartItems))}`}
                                        </p>
                                    </div>
                                    {/* áp mã giảm giá  */}
                                    <div className="">
                                        <div className="">
                                            <Menu grid={{ gutter: 16, column: 2 }}>
                                                {listMyVoucher &&
                                                    listMyVoucher.map((voucher) => (
                                                        <Menu.Item
                                                            key={voucher._id}
                                                            onClick={() => handleUserDiscountChange(voucher.code)}
                                                        >
                                                            <div>
                                                                <span>{`Giảm giá ${voucher.discount}%`}</span>
                                                                <Tooltip
                                                                    title={
                                                                        <div>
                                                                            <p>{`Mã giảm giá: ${voucher.code}`}</p>
                                                                            <p>{`Đơn hàng tối thiểu: ${formartVND(
                                                                                voucher.maxAmount,
                                                                            )}`}</p>
                                                                            <p>{`HSD: ${formatDate(
                                                                                voucher.startDate,
                                                                            )} - ${formatDate(voucher.endDate)}`}</p>
                                                                        </div>
                                                                    }
                                                                >
                                                                    <span className="ml-2">ℹ️</span>
                                                                </Tooltip>
                                                            </div>
                                                        </Menu.Item>
                                                    ))}
                                            </Menu>
                                        </div>
                                        <button
                                            type="button"
                                            className="ml-2 font-semibold !bg-primary w-1/3 lg:w-auto md:w-auto px-2 text-white"
                                            onClick={applyDiscount}
                                        >
                                            ÁP MÃ GIẢM GIÁ
                                        </button>
                                        <button
                                            type="button"
                                            className="ml-2 font-semibold !bg-primary w-1/3 lg:w-auto md:w-auto px-2 text-white"
                                            onClick={cancelDiscount}
                                        >
                                            HỦY ÁP DỤNG MÃ
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div>
                                <label className="hover:cursor-pointer">
                                    <input
                                        name="pay"
                                        className="mt-4"
                                        onChange={(e) => setPayMethod(Number(e.target.value))}
                                        value={0}
                                        type="radio"
                                        defaultChecked
                                    />
                                    <span className="ml-2">Thanh toán khi nhận hàng</span>
                                </label>
                                <AnimatePresence>
                                    {payMethod === 0 && (
                                        <motion.div
                                            animate={{ height: 50, opacity: 1, overflow: 'hidden' }}
                                            initial={{ height: 0 }}
                                            exit={{ height: 0 }}
                                        >
                                            <div className="bg-white mt-2 py-2 px-4 h-[40px] flex items-center">
                                                <span className="mr-2">Thanh toán khi nhận hàng</span>
                                                <img src="/stripe.png" alt="" className="w-[50px]" />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div>
                                <label className="hover:cursor-pointer">
                                    <input
                                        name="pay"
                                        className="mt-4"
                                        onChange={(e) => setPayMethod(Number(e.target.value))}
                                        value={1}
                                        type="radio"
                                    />
                                    <span className="ml-2">Thanh toán bằng VNPAY</span>
                                </label>

                                <AnimatePresence>
                                    {payMethod === 1 && (
                                        <motion.div
                                            animate={{ height: 50, opacity: 1, overflow: 'hidden' }}
                                            initial={{ height: 0 }}
                                            exit={{ height: 0 }}
                                        >
                                            <div className="bg-white mt-2 py-2 px-4 h-[40px] flex items-center">
                                                <span className="mr-2">Thanh toán bằng</span>
                                                <img
                                                    src="https://vnpayqr.vn/wp-content/uploads/2022/01/tong-hop-logo-xuat-PNG_VNPAY-ngang-1.png"
                                                    alt=""
                                                    className="w-[70px]"
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div>
                                <br />
                                <Divider />
                                <br />
                                <p className="text-sm text-nav">
                                    Thông tin thẻ tín dụng sẽ được xử lý bằng cổng thanh toán an toàn do bạn lựa chọn và
                                    sẽ không được lưu trữ trong hệ thống trang web của chúng tôi. Dữ liệu cá nhân của
                                    bạn sẽ được sử dụng để xử lý đơn đặt hàng, hỗ trợ trải nghiệm của bạn trên trang web
                                    này và cho các mục đích khác được mô tả trong{' '}
                                    <strong className="text-[#48b8e5] font-semibold">chính sách bảo mật</strong> của
                                    chúng tôi.
                                </p>

                                <br />

                                <Divider />

                                <div className="text-sm text-nav">
                                    <label>
                                        <input type="checkbox" required />
                                        <span className="ml-2">
                                            Tôi hiểu và đồng ý rằng đơn hàng không thể bị hủy sau khi thanh toán xong.
                                            Tôi cũng đã đọc và đồng ý với các điều khoản và điều kiện của trang web *
                                        </span>
                                    </label>
                                </div>

                                <br />

                                {payMethod === 0 && (
                                    <StyleButton htmlType="submit" loading={orderLoading}>
                                        Thanh toán khi nhận hàng
                                    </StyleButton>
                                )}
                                {payMethod == 1 && <StyleButton htmlType="submit">Thanh toán băng VNPAY</StyleButton>}
                            </div>
                        </div>

                        <StyleBill style={{ bottom: '-10px', backgroundPosition: '-3px 2px, 0 0' }} />
                    </div>
                </Form>
            )}
        </div>
    );
};
export default LocationList;
