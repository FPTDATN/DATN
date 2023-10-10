import { Button, Input, Modal, Space } from 'antd';
import { SearchProps } from "antd/es/input";
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import AddProduct from '../addProduct';
import UpdateProduct from '../updateProduct';
const { confirm } = Modal;

export const ListProduc: React.FC = () => {

    const { Search } = Input;

    const [open, setOpen] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);


    const showDeleteConfirm = () => {
        confirm({
            title: 'Bạn có chắc muốn xóa sản phẩm này không?',
            content: 'Sản phẩm se xóa vĩnh viễn nếu bạn tiếp tục .',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const suffix = (
        <AiOutlineSearch
            style={{
                fontSize: 16,
                color: '#1677ff',
            }}
        />
    );
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                <div className="pb-4 bg-white dark:bg-gray-900 flex">
                    <div>
                        <Space direction="vertical">
                            <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
                        </Space>
                    </div>
                    <div className='bg-gray-400 ml-[20px] rounded-md'>
                        <Button type="primary" onClick={() => setOpenAdd(true)}>
                            Add Product
                        </Button>
                        <Modal
                            title="Add Product"
                            centered
                            open={openAdd}
                            onOk={() => setOpenAdd(false)}
                            onCancel={() => setOpenAdd(false)}
                            width={1000}

                        >
                            <AddProduct />
                        </Modal>
                    </div>
                </div>

                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Ảnh</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tên sản phẩm
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Màu sắc
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Số Lượng
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Danh mục
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Giá
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                            <td className="w-32 p-4">
                                <img className="w-[80] h-[40]"
                                    src="https://bizweb.dktcdn.net/thumb/grande/100/212/791/products/den-tron-e0107bd2-7e93-4407-97e6-a431963f8d04.jpg?v=1623418670430"
                                    alt="Apple Watch" />
                            </td>
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4">
                                Silver
                            </td>
                            <td className="px-6 py-4">
                                100
                            </td>
                            <td className="px-6 py-4">
                                Laptop
                            </td>
                            <td className="px-6 py-4">
                                $2999
                            </td>
                            <td className="px-6 py-4">
                                <Button type="dashed" onClick={() => setOpen(true)}>
                                    Update
                                </Button>
                                <Modal
                                    title="Update Product"
                                    centered
                                    open={open}
                                    onOk={() => setOpen(false)}
                                    onCancel={() => setOpen(false)}
                                    width={1000}
                                >
                                    <UpdateProduct />
                                </Modal>
                                <Space wrap className='ml-2'>
                                    <Button onClick={showDeleteConfirm} type="dashed">
                                        Delete
                                    </Button>
                                </Space>
                            </td>
                        </tr>


                    </tbody>
                </table>
            </div >

        </>
    )
}