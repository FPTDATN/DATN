import { useCreateOrderMutation } from '@/services/order';
import { clear } from '@/slices/cart';
import { useAppDispatch } from '@/store/hook';
import { Status } from '@/types/status';
import { reduceTotal } from '@/utils/reduce';
import { Button, Form, FormInstance, Input, InputNumber, message } from 'antd';
import { useEffect } from 'react';

interface Props {
    cartItems: any[];
    authData: {
        _id: string;
        email: string;
        username: string;
    };
    payMethod: number;
    form:FormInstance<any>
}

const CheckoutNormal = ({ cartItems, authData, payMethod,form }: Props) => {
    const dispatch = useAppDispatch();

    const [orders, { data: _order, isSuccess: orderSuccess, isError: orderError, isLoading: orderLoading }] =
        useCreateOrderMutation();

    const handleSubmitCheckout = async (values: any) => {
        try {
            const { username, ...customer } = values;
            orders({
                ...customer,
                totalAmount: reduceTotal(cartItems),
                status: Status.ORDER_CONFIRM,
                payMethod,
                products: cartItems,
                buyer: authData?._id,
            });
        } catch (error) {
            return;
        }
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
        if (orderSuccess) {
            message.success('Thanh toán thành công');
            dispatch(clear());
        }

        if (orderError) {
            message.error('Thanh toán không thành công');
        }
    }, [orderSuccess, orderError]);

    return (
        <div>
            <Form onFinish={handleSubmitCheckout} layout="vertical" form={form}>
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
                <Form.Item rules={[{ required: true, message: 'Bắt buộc' }]} label={'Tên đẩy đủ'} name={'customerName'}>
                    <Input />
                </Form.Item>

                <Form.Item
                    rules={[{ required: true, message: 'Bắt buộc', type: 'number' }]}
                    label={'Số điện thoại'}
                    name={'customerPhone'}
                >
                    <InputNumber className="w-full" type='number'/>
                </Form.Item>

                <Button loading={orderLoading} htmlType="submit">
                    Gửi biểu mẫu
                </Button>
            </Form>
        </div>
    );
};

export default CheckoutNormal;
