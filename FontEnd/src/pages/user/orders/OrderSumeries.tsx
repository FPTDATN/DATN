import { Alert, Collapse, Steps, Tag, message } from 'antd';
import { MdSmsFailed } from 'react-icons/md';
import { useGetsOrderQuery, useUpdateOrderStatusMutation } from '@/services/order';
import { Status } from '@/types/status';
import Loading from '@/components/ui/Loading';
import { FaShippingFast } from 'react-icons/fa';
import { BsCheckCircleFill } from 'react-icons/bs';
import { MdConfirmationNumber } from "react-icons/md";
import { BiSolidPurchaseTagAlt } from "react-icons/bi";
import { checkAuth } from '@/utils/checkAuth';
import { formatTimeToNow } from '@/utils/formartDate';
import { MdDone } from 'react-icons/md';
import { ReactNode, useState } from 'react';
import { Button } from 'antd/es/radio';
import Modal from 'antd/es/modal/Modal';

// import { useAddOrderCommentMutation } from '@/services/ordercomments';
// import { toast } from 'react-toastify';
import { formartVND } from '@/utils/formartVND';
import styled from 'styled-components';
import OrderBinhluan from './comment';

const { Panel } = Collapse;

const StyleCollapse = styled(Collapse)`
    
`

type Props = {};

const OrderSumeries = ({ }: Props) => {
    const { data: orders, isLoading } = useGetsOrderQuery({ startDate: '', endDate: '' });
    const [cancelled, { isLoading: cancelledLoading }] = useUpdateOrderStatusMutation();
    const [orderId, setOrderId] = useState<string>('');
    const { data: authdata } = checkAuth();
    const [open, setOpen] = useState(false);
    const [modalText, setModalText] = useState<ReactNode>(
        <span className="text-red-500">Đơn hàng sau khi thanh toán sẽ không được hủy</span>,
    );
    const showModal = (id: string) => {
        setOpen(true);
        setOrderId(id);
    };
    const [openAdd, setOpenAdd] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [updateOrderStatus] = useUpdateOrderStatusMutation(); // Mutation để cập nhật trạng thái đơn hàng
    const handleAddModalClose = () => {
        setOpenAdd(false);
        setOpenUpdateModal(false);
    };
    const handleUpdateProduct = (orderId: string) => {
        setSelectedProduct(orderId);
        setOpenUpdateModal(true);

        console.log(orderId)
    };
    const handleUpdateComplete = () => {
        setSelectedProduct('');
        setOpenUpdateModal(false);
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
                                                        {order.status === Status.COMPLETE ? (

                                                            <div className="flex space-x-4 mt-4">
                                                                <div className="flex space-x-4 mt-4">
                                                                    <div className="px-1 md:ml-0 ml-20">


                                                                        <Button
                                                                            type="dashed"
                                                                            className="bg-gree text-layer"
                                                                            onClick={() => handleUpdateProduct(order._id)}

                                                                        >
                                                                            Đánh giá
                                                                        </Button>


                                                                        <Modal
                                                                            title="Đánh giá sản phẩm"
                                                                            open={openUpdateModal}
                                                                            onCancel={handleAddModalClose}
                                                                            footer={null}
                                                                            destroyOnClose={true}
                                                                            width={900}
                                                                            style={{ maxWidth: 900 }}
                                                                            centered
                                                                        >
                                                                            {selectedProduct && (
                                                                                <OrderBinhluan orderId={selectedProduct} handleUpdateProduct={handleUpdateComplete} />


                                                                            )}
                                                                        </Modal>

                                                                    </div>
                                                                </div>

                                                            </div>
                                                        ) : (
                                                            <div className="flex space-x-4 mt-4">

                                                                <Button type="dashed" className='bg-gray-300 text-layer' disabled>
                                                                    Đánh giá
                                                                </Button>

                                                            </div>
                                                        )}
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
                                                                title: 'Chờ xác nhận',
                                                                status: order.status >= Status.INFORMATION ? 'finish' : 'wait',
                                                                icon: <BiSolidPurchaseTagAlt className="!text-primary" />,
                                                            },
                                                            {
                                                                title: 'Hàng đã xác nhận',
                                                                status: order.status >= Status.ORDER_CONFIRM ? 'finish' : 'wait',
                                                                icon: <MdConfirmationNumber className="!text-primary" />,
                                                            },
                                                            {
                                                                title: 'Đang giao hàng',
                                                                status: order.status >= Status.SHIPPING ? 'finish' : 'wait',
                                                                icon: <FaShippingFast className="!text-primary" />,
                                                            },
                                                            {
                                                                title: order.status === 0 ? 'Đã hủy' : 'Hoàn thành',
                                                                status:
                                                                    order.status >= Status.COMPLETE
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
                                                            {
                                                                title: 'Đánh giá',
                                                                status: order.status >= Status.DANHGIA ? 'finish' : 'wait',
                                                                icon: <MdDone className="!text-primary" />,
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
