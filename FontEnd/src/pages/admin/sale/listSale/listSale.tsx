import { useState } from 'react';
import { Button, Input, Modal, Popconfirm, Space, Table } from 'antd';
import { SearchProps } from 'antd/es/input';
import { useGetDiscountsQuery, useDeleteDiscountsMutation } from '@/services/discount'
import Skeleton from 'react-loading-skeleton';
import UpdateSale from '../updateSale/updateSale';
import AddSale from '../addSale/index';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formartVND } from '@/utils/formartVND';

const ListSale = () => {
  const { Search } = Input;
  const { data, isLoading } = useGetDiscountsQuery();
  const [searchValue, setSearchValue] = useState('');
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedDiscount, setSelectedDiscountId] = useState('');
  const [mutate] = useDeleteDiscountsMutation();
  const handleSearch: SearchProps['onSearch'] = (value) => {
    setSearchValue(value.toLowerCase()); // Chuyển đổi giá trị tìm kiếm về chữ thường
  };
  const handleDelete = async (id: string) => {
    try {
      await mutate(id);
      toast.success('Xóa thành công');
    } catch (error) {
      toast.error('Xóa không thành công');
    }
  };

  const handleAddDiscount = () => {
    setOpenAddModal(true);
  };

  const handleModalClose = () => {
    setOpenAddModal(false);
    setOpenUpdateModal(false);
  };

  const handleUpdatediscount = (categoryId: string) => {
    setSelectedDiscountId(categoryId);
    setOpenUpdateModal(true);
  };

  const handleUpdateComplete = () => {
    setSelectedDiscountId('');
    setOpenUpdateModal(false);
  };

  const DiscountList = data?.docs.filter(category => category.code.toLowerCase().includes(searchValue)) || [];
  // Định nghĩa cấu trúc cột của bảng và cho phép sắp xếp
  const columns = [
    {
      title: 'Code Mã',
      dataIndex: 'code',
      key: 'code',
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    
    {
      title: 'Giá trị giảm giá(%)',
      dataIndex: 'discount',
      key: 'discount',
      sorter: (a, b) => a.discount - b.discount,
    },
    {
      title: 'Số lượng ',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: ' Đơn hàng >= số tiền (VND)  ',
      dataIndex: 'maxAmount',
      key: 'maxAmount',
      render: (text) => formartVND(text), // Use the formartVND function here
    },
    {
      title: 'Thời Gian tạo',
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Thời Gian kết thúc',
      dataIndex: 'endDate',
      key: 'endDate',
      sorter: (a, b) => new Date(a.endDate) - new Date(b.endDate),
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (text, record) => (
        <Space size="small">
          <Button  className='bg-gree' type="dashed" onClick={() => handleUpdatediscount(record._id)}>
            Update
          </Button>
          <Popconfirm
            placement="topRight"
            title="Bạn Muốn Xóa ?"
            okText="OK"
            cancelText="Cancel"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button className='bg-reds ' type="link">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

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
            <Button type="primary" className='bg-primary' onClick={handleAddDiscount}>
              Thêm mã giảm giá
            </Button>
          </div>
        </div>
        <Table
          dataSource={DiscountList}
          columns={columns}
          loading={isLoading}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
          onChange={(pagination, filters, sorter) => {
            // Xử lý sự kiện sắp xếp ở đây
            console.log(sorter);
          }}
        />
        <Modal title="Thêm mã giảm giá" centered open={openAddModal} onCancel={handleModalClose} footer={null}>
          <AddSale handleModalClose={handleModalClose} />
        </Modal>
        {/* Update */}
        <Modal
          title="Cập nhật mã giảm giá"
          centered
          open={openUpdateModal && !!selectedDiscount}
          onCancel={handleModalClose}
          footer={null}
        >
          {selectedDiscount && <UpdateSale categoryId={selectedDiscount} handleUpdateComplete={handleUpdateComplete} />}
        </Modal>
      </div>
      <ToastContainer />
    </>
  );
}

export default ListSale;
