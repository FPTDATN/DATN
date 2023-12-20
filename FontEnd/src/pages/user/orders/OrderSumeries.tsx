import { Alert, Collapse, Steps, Tag, message } from 'antd';
import { MdSmsFailed } from 'react-icons/md';
import { useGetsOrderQuery, useUpdateOrderStatusMutation } from '@/services/order';
import { Status } from '@/types/status';
import Loading from '@/components/ui/Loading';
import { FaShippingFast } from 'react-icons/fa';
import { BsPersonVcardFill, BsDropbox, BsCheckCircleFill } from 'react-icons/bs';
import { checkAuth } from '@/utils/checkAuth';
import { formatTimeToNow } from '@/utils/formartDate';

import { ReactNode, useState } from 'react';
import { Button } from 'antd/es/radio';
import Modal from 'antd/es/modal/Modal';
// import { useAddOrderCommentMutation } from '@/services/ordercomments';
// import { toast } from 'react-toastify';
import { formartVND } from '@/utils/formartVND';
import styled from 'styled-components';

const { Panel } = Collapse;

const StyleCollapse = styled(Collapse)`
    
`

type Props = {};

const OrderSumeries = ({}: Props) => {
    const { data: orders, isLoading } = useGetsOrderQuery({ startDate: '', endDate: '' });
    // const [createOrderComment, { isError: _commentError, isLoading: _isCreatingComment }] =
    //     useAddOrderCommentMutation();
    const [cancelled, { isLoading: cancelledLoading }] = useUpdateOrderStatusMutation();
    const [orderId, setOrderId] = useState<string>('');

    // const [loading, setLoading] = useState(false);

    const { data: authdata } = checkAuth();
    // const [text, setText] = useState('');

    const [open, setOpen] = useState(false);
    const [modalText, setModalText] = useState<ReactNode>(
        <span className="text-red-500">Đơn hàng sau khi thanh toán sẽ không được hủy</span>,
    );

    const showModal = (id: string) => {
        setOpen(true);
        setOrderId(id);
    };

    const handleOk = async () => {
        try {
            setModalText('Đang hủy');

            await cancelled({ orderId, status: Status.CANCELLED }).then(() => {
                setTimeout(() => {
                    setOpen(false);
                }, 2000);
            });
        } catch (error: any) {
            message.error(error.message);
        }
    };

    const handleCancel = () => {
        setOpen(false);
        setOrderId('');
    };

    // const onShow = () => {
    //     setOpen(true);
    // };

    const renderPayMethod = (method: number, status?: number, isPaid?: boolean) => {
        if (status === Status.CANCELLED) {
            return (
                <Tag color="red-inverse" style={{ padding: 4 }}>
                    Đã hủy
                </Tag>
            );
        } else {
            if (isPaid === false) {
                return (
                    <Tag color="red-inverse" style={{ padding: 4 }}>
                        Thanh toán thất bại
                    </Tag>
                );
            }

            if (method === 0)
                return (
                    <Tag color="orange-inverse" style={{ padding: 4 }}>
                        Thanh toán khi nhận hàng
                    </Tag>
                );
            if (method === 1)
                return (
                    <Tag color="green-inverse" style={{ padding: 4 }}>
                        Đã thanh toán
                    </Tag>
                );
        }
    };

    // const handleCommentSubmit = async (event: any) => {
    //     event.preventDefault();
    //     if (text.trim() === '') {
    //         console.error('Comment text is required');
    //         return;
    //     }

    //     try {
    //         setLoading(true);
    //         await createOrderComment({
    //             text,
    //             userId: authdata?._id,
    //             orderId: filterOrders![0]._id,
    //             productId: filterOrders![0].products[0]._id,
    //         });
    //         toast.success('Đánh giá đơn hàng thành công');
    //         setText('');
    //     } catch (error) {
    //         console.error('Error creating comment:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const filterOrders = orders?.docs?.filter((order) => order.userId === authdata?._id && order.isPaid === true);

    return (
        <div className="min-h-screen max-w-full">
            {isLoading ? (
                <Loading />
            ) : (
                <div>
                    {!filterOrders || filterOrders?.length === 0 ? (
                        <div className="flex items-center flex-col justify-center gap-y-2">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/4555/4555971.png"
                                className="w-[360px] h-[360px] opacity-25"
                                alt=""
                            />

                            <h1 className="mt-10 text-xl font-semibold">Giỏ hàng của bạn hiện đang trống.</h1>
                            <p className="max-w-[960px] text-center">
                                Trước khi tiến hành thanh toán, bạn phải thêm một số sản phẩm vào giỏ hàng của mình. Bạn
                                sẽ tìm thấy rất nhiều sản phẩm thú vị trên trang "Cửa hàng" của chúng tôi.
                            </p>

                            <a href="/" className="uppercase bg-primary/90 text-white text-center px-4 py-2">
                                Trở lại cửa hàng
                            </a>
                        </div>
                    ) : (
                        <div className="mx-auto max-w-full">
                            {isLoading ? (
                                <Loading />
                            ) : (
                                <StyleCollapse defaultActiveKey={filterOrders![0]._id}>
                                    {filterOrders?.map((order) => {
                                        return (
                                            <Panel
                                                className="!min-w-[300px]"
                                                header={
                                                    <div>
                                                        Đơn hàng của {order.fullName} - Đặt hàng vào lúc :
                                                        {formatTimeToNow(new Date(order?.createdAt))}
                                                        <span className="ml-4">
                                                            {renderPayMethod(
                                                                order.payMethod,
                                                                order.status,
                                                                order.isPaid,
                                                            )}
                                                        </span>
                                                    </div>
                                                }
                                                key={order._id}
                                            >
                                                <div className="overflow-x-auto">
                                                    <div >
                                                        <h1>
                                                            <Alert
                                                                type="warning"
                                                                message="Lưu ý: Đơn hàng đã thanh toán sẽ không được hủy. (Vui lòng đọc kỹ điều khoản khi mua hàng)"
                                                            />
                                                        </h1>
                                                        <div className="mt-2 mb-4">
                                                            <Button
                                                                onClick={() => showModal(order._id)}
                                                                disabled={
                                                                    order.status >= Status.ORDER_CONFIRM ||
                                                                    order.payMethod === 2 ||
                                                                    order.status === Status.CANCELLED
                                                                }
                                                            >
                                                                {order.payMethod === 2
                                                                    ? 'Đã thanh toán'
                                                                    : 'Hủy đơn hàng'}
                                                            </Button>
                                                        </div>
                                                        <table className="border min-w-[600px]">
                                                            <thead>
                                                                <tr>
                                                                    <th></th>
                                                                    <th className="text-left">Sản phẩm</th>
                                                                    <th className="text text-center">Màu</th>
                                                                    <th className="text text-center">Size</th>
                                                                    <th className="min-w-[100px] text-center">Giá</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {order.products.map((item: any, index) => (
                                                                    <tr className="border" key={index}>
                                                                        <td className="p-2">
                                                                            <img
                                                                                src={`${item.images![0]}`}
                                                                                className="min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px]"
                                                                                alt=""
                                                                            />
                                                                        </td>
                                                                        <td className="p-2 w-full line-clamp-3">
                                                                            {item.name} x <b>{item.quantity}</b>
                                                                        </td>
                                                                        <td className="p-2 text-center">
                                                                            {item?.color}
                                                                        </td>
                                                                        <td className="p-2 text-center">
                                                                            {item?.size}
                                                                        </td>
                                                                        <td className="p-2 text-center">
                                                                            {formartVND(item.price * item.quantity)}
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>

                                                        <Modal
                                                            title="Bạn có muốn hủy đơn hàng này"
                                                            open={open}
                                                            onOk={handleOk}
                                                            okButtonProps={{ type: 'default' }}
                                                            confirmLoading={cancelledLoading}
                                                            onCancel={handleCancel}
                                                        >
                                                            <p>{modalText}</p>
                                                        </Modal>
                                                    </div>
                                                    <br />
                                                    <h1 className="text-base font-semibold">Trạng thái đơn hàng</h1>
                                                    <Steps
                                                        className="mt-3"
                                                        items={[
                                                            {
                                                                title: 'Thông tin khách hàng',
                                                                status:
                                                                    order.status >= Status.INFORMATION
                                                                        ? 'finish'
                                                                        : 'wait',
                                                                icon: <BsPersonVcardFill className="!text-primary" />,
                                                            },
                                                            {
                                                                title: 'Xác nhận đơn hàng',
                                                                status:
                                                                    order.status >= Status.ORDER_CONFIRM
                                                                        ? 'finish'
                                                                        : 'wait',
                                                                icon: <BsDropbox className="!text-primary" />,
                                                            },
                                                            {
                                                                title: 'Đang giao hàng',
                                                                status:
                                                                    order.status >= Status.SHIPPING ? 'finish' : 'wait',
                                                                icon: <FaShippingFast className="!text-primary" />,
                                                            },
                                                            {
                                                                title: order.status === 0 ? 'Đã hủy' : 'Hoàn thành',
                                                                status:
                                                                    order.status === Status.COMPLETE
                                                                        ? 'finish'
                                                                        : order.status === Status.CANCELLED
                                                                        ? 'error'
                                                                        : 'wait',
                                                                icon:
                                                                    order.status === Status.COMPLETE ? (
                                                                        <BsCheckCircleFill className="!text-green-500" />
                                                                    ) : Status.CANCELLED ? (
                                                                        <MdSmsFailed />
                                                                    ) : (
                                                                        <BsCheckCircleFill />
                                                                    ),
                                                            },
                                                        ]}
                                                    />
                                                </div>
                                            </Panel>
                                        );
                                    })}
                                </StyleCollapse>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default OrderSumeries;
