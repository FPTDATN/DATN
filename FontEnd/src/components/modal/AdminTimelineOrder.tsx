import instance from '@/services/config';
import { IOrder } from '@/types/order';
import { Status } from '@/types/status';
import { Button, Drawer } from 'antd';
import { useEffect, useState } from 'react';
import { calculatePagination } from './pagination';
import ReactPaginate from 'react-paginate';

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

    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 20; // Số sản phẩm hiển thị trên mỗi trang
    const paginationOptions = {
        currentPage,
        perPage,
        totalCount: timelines?.length || 0,
        data: timelines || [],
    };

    const { pageCount, currentPageItems } = calculatePagination(paginationOptions);

    const handlePageChange = (selectedPage: any) => {
        setCurrentPage(selectedPage.selected);
    };

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        instance.get(`timeline`).then((res) => setTimelines(res.data));
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
                {currentPageItems.map((line) => {
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
                                            Ngày tạo : {new Date(line.createdAt).toLocaleTimeString()}
                                        </h1>
                                        <h3>{renderStatus(line.status)}</h3>
                                    </div>
                                    <h1 className="text-sm mt-2">
                                        Tên khách hàng :{' '}
                                        <span className="text-base font-semibold">{line.orderId.fullName}</span>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    );
                })}

                <ReactPaginate
                    previousLabel={'Quay lại'}
                    nextLabel={'Tiếp theo'}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination flex justify-center gap-1 text-xs font-medium'}
                    activeClassName={
                        'block h-8 w-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-blue-500'
                    }
                    pageClassName={
                        'block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900'
                    }
                    previousClassName={
                        'inline-flex  w-[60px] h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180'
                    }
                    nextClassName={
                        'inline-flex  w-[70px] h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180'
                    }
                    previousLinkClassName={'h-8 p-1 leading-6 '}
                    nextLinkClassName={'h-8 p-1 leading-6 '}
                    breakClassName={
                        'block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900'
                    }
                />
            </Drawer>
        </>
    );
};

export default AdminTimelineOrder;
