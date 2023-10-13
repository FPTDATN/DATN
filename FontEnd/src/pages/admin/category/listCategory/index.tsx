import { Button, Input, Modal, Popconfirm, Space, notification } from "antd";
import { SearchProps } from "antd/es/input";
import { useState } from "react";
import AddCategory from "../addCategory";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "@/services/category";
import Skeleton from "react-loading-skeleton";
import UpdateCategory from "../updateCategory";

const ListCategory = () => {
    const { Search } = Input;
    const { data, isLoading } = useGetCategoriesQuery();
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
    const [open, setOpen] = useState(false);
    const [mutate] = useDeleteCategoryMutation();
    const handleDelete = async (id: string) => {
        await mutate(id);
        notification.success({ message: "Xóa Thành Công" });
    };

    const handleAddCategory = () => {
        setOpen(true);
    };

    const handleModalClose = () => {
        setOpen(false);
    };
    const handleUpdateCategory = () => {
        setOpen(true);
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
                    <div className="bg-gray-400 ml-[20px] rounded-md">
                        <Button type="primary" onClick={handleAddCategory}>
                            Thêm danh mục
                        </Button>
                        <Modal
                            title="Thêm danh mục"
                            centered
                            open={open}
                            onOk={handleModalClose}
                            onCancel={handleModalClose}
                            width={1000}
                        >
                            <AddCategory handleModalClose={handleModalClose} />
                        </Modal>
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 rounded-l-lg">
                                Tên danh mục
                            </th>
                            <th scope="col" className="pl-24 py-3 rounded-r-lg">
                                thời gian
                            </th>
                            <th scope="col" className="pl-24 py-3 rounded-r-lg">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    {isLoading ? (
                        <tbody>
                            <tr>
                                <td colSpan={7}><Skeleton count={3} className='h-[98px]' /></td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody  >
                            {data?.docs.map((category) => (
                                <tr
                                    key={category._id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white pl-10"
                                    >
                                        {category.name}
                                    </th>
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white pl-10"
                                    >
                                        {category.createdAt}
                                    </th>
                                    <td className="pl-16 py-4 flex flex-nowrap">
                                       
                                  
                                        <Space wrap className="ml-2">
                                            <Popconfirm
                                                placement="topRight"
                                                title="Bạn Muốn Xóa ?"
                                                okText="OK"
                                                cancelText="Cancel"
                                                okButtonProps={{ style: { backgroundColor: 'red', color: 'white' } }}
                                                onConfirm={() => handleDelete(category._id)}
                                            >
                                                <Button type="link">Delete</Button>
                                            </Popconfirm>
                                        </Space>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </>
    );
};

export default ListCategory;

