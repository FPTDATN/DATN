import instance from '@/services/config';
import { IOrder } from '@/types/order';
import { Status } from '@/types/status';
import { Button, Drawer } from 'antd';
import { useEffect, useState } from 'react';

type TimeLine = {
    _id: string;
    orderId: IOrder;
    status: number;
    createdAt: Date;
    updatedAt: Date;
};

const AdminTimelineOrder = () => {
    const [open, setOpen] = useState(false);
    const [timelines, setTimelines] = useState<TimeLine[]>([]);
    const [count, setCount] = useState<number | null>(null);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        instance.get(`timeline`).then((res) => setTimelines(res.data.timelines));
    }, []);

    const renderStatus = (status: number) => {
        if (status === Status.INFORMATION) {
            return <span className="border px-2 py-1 bg-gray-300 text-black">Chưa xác nhận</span>;
        }

        if (status === Status.ORDER_CONFIRM) {
            return <span className="border px-2 py-1 bg-green-700 text-white">Đã xác nhận</span>;
        }

        if (status === Status.CANCELLED) {
            return <span className="border px-2 py-1 bg-red-700 text-white">Đã hủy</span>;
        }
    };

    return (
        <>
            <Button type="default" onClick={showDrawer}>
                Xem đơn hàng
            </Button>
            <Drawer
                width={600}
                title="Quản lý đơn hàng"
                placement={'right'}
                closable={false}
                onClose={onClose}
                open={open}
            >
                {timelines?.length === 0 ? (
                    <h1>Trống</h1>
                ) : (
                    timelines?.map((line) => {
                        return (
                            <div key={line._id}>
                                <div
                                    className={`transform transition cursor-pointer relative flex items-center px-6 py-4 ${
                                        line.status === Status.INFORMATION
                                            ? 'bg-gray-100 !text-black'
                                            : line.status === Status.ORDER_CONFIRM
                                            ? 'bg-green-500 !text-white'
                                            : 'bg-red-500 !text-white'
                                    } text-white rounded mb-3 shadow flex-col md:flex-row space-y-4 md:space-y-0`}
                                >
                                    <div className="flex-auto space-y-1">
                                        <div className="flex gap-x-2 items-center">
                                            <h1 className="text-sm">
                                                Ngày tạo : {new Date(line?.createdAt).toLocaleTimeString()}
                                            </h1>
                                            <h3>{renderStatus(line.status)}</h3>
                                        </div>
                                        <h1 className="text-sm mt-2">
                                            Tên khách hàng :{' '}
                                            <span className="text-base font-semibold">{line?.orderId?.fullName}</span>
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </Drawer>
        </>
    );
};

export default AdminTimelineOrder;
