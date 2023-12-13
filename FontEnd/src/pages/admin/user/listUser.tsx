import { Button, Input, Modal, Space } from 'antd';
import { SearchProps } from 'antd/es/input';
import UpdateUser from './updateUser';
import { useGetAllUserQuery, useRemoveUserMutation } from '@/services/user';
import { Link, } from 'react-router-dom';
import Loading from '@/components/ui/Loading';
import { useState } from 'react';
import { calculatePagination } from '@/components/modal/pagination';
import ReactPaginate from 'react-paginate';
import { DatePicker } from 'antd';

const ListUser: React.FC = () => {
    const [dateRange, setDateRange] = useState([null, null]);

    const { data: userData, isLoading: userLoading } = useGetAllUserQuery({
        startDate: dateRange && dateRange[0] ? dateRange[0].format('YYYY-MM-DD') : '',
        endDate: dateRange && dateRange[1] ? dateRange[1].format('YYYY-MM-DD') : '',
    });
    const handleDateRangeChange = (dates: any, dateStrings: any) => {

        setDateRange(dates);
    };
    const { RangePicker } = DatePicker;
    const [deleteUser] = useRemoveUserMutation();

    const { Search } = Input;
    const { confirm } = Modal;
    const [open, setOpen] = useState(false);

    const onShow = () => {
        setOpen(true);
    };

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
    const showDeleteConfirm = (id: string) => {
        confirm({
            title: 'Bạn có chắc muốn xóa tài khoản này không?',
            content: 'Tài khoản se xóa vĩnh viễn nếu bạn tiếp tục .',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                await deleteUser(id);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    // limit
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 9; // Số sản phẩm hiển thị trên mỗi trang
    const categoryList = userData?.docs || [];

    const paginationOptions = {
        currentPage,
        perPage,
        totalCount: categoryList.length,
        data: categoryList,
    };

    const { pageCount, currentPageItems } = calculatePagination(paginationOptions);

    const handlePageChange = (selectedPage: any) => {
        setCurrentPage(selectedPage.selected);
    };
    return (
        <>
            {userLoading ? (
                <Loading />
            ) : (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900 p-3">
                        <div>
                            <div className="flex-grow text-right">
                                <RangePicker onChange={handleDateRangeChange} />
                            </div>

                        </div>
                        <div className="relative">

                            <Space direction="vertical">
                                <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
                            </Space>{' '}
                        </div>
                    </div>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Tài khoản
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Chức vụ
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Trạng thái
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPageItems.map((user) => (
                                <tr
                                    key={user._id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <th
                                        scope="row"
                                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src={user.avatar || 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'}
                                            alt="Jese image"
                                        />
                                        <div className="pl-3">
                                            <div className="text-base font-semibold">{user.username}</div>
                                            <div className="font-normal text-gray-500">{user.email}</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">{user.role}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Online
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link to={`/admin/user/update/${user._id}`}>
                                            <Button type="dashed" className='bg-gree text-layer' onClick={onShow}>
                                                Cập nhật
                                            </Button>
                                        </Link>

                                        <Space wrap className="ml-2 rounded-md">
                                            <Button onClick={() => showDeleteConfirm(user._id)} type="dashed" className='bg-reds text-layer'>
                                                Delete
                                            </Button>
                                        </Space>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                        <Modal
                            title="Update User"
                            centered
                            open={open}
                            onOk={() => setOpen(false)}
                            onCancel={() => setOpen(false)}
                            width={1000}
                        >
                            <UpdateUser />
                        </Modal>
                        <div className='mt-4 p-3 d-flex justify-content-start align-items-start'>
                            <ReactPaginate
                                previousLabel={'Quay lại'}
                                nextLabel={'Tiếp theo'}
                                breakLabel={'...'}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageChange}
                                containerClassName={'pagination flex justify-center gap-1 text-xs font-medium'}
                                activeClassName={'block h-8 w-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-blue-500'}
                                pageClassName={'block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900'}
                                previousClassName={'inline-flex  w-[60px] h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180'}
                                nextClassName={'inline-flex  w-[70px] h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180'}
                                previousLinkClassName={'h-8 p-1 leading-6 '}
                                nextLinkClassName={'h-8 p-1 leading-6 '}
                                breakClassName={'block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900'}
                            />
                        </div>
                    </table>
                </div>
            )}
        </>
    );
};

export default ListUser;
