import { Button, Input, Modal, Space } from "antd";
import { SearchProps } from "antd/es/input";
import { useState } from "react";
import AddCategory from "../addCategory";
import UpdateCategory from "../updateCategory";

export const ListCaegory = () => {
    const { Search } = Input;
    const { confirm } = Modal;

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);


    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);



    const showDeleteConfirm = () => {
        confirm({
            title: 'Bạn có chắc muốn xóa không?',
            content: 'Danh mục sẽ xóa vĩnh viễn nếu bạn tiếp tục .',
            okText: 'Tiếp tục',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    return (
        <>

            <div className="relative overflow-x-auto">

                <div className="pb-4 bg-white dark:bg-gray-900 flex">
                    <div>
                        <Space direction="vertical">
                            <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
                        </Space>
                    </div>
                    <div className='bg-gray-400 ml-[20px] rounded-md'>
                        <Button type="primary" onClick={() => setOpen(true)}>
                            Thêm danh mục
                        </Button>
                        <Modal
                            title="Thêm danh mục"
                            centered
                            open={open}
                            onOk={() => setOpen(false)}
                            onCancel={() => setOpen(false)}
                            width={1000}

                        >
                            <AddCategory />
                        </Modal>
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 rounded-l-lg">
                                Tên danh mục
                            </th>

                            <th scope="col" className="px-6 py-3 rounded-r-lg">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white dark:bg-gray-800">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Apple MacBook Pro 17"
                            </th>

                            <td className="px-6 py-4">
                                <Button type="dashed" onClick={() => setOpenUpdate(true)}>
                                    Update
                                </Button>
                                <Modal
                                    title="Cập nhật danh mục"
                                    centered
                                    open={openUpdate}
                                    onOk={() => setOpenUpdate(false)}
                                    onCancel={() => setOpenUpdate(false)}
                                    width={1000}
                                >
                                    <UpdateCategory />
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
            </div>

        </>
    )
}