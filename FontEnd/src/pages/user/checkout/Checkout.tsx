import { ReactNode, useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hook';
import { checkAuth } from '@/utils/checkAuth';
import Loading from '@/components/ui/Loading';
import { Divider, Form, Radio, RadioChangeEvent } from 'antd';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import CheckoutNormal from '@/components/checkout/CheckoutNormal';
import { formartVND } from '@/utils/formartVND';
import { reduceTotal } from '@/utils/reduce';
import { Link } from 'react-router-dom';


const LocationList: React.FC = () => {
    const { data: authData, isLoading: authLoading } = checkAuth();
    const [form] = Form.useForm();

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
                    <CheckoutNormal form={form} cartItems={cartItems} payMethod={payMethod} />
                </div>,
            );
        }
    }, [payMethod, loading]);

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
                                            <div className=" bg-white px-7 py-7">
                                                <div className="flex justify-between">
                                                    <span>SẢN PHẨM</span>
                                                    <span>TỔNG</span>
                                                </div>
                                                <Divider />

                                                <div>
                                                    {cartItems.map((item, index) => (
                                                        <div key={index}>
                                                            <div className="flex justify-between py-1">
                                                                <span className="break-words text-sm">
                                                                    {item?.size?.length || item?.color?.length > 0 ? (
                                                                        <Link to={`/detail/${item._id}`}>
                                                                            {item.name.slice(0, 10)}... - {item.size} -{' '}
                                                                            {item.color}
                                                                        </Link>
                                                                    ) : (
                                                                        <Link to={`/detail/${item._id}`}>
                                                                            {item.name.slice(0, 10)}...
                                                                        </Link>
                                                                    )}
                                                                    <strong className="ml-2">× {item.quantity}</strong>
                                                                </span>
                                                    
                                                                <span className="text-gray-500">
                                                                    {formartVND(item.price * item.quantity)}
                                                                </span>
                                                            </div>
                                                            <Divider />
                                                            
                                                        </div>
                                                    ))}

                                                    <div className="flex justify-between py-1">
                                                        <span>Tổng</span>
                                                        <span className='!text-primary font-semibold text-xl'>{formartVND(reduceTotal(cartItems))}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div className="border p-4 shadow-lg rounded">
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
