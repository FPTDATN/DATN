import { Avatar, Button, Image, Input, Modal, Popconfirm, Space } from 'antd';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import AddProduct from '../addProduct';
import UpdateProduct from '../updateProduct';
import { useGetProductsQuery, useDeleteProductMutation } from '@/services/product';
import Skeleton from 'react-loading-skeleton';
import { SearchProps } from 'antd/es/input';
import { ProductType } from '@/types/Product';

const ListProduct: React.FC = () => {
  const { data, isLoading } = useGetProductsQuery();
  const { Search } = Input;

  const [openAdd, setOpenAdd] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [mutate] = useDeleteProductMutation();
  const [searchValue, setSearchValue] = useState('');
  const handleSearch: SearchProps['onSearch'] = (value) => {
    setSearchValue(value);
  };
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  

  const handleAddModalOpen = () => {
    setOpenAdd(true);
  };

  const handleAddModalClose = () => {
    setOpenAdd(false);
    setOpenUpdateModal(false);
  };

  const handleUpdateProduct = (productId: string) => {
    setSelectedProduct(productId);
    setOpenUpdateModal(true);
  };

  const handleUpdateComplete = () => {
    setSelectedProduct('');
    setOpenUpdateModal(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await mutate(id);
      toast.success('Xóa thành công');
    } catch (error) {
      toast.error('Xóa không thành công');
    }
  };
  useEffect(() => {
    if (searchValue) {
      const filtered = data?.docs.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredProducts(filtered || []);
    } else {
      setFilteredProducts(data?.docs || []);
    }
  }, [data, searchValue]);
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="pb-4 bg-white dark:bg-gray-900 flex">
          <div className="pr-4">
            <Space direction="vertical">
              <Search placeholder="input search text" onSearch={handleSearch} style={{ width: 200 }} />
            </Space>
          </div>
          <Button type="primary" className="bg-primary" onClick={handleAddModalOpen}>
            Add Product
          </Button>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="pl-6 text-xs font-medium py-3">
                Ảnh
              </th>
              <th scope="col" className="text-center text-xs font-medium py-3">
                Tên sản phẩm
              </th>
              <th scope="col" className="text-center text-xs font-medium py-3">
                Số Lượng
              </th>
              <th scope="col" className="text-center text-xs font-medium py-3">
                Mô Tả
              </th>
              <th scope="col" className="text-center text-xs font-medium py-3">
                Danh mục
              </th>
              <th scope="col" className="pr-4 text-center text-xs font-medium py-3">
                Giá
              </th>
              <th scope="col" className="pr-40 text-center text-xs font-medium py-3">
                Thao tác
              </th>
            </tr>
          </thead>
          {isLoading ? (
            <tbody>
              <tr>
                <td colSpan={7}>
                  <Skeleton count={3} className="h-[98px]" />
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="pl-4">
                    <Avatar.Group maxCount={3}>
                      {product.images?.map((url) => (
                        <div key={url} style={{ borderRadius: '50%', overflow: 'hidden' }}>
                          <Image src={url} alt="image" width={50} height={50} style={{ objectFit: 'cover' }} />
                        </div>
                      ))}
                    </Avatar.Group>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {product.name}
                  </td>
                  <td className="text-center py-4">{product.quantity}</td>
                  <td className="text-center py-4">{product.description}</td>
                  <td className="text-center py-4">{product.categoryId?.name}</td>
                  <td className="pr-4 text-center py-4">{product.price}</td>
                  <td className="pr-4 py-4">
                    <Space size="middle">
                      <Button type="dashed"onClick={() => handleUpdateProduct(product._id)}>
                        Update
                      </Button>
                   
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

      <Modal
        title="Add Product"
        open={openAdd}
        onCancel={handleAddModalClose}
        footer={null}
        destroyOnClose={true}
        width={600}
        centered
      >
        <AddProduct handleModalClose={handleAddModalClose} />
      </Modal>

      <Modal
        title="Update Product"
        open={openUpdateModal}
        onCancel={handleUpdateComplete}
        footer={null}
        destroyOnClose={true}
        width={600}
        centered
      >
        
        {selectedProduct && <UpdateProduct productId={selectedProduct} handleUpdateProduct={handleUpdateComplete} />}
      </Modal>
    </>
  );
};

export default ListProduct;