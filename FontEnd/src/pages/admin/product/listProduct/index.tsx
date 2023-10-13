import { Button, Input, Modal, Popconfirm, Space, Tag, notification } from 'antd';
import { SearchProps } from 'antd/es/input';
import { useState } from 'react';
import AddProduct from '../addProduct';
import UpdateProduct from '../updateProduct';
import { useGetProductsQuery, useDeleteProductMutation } from '@/services/product';
import Skeleton from 'react-loading-skeleton';
const { confirm } = Modal;

const ListProduct: React.FC = () => {
    const { data, isLoading, } = useGetProductsQuery();
   
    const { Search } = Input;

    const [open, setOpen] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);



    const [mutate] = useDeleteProductMutation();
    const handleDelete = async (id: string) => {
        await mutate(id);
        notification.success({ message: "Delete Product Sucess" });
    };

    const renderArray = (arr: any[]) => {
        return arr.map((item) => <Tag key={item._id}>{item.name}</Tag>);
    };

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
                    <div className="bg-gray-400 ml-[20px] rounded-md">
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

                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400  ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className=" pl-6 text-xs font-medium py-3">
                                Ảnh
                            </th>
                            <th scope="col" className=" text-center text-xs font-medium py-3">
                                Tên sản phẩm
                            </th>
                            <th scope="col" className=" text-center text-xs font-medium py-3">
                                Màu sắc
                            </th>
                            <th scope="col" className=" text-center text-xs font-medium py-3">
                                Số Lượng
                            </th>
                            <th scope="col" className=" text-center text-xs font-medium py-3">
                                Danh mục
                            </th>
                            <th scope="col" className="pr-4 text-center text-xs font-medium py-3">
                                Giá
                            </th>
                            <th scope="col" className=" pr-40 text-center text-xs font-medium py-3">
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
                            {data?.docs.map((product) => (
                                <tr
                                    key={product._id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <td className="pl-4">
                                        <img
                                            className="w-[76px] h-[76px] object-cover"
                                            src={product.images[0]}
                                            alt={product.name}
                                        />
                                    </td>
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white pl-10"
                                    >
                                        {product.name}
                                    </th>
                                    <td className="px-6 py-4">{renderArray(product.colorId!)}</td>
                                    <td className="py-4 pl-11">{product.quantity}</td>
                                    <td className="pl-8 py-4">{product.categoryId?.name}</td>
                                    <td className="pl-10 py-4">{product.price}</td>
                                    <td className="pl-16 py-4 flex flex-nowrap">
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
                                        <Space wrap className="ml-2">
                                            <Popconfirm
                                                placement="topRight"
                                                title="Bạn Muốn Xóa ?"
                                                okText="OK"
                                                cancelText="Cancel"
                                                 okButtonProps={{ style: { backgroundColor: 'red', color: 'white' } }}
                                                onConfirm={() => handleDelete(product._id)}
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


export default ListProduct
