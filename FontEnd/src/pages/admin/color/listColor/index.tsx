import { useState } from 'react';
import { Button, Input, Modal, Popconfirm, Space } from 'antd';
import { SearchProps } from 'antd/es/input';
import Skeleton from 'react-loading-skeleton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { calculatePagination } from '@/components/modal/pagination';
import ReactPaginate from 'react-paginate';
import { useGetAllColorQuery, useRemoveColorMutation } from '@/services/color';
import AddColor from '../addColor';
import UpdateColor from '../updateColor';

const ListColor = () => {
  const { Search } = Input;
  const { data, isLoading } = useGetAllColorQuery();
  const [searchValue, setSearchValue] = useState('');
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedColorId, setSelectedColorId] = useState('');
  const [mutate] = useRemoveColorMutation();

  const handleSearch: SearchProps['onSearch'] = (value) => {
    setSearchValue(value);
  };

  const handleDelete = async (id: string) => {
    try {
      await mutate(id);
      toast.success('Xóa thành công');
    } catch (error) {
      toast.error('Xóa không thành công');
    }
  };

  const handleAddCategory = () => {
    setOpenAddModal(true);
  };

  const handleModalClose = () => {
    setOpenAddModal(false);
    setOpenUpdateModal(false);
  };

  const handleUpdateCategory = (id: string) => {
    setSelectedColorId(id);
    setOpenUpdateModal(true);
  };

  const handleUpdateComplete = () => {
    setSelectedColorId('');
    setOpenUpdateModal(false);
  };

  // limit
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 2; // Số sản phẩm hiển thị trên mỗi trang
  const colorList = data?.docs.filter(color => color.name.includes(searchValue)) || [];

  const paginationOptions = {
    currentPage,
    perPage,
    totalCount: colorList.length,
    data: colorList,
  };

  const { pageCount, currentPageItems } = calculatePagination(paginationOptions);

  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage.selected);
  };
  return (
    <>
      <div className="relative overflow-x-auto">
        <div className="pb-4 bg-white dark:bg-gray-900 flex">
          <div>
            <Space direction="vertical">
              <Search placeholder="input search text" onSearch={handleSearch} style={{ width: 200 }} />
            </Space>
          </div>
          <div className="bg-gray-400 ml-[20px] rounded-md">
            <Button type="primary" className='bg-primary' onClick={handleAddCategory}>
              Thêm Color
            </Button>
          </div>
        </div>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="pl-6 text-xs font-medium py-3">
                Tên Color
              </th>
              <th scope="col" className="text-center text-xs font-medium py-3">
                Thời Gian
              </th>
              <th scope="col" className="text-center text-xs font-medium py-3">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7}>
                  <Skeleton count={3} className="h-[98px]" />
                </td>
              </tr>
            ) : (
              <>
                {currentPageItems?.map((category) => (
                  <tr
                    key={category._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white pl-6">
                      {category.name}
                    </td>
                    <td className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                      {new Date(category.createdAt).toLocaleString()}
                    </td>
                    <td className="py-4 flex items-center justify-center">
                      <Space size="small">
                        <Button type="dashed" className='bg-gree text-layer' onClick={() => handleUpdateCategory(category._id)}>
                          Update
                        </Button>
                        <Popconfirm
                          placement="topRight"
                          title="Bạn Muốn Xóa ?"
                          okText="OK"
                          cancelText="Cancel"
                          okButtonProps={{ style: { backgroundColor: 'red', color: 'white' } }}
                          onConfirm={() => handleDelete(category._id)}
                        >
                          <Button type="link" className='bg-reds text-layer'>Delete</Button>
                        </Popconfirm>
                      </Space>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
          <div className='mt-4 d-flex justify-content-start align-items-start'>
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

        <Modal title="Thêm Color" centered open={openAddModal} onCancel={handleModalClose} footer={null}>
          <AddColor handleModalClose={handleModalClose} />
        </Modal>
        {/* Update */}
        <Modal
          title="Cập nhật danh mục"
          centered
          open={openUpdateModal && !!selectedColorId}
          onCancel={handleModalClose}
          footer={null}
        >
          {selectedColorId && <UpdateColor id={selectedColorId} handleUpdateComplete={handleUpdateComplete} />}
        </Modal>
        
      </div>
      <ToastContainer />
    </>
  );
};

export default ListColor;