import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { checkAuth } from '@/utils/checkAuth';
import Loading from '@/components/ui/Loading';

import { Input, Form, Button, message, InputNumber } from 'antd';
import { reduceTotal } from '@/utils/reduce';
import { Status } from '@/types/status';
import { useCreateOrderMutation } from '@/services/order';
import { clear } from '@/slices/cart';

const LocationList: React.FC = () => {
    const { data: authData, isLoading } = checkAuth();
    const [form] = Form.useForm();

    const { cartItems } = useAppSelector((state) => state.cart);

    // const [provinces, setProvinces] = useState([]);
    // const [selectedProvince, setSelectedProvince] = useState('');
    // const [districts, setDistricts] = useState([]);
    // const [selectedDistrict, setSelectedDistrict] = useState('');
    // const [selectedWard, setSelectedWard] = useState('');
    // const [communes, setCommunes] = useState([]);
    // const [listCart, setListCart] = useState<any[] | undefined>();
    // const [totalSum, setTotalSum] = useState(0);
    // const [Payment, setPayment] = useState(0);

    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    // } = useForm();
    // const navigate = useNavigate();

    // const totalFinal = (ship: number, totalSum: number) => {
    //     return ship + totalSum;
    // };

    // const userLogin = localStorage.getItem('user');
    // const objLogin = userLogin ? JSON.parse(userLogin) : null;

    // useEffect(() => {
    //     async function fetchProvinces() {
    //         try {
    //             const response = await fetch('https://provinces.open-api.vn/api/p/');

    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setProvinces(data);
    //             } else {
    //                 console.error('Error fetching provinces:', response.statusText);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching provinces:', error);
    //         }
    //     }

    //     fetchProvinces();
    // }, []);

    // useEffect(() => {
    //     async function fetchDistricts() {
    //         if (selectedProvince) {
    //             try {
    //                 const response = await fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`);
    //                 if (response.ok) {
    //                     const data = await response.json();
    //                     setDistricts(data.districts);
    //                 } else {
    //                     console.error('Error fetching districts:', response.statusText);
    //                 }
    //             } catch (error) {
    //                 console.error('Error fetching districts:', error);
    //             }
    //         }
    //     }
    //     fetchDistricts();
    // }, [selectedProvince]);

    // useEffect(() => {
    //     async function fetchCommunes() {
    //         if (selectedDistrict) {
    //             try {
    //                 const response = await fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`);
    //                 if (response.ok) {
    //                     const data = await response.json();
    //                     setCommunes(data.wards);
    //                 } else {
    //                     console.error('Error fetching communes:', response.statusText);
    //                 }
    //             } catch (error) {
    //                 console.error('Error fetching communes:', error);
    //             }
    //         }
    //     }

    //     fetchCommunes();
    // }, [selectedDistrict]);

    // const onAdd = async (data: any) => {
    //     let product: any[] = [];
    //     product = listCart;
    //     let products: any = {};

    //     if (Payment === 1) {
    //         products = {
    //             user_id: objLogin._id,
    //             product,
    //             ...data,
    //             province_id: Number(selectedProvince),
    //             district_id: Number(selectedDistrict),
    //             ward_id: Number(selectedWard),
    //             total_price: parseInt(totalSum) + parseInt(ship),
    //             payment: Payment,
    //         };
    //     } else {
    //         products = {
    //             user_id: objLogin._id,
    //             product,
    //             ...data,
    //             province_id: Number(selectedProvince),
    //             district_id: Number(selectedDistrict),
    //             ward_id: Number(selectedWard),
    //             total_price: parseInt(totalSum) + parseInt(ship),
    //             payment: Payment,
    //         };
    //     }

    //     const response = await ordersApi.Add(products);

    //     const payment = {
    //         amount: parseInt(totalSum) + parseInt(ship),
    //         orderDescription: 'Thanh toán đơn hàng',
    //         orderType: 200000,
    //         bankCode: '',
    //         language: 'vn',
    //         orderid: response.data._id,
    //     };

    //     if (Payment === 1) {
    //         const res = await paymentApi.createUrlPayment(payment);

    //         if (res?.code === 200) {
    //             window.open(res.vnpUrl, '_blank');
    //         } else {
    //             return toastError('Lỗi, Vui lòng thử lại');
    //         }
    //     }

    //     if (response.status === 200) {
    //         toastSuccess('Bạn đã đặt hàng thành công!');
    //         navigate(`/thanks/${response.data._id}`);
    //     } else {
    //         navigate('/carts');
    //     }
    // };

    const dispatch = useAppDispatch();

    const [orders, { data: _order, isSuccess: orderSuccess, isError: orderError }] = useCreateOrderMutation();

    const handleSubmitCheckout = (values: any) => {
        try {
            const { username, ...customer } = values;
            orders({
                ...customer,
                totalAmount: reduceTotal(cartItems),
                status: Status.confirmation,
                products: cartItems,
                buyers: [
                    {
                        buyer: authData?._id,
                        fullName: values.customerName,
                    },
                ],
            });
        } catch (error) {
            return;
        }
    };

    useEffect(() => {
        if (orderSuccess) {
            message.success('Thanh toán thành công');
            dispatch(clear());
        }

        if (orderError) {
            message.error('Thanh toán không thành công');
        }
    }, [orderSuccess, orderError]);

    useEffect(() => {
        if (authData) {
            form.setFieldsValue({
                email: authData.email,
                username: authData.username,
            });
        }
    }, [authData, form]);

    return (
        // <div>
        //     {isLoading ? (
        //         <Loading />
        //     ) : (
        //         <form onSubmit={handleSubmit(onAdd)}>
        //             <section className="flex gap-8 w-10/12 m-auto py-20">
        //                 <section className="basis-4/6">
        //                     <h3 className="text-2xl font-bold mb-10">THÔNG TIN GIAO HÀNG</h3>
        //                     <table className="table-auto w-full">
        //                         <label htmlhtmlFor="" className="font-semibold">
        //                             Họ và Tên <span className="text-red-700">*</span>
        //                         </label>
        //                         <br />
        //                         <input
        //                             className="border w-8/12 py-3 px-2 mt-5 mb-5"
        //                             type="text"
        //                             value={`${authData?.firstName} ${authData?.lastName}`}
        //                             placeholder="Họ và Tên"
        //                             {...register('fullName', {
        //                                 required: true,
        //                             })}
        //                         />
        //                         {errors?.fullName && (
        //                             <span className="ml-[5px] font-bold text-red-500">Vui lòng không bỏ trống</span>
        //                         )}
        //                     </table>
        //                     <table className="table-auto w-full">
        //                         <label htmlhtmlFor="" className="font-semibold">
        //                             Số Điện Thoại <span className="text-red-700">*</span>
        //                         </label>
        //                         <br />
        //                         <input
        //                             className="border w-8/12 py-3 px-2 mt-5 mb-5"
        //                             type="text"
        //                             value={`0${authData?.phone}`}
        //                             placeholder="Số Điện Thoại"
        //                             {...register('phone', {
        //                                 required: true,
        //                                 pattern: /((09|03|07|08|05|\+84)+([0-9]{8,9})\b)/g,
        //                             })}
        //                         />
        //                         {errors?.phone && (
        //                             <span className="ml-[5px] font-bold text-red-500">
        //                                 Vui lòng nhập đúng định dạng số điện thoại!{' '}
        //                             </span>
        //                         )}
        //                     </table>
        //                     <table className="table-auto w-full flex pb-[30px] ">
        //                         <tr>
        //                             <label htmlhtmlFor="" className="font-semibold">
        //                                 Địa chỉ <span className="text-red-700">*</span>
        //                             </label>
        //                             <td>
        //                                 <br />
        //                                 <select
        //                                     onChange={(e) => setSelectedProvince(e.target.value)}
        //                                     className="py-[12px] border-[1px]"
        //                                     name=""
        //                                     id=""
        //                                 >
        //                                     <option value="">Tỉnh</option>
        //                                     {provinces.map((item: any) => (
        //                                         <option key={item.code} value={item.code}>
        //                                             {item.name}
        //                                         </option>
        //                                     ))}
        //                                 </select>
        //                             </td>
        //                             <td>
        //                                 <br />
        //                                 <select
        //                                     onChange={(e) => setSelectedDistrict(e.target.value)}
        //                                     className="py-[12px] mx-[10px] border-[1px]"
        //                                     name=""
        //                                     id=""
        //                                     value={selectedDistrict}
        //                                 >
        //                                     <option value="">Huyện</option>
        //                                     {districts.map((item: any) => (
        //                                         <option key={item.code} value={item.code}>
        //                                             {item.name}
        //                                         </option>
        //                                     ))}
        //                                 </select>
        //                             </td>
        //                             <td>
        //                                 <br />
        //                                 <select
        //                                     onChange={(e) => setSelectedWard(e.target.value)}
        //                                     className="py-[12px] border-[1px]"
        //                                     name=""
        //                                     id=""
        //                                     value={selectedWard}
        //                                 >
        //                                     <option value="">Xã</option>
        //                                     {communes.map((item: any) => (
        //                                         <option key={item.code} value={item.code}>
        //                                             {item.name}
        //                                         </option>
        //                                     ))}
        //                                 </select>
        //                             </td>
        //                         </tr>
        //                     </table>
        //                     <table className="table-auto w-full">
        //                         <label htmlhtmlFor="" className="font-semibold">
        //                             Address Detail <span className="text-red-700">*</span>
        //                         </label>
        //                         <br />
        //                         <input
        //                             className="border w-8/12 py-3 px-2 mt-5 mb-5"
        //                             type="text"
        //                             placeholder="Address Detail"
        //                             {...register('detail_address', {
        //                                 required: true,
        //                             })}
        //                         />
        //                         {errors?.detail_address && (
        //                             <span className="ml-[5px] font-bold text-red-500">Vui lòng không bỏ trống</span>
        //                         )}
        //                     </table>
        //                     <table className="table-auto w-full">
        //                         <label htmlhtmlFor="" className="font-semibold">
        //                             Ghi Chú <span className="text-red-700">*</span>
        //                         </label>
        //                         <br />
        //                         <input
        //                             className="border w-8/12 py-3 px-2 mt-5 mb-5"
        //                             type="text"
        //                             placeholder="Ghi chú"
        //                             {...register('note')}
        //                         />
        //                         {errors?.note && (
        //                             <span className="ml-[5px] font-bold text-red-500">Vui lòng không bỏ trống</span>
        //                         )}
        //                     </table>
        //                 </section>
        //                 <section className="basis-4/6 w-full">
        //                     <section className="bg-zinc-100 mt-12">
        //                         <div className="p-10">
        //                             <p className="text-2xl font-bold mb-[25px]">ĐƠN HÀNG CỦA BẠN</p>
        //                             <div className=" pt-5 flex ">
        //                                 <span className="grow font-bold">Sản Phẩm</span>
        //                                 <span className="text-right font-semibold">Giá</span>
        //                             </div>
        //                             {listCart &&
        //                                 listCart.map((item: any, i: number) => {
        //                                     return (
        //                                         <div className=" pt-5 flex mb-[20px]" key={i}>
        //                                             <span className="grow flex">
        //                                                 <span className="font-bold">{item.product.name}</span> -{' '}
        //                                                 <div className="w-[20px] h-[20px] rounded-[50%]">
        //                                                     {item.size.value}
        //                                                 </div>{' '}
        //                                             </span>
        //                                             <span className="text-right ">
        //                                                 {formatCurrency(item.quantity * item.product.price)}
        //                                             </span>
        //                                         </div>
        //                                     );
        //                                 })}
        //                             <div className=" pt-5 flex ">
        //                                 <span className="grow font-semibold">Tạm Tính </span>
        //                                 <span className="text-right ">{formatCurrency(totalSum)}</span>
        //                             </div>
        //                             <div className=" pt-5 flex justify-between">
        //                                 <div className="flex">
        //                                     <img
        //                                         className="w-[50px] mr-[5px]"
        //                                         src="https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-GHN-Slogan-En.png"
        //                                         alt=""
        //                                     />{' '}
        //                                     <span>Phí giao hàng:</span>
        //                                 </div>
        //                                 <span className="text-right">{ship}</span>
        //                             </div>
        //                             <div className=" pt-5 flex">
        //                                 <span className="grow font-semibold text-xl">Tổng tiền</span>
        //                                 <span className="text-right ">
        //                                     {formatCurrency(totalFinal(ship, totalSum))}
        //                                 </span>
        //                             </div>
        //                             <div className="flex flex-col  my-[10px]">
        //                                 <div className="flex items-center mr-4">
        //                                     <input
        //                                         defaultChecked
        //                                         id="inline-radio"
        //                                         type="radio"
        //                                         onClick={() => setPayment(0)}
        //                                         name="inline-radio-group"
        //                                         className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        //                                     />
        //                                     <label
        //                                         htmlhtmlFor="inline-radio"
        //                                         className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        //                                     >
        //                                         Thanh toán khi nhận hàng
        //                                     </label>
        //                                 </div>
        //                                 <div className="flex items-center mr-4">
        //                                     <input
        //                                         id="inline-2-radio"
        //                                         type="radio"
        //                                         onClick={() => setPayment(1)}
        //                                         name="inline-radio-group"
        //                                         className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        //                                     />
        //                                     <label
        //                                         htmlhtmlFor="inline-2-radio"
        //                                         className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        //                                     >
        //                                         Thanh toán tự động qua VNPAY{' '}
        //                                         <img
        //                                             src="https://i0.wp.com/discvietnam.com/wp-content/uploads/2020/07/C%E1%BB%95ng-thanh-to%C3%A1n-VNPAY-Logo-Th%E1%BA%BB-ATM-T%C3%A0i-kho%E1%BA%A3n-ng%C3%A2n-h%C3%A0ng-Online-Banking-M%C3%A3-QR-QR-Pay-Qu%C3%A9t-QR-Transparent.png?fit=360%2C140&ssl=1"
        //                                             className="w-[80px]"
        //                                             alt=""
        //                                         />
        //                                     </label>
        //                                 </div>
        //                             </div>
        //                             <button className="bg-black text-white font-semibold p-3 mt-10 w-full">
        //                                 Hoàn tất Đơn hàng
        //                             </button>
        //                         </div>
        //                     </section>
        //                 </section>
        //             </section>
        //         </form>
        //     )}
        // </div>

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
                        Trước khi tiến hành thanh toán, bạn phải thêm một số sản phẩm vào giỏ hàng của mình. Bạn sẽ tìm
                        thấy rất nhiều sản phẩm thú vị trên trang "Cửa hàng" của chúng tôi.
                    </p>

                    <a href="/" className="uppercase bg-primary/90 text-white text-center px-4 py-2">
                        Trở lại cửa hàng
                    </a>
                </div>
            ) : (
                <div>
                    {isLoading ? (
                        <div className="h-screen">
                            <Loading />
                        </div>
                    ) : (
                        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 py-10">
                            <div className="px-4 pt-8">
                                <p className="text-xl font-medium">Order Summary</p>
                                <p className="text-gray-400">
                                    Check your items. And select a suitable shipping method.
                                </p>
                                <table className="border mt-6">
                                    <thead>
                                        <tr>
                                            <td className="px-2 py-2">SẢN PHẨM</td>
                                            <td className="line-clamp-1 px-2 py-2">SỐ</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => (
                                            <tr key={item._id}>
                                                <td className="border px-2 py-2 font-bold text-base">{item.name}</td>
                                                <td className="border px-2 py-2 font-bold text-base text-primary/90">{`x${item.quantity}`}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <h3 className="text-xl font-bold text-primary/90 mt-4">
                                    TỔNG TIỀN: ${reduceTotal(cartItems)}
                                </h3>
                                <p className="mt-8 text-lg font-medium">Shipping Methods</p>
                                <form className="mt-5 grid gap-6">
                                    <div className="relative">
                                        <Input type="radio" className="peer hidden" id="radio" name="radio" />
                                        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                                        <label
                                            className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                                            htmlFor="radio_1"
                                        >
                                            <img
                                                className="w-14 object-contain"
                                                src="https://i0.wp.com/discvietnam.com/wp-content/uploads/2020/07/C%E1%BB%95ng-thanh-to%C3%A1n-VNPAY-Logo-Th%E1%BA%BB-ATM-T%C3%A0i-kho%E1%BA%A3n-ng%C3%A2n-h%C3%A0ng-Online-Banking-M%C3%A3-QR-QR-Pay-Qu%C3%A9t-QR-Transparent.png?fit=360%2C140&ssl=1"
                                                alt=""
                                            />
                                            <div className="ml-5">
                                                <span className="mt-2 font-semibold">Fedex Delivery</span>
                                                <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <Input type="radio" className="peer hidden" id="radio" name="radio" />
                                        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                                        <label
                                            className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                                            htmlFor="radio_2"
                                        >
                                            <img
                                                className="w-14 object-contain"
                                                src="https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-GHN-Slogan-En.png"
                                                alt=""
                                            />
                                            <div className="ml-5">
                                                <span className="mt-2 font-semibold">Fedex Delivery</span>
                                                <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
                                            </div>
                                        </label>
                                    </div>
                                </form>
                            </div>
                            <Form
                                onFinish={handleSubmitCheckout}
                                layout="vertical"
                                form={form}
                                className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0"
                            >
                                <p className="text-xl font-medium">Payment Details</p>
                                <p className="text-gray-400">Complete your order by providing your payment details.</p>

                                <Form.Item label={'Tên đăng nhập'} name={'username'}>
                                    <Input disabled />
                                </Form.Item>
                                <Form.Item
                                    rules={[
                                        { required: true, message: 'Bắt buộc' },
                                        { type: 'email', message: 'Phải đúng định dạng Email' },
                                    ]}
                                    label={'Email'}
                                    name={'email'}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    rules={[{ required: true, message: 'Bắt buộc' }]}
                                    label={'Địa chỉ chi tiết (Ví dụ: "Xã - Huyện/Quận - Tỉnh/Thành phố")'}
                                    name={'shippingAddress'}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    rules={[{ required: true, message: 'Bắt buộc' }]}
                                    label={'Tên đẩy đủ'}
                                    name={'customerName'}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    rules={[{ required: true, message: 'Bắt buộc' }, { min: 10 }, { max: 12 }]}
                                    label={'Số điện thoại'}
                                    name={'orderNumber'}
                                >
                                    <Input className="w-full" />
                                </Form.Item>

                                <Button htmlType="submit">Gửi biểu mẫu</Button>
                            </Form>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default LocationList;
