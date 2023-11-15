import { useEffect, useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripePaymentElementOptions } from '@stripe/stripe-js/types/stripe-js/elements';
import { Button, Form, FormInstance, Input, InputNumber, message } from 'antd';
import { useAppDispatch } from '@/store/hook';
import { useCreateOrderMutation } from '@/services/order';
import { Status } from '@/types/status';
import { clear } from '@/slices/cart';
import { useNavigate } from 'react-router-dom';

interface Props {
    cartItems: any[];
    authData: {
        _id: string;
        email: string;
        username: string;
    };
    payMethod: number;
    form: FormInstance<any>;
}

export default function CheckoutForm({ authData, cartItems, payMethod, form }: Props) {

    const router = useNavigate();

    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useAppDispatch();

    const [messageStripe, setMessage] = useState<string | null>(null);

    const [orders, { data: _order,  isLoading: orderLoading }] =
        useCreateOrderMutation();

    useEffect(() => {
        if (authData) {
            form.setFieldsValue({
                email: authData.email,
                username: authData.username,
            });
        }
    }, [authData, form]);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent?.status) {
                case 'succeeded':
                    setMessage('Payment succeeded!');
                    break;
                case 'processing':
                    setMessage('Your payment is processing.');
                    break;
                case 'requires_payment_method':
                    setMessage('Your payment was not successful, please try again.');
                    break;
                default:
                    setMessage('Something went wrong.');
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (values: any) => {
        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret:
                'sk_test_51OCJujAEqVUq8VkzDJtQAGwMBgQB9tD2buWu9urM0s1WsOsNeD1DfRmaBPmKBr7H5cpbbTnXoApDNQJjrOgCTdH700viotKJEd' as string,
            redirect: 'if_required',
            confirmParams: {
                payment_method_data: {
                    billing_details: {
                        address: values.shippingAddress,
                        email: authData.email,
                        name: values.customerName,
                        phone: values.customerPhone,
                    },
                },
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error?.type === 'card_error' || error?.type === 'validation_error') {
            setMessage(error?.message || 'Something error message');
        } else if (!error) {
            const { username, ...customer } = values;
            orders({
                ...customer,
                buyer: authData._id,
                products: cartItems,
                status: Status.ORDER_CONFIRM,
                payMethod,
            });

            router(`/success/${authData._id}`);
            message.success('Thanh toán thành công');
            dispatch(clear());
            setMessage('Something went wrong!');
        }
    };

    const paymentElementOptions: StripePaymentElementOptions = {
        layout: 'tabs',
    };

    return (
        <Form id="payment-form" className="mt-4" form={form} layout="vertical" onFinish={handleSubmit}>
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            {/* Show any error or success messages */}
            {messageStripe && <div id="payment-message">{messageStripe}</div>}
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
                <InputNumber className="w-full" type="number" />
            </Form.Item>

            <Button loading={orderLoading} htmlType="submit">
                Gửi biểu mẫu
            </Button>
        </Form>
    );
}
