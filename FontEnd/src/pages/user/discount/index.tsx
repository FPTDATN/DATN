import { useState } from 'react';
import { useGetAllDiscountUsersQuery } from "@/services/discountuser";
import { List, Card, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { formartVND } from '@/utils/formartVND';

const Discount_code = () => {
      const { data: discounts, isLoading, isError } = useGetAllDiscountUsersQuery();
      const [modalVisible, setModalVisible] = useState(false);
      const [selectedDiscount, setSelectedDiscount] = useState(null);

      if (isLoading) {
            return <div>Đang tải...</div>;
      }

      if (isError || !discounts) {
            return <div>Có lỗi xảy ra khi tải dữ liệu</div>;
      }
      if (isError) {
            return <div>Có lỗi xảy ra khi tải dữ liệu</div>;
        }
    
        if (!discounts || discounts.docs.length === 0) {
            return <div className='text-2xl '>Không có mã giảm giá</div>;
        }
      // Hàm chuyển đổi thời gian từ timestamp sang ngày tháng bình thường
      const formatDate = (timestamp) => {
            const date = new Date(timestamp);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
      };

      // Xử lý khi nhấn nút "Dùng mã"
      const handleUseDiscount = (discount) => {
            const currentTime = new Date().getTime();
            const remainingTime = discount.endDate - currentTime;
            const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
            const expired = remainingDays < 0;
            setSelectedDiscount({
                  ...discount,
                  remainingTime,
                  remainingDays,
                  expired,
                });
                setModalVisible(true);
      };

      // Đóng Modal
      const handleCloseModal = () => {
            setModalVisible(false);
      };

      return (
            <div>
                  <h1>Danh sách mã giảm giá</h1>
                  <List
                        style={{ background: '', padding: '20px', borderRadius: '8px' }}
                        grid={{ gutter: 20, column: 3 }}
                        dataSource={discounts.docs}
                        renderItem={(discount) => (
                              <List.Item>
                                    <Card
                                          title={
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                      <span>Mã giảm giá :{discount.discount}%</span>
                                                      <Button className="text-layer bg-gree">
                                                            <Link to={`/checkout`}>Dùng mã</Link>
                                                            
                                                      </Button>

                                                </div>
                                          }
                                    >
                                          <p>Giảm: {discount.discount}%</p>
                                          <p>Giá trị tối đa: {formartVND(discount.maxAmount)}</p>
                                          <p>Ngày bắt đầu: {formatDate(discount.startDate)}</p>
                                          <p>Ngày kết thúc: {formatDate(discount.endDate)}</p>
                                          <Button className="text-primary bg-reds my-3" onClick={() => handleUseDiscount(discount)}>
                                                Xem chi tiết
                                          </Button>
                                    </Card>
                              </List.Item>
                        )}
                  />
                  {/* Modal */}
                  <Modal
                        title={selectedDiscount ? selectedDiscount.code : ''}
                        visible={modalVisible}
                        onCancel={handleCloseModal}
                        footer={null}
                  >
                        {/* Nội dung của Modal */}
                        {selectedDiscount && (
                              <>
                                    <p>Giảm: {selectedDiscount.discount}</p>
                                    <p>Số lượng: {selectedDiscount.count}</p>
                                    <p>Giá trị tối đa: {selectedDiscount.maxAmount}</p>
                                    <p>Ngày bắt đầu: {formatDate(selectedDiscount.startDate)}</p>
                                    <p>Ngày kết thúc: {formatDate(selectedDiscount.endDate)}</p>

                                    {/* Thêm thông tin thời gian còn lại và trạng thái */}
                              </>
                        )}
                  </Modal>
            </div>
      );
};

export default Discount_code;
 

