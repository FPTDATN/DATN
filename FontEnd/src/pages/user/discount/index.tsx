import React from 'react';
import { useMeQuery } from '@/services/auth';
import { useGetUserByIdQuery, useAddDiscountCodeToUserMutation } from '@/services/user';
import { List, Card, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { formartVND } from '@/utils/formartVND';

const Discount_code = () => {
  const { data: userData } = useMeQuery();
  const user_id = userData?._id || '';
  const { data: userById } = useGetUserByIdQuery(user_id);

  const listMyVoucher = userById?.data?.discountCodes;

  const [addDiscountCodeToUser] = useAddDiscountCodeToUserMutation();

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  if (!userData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={listMyVoucher}
        renderItem={(voucher) => (
          <List.Item>
            <Card
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{`Mã giảm giá: ${voucher.code}`}</span>
                  <Button type="primary">
                    Áp dụng mã
                  </Button>
                </div>
              }
            >
              <p>Giảm giá: {voucher.discount}%</p>
              <p>Đơn hàng: {formartVND(voucher.maxAmount)}</p>
              <p>Ngày bắt đầu: {formatDate(voucher.startDate)}</p>
              <p>Ngày kết thúc : {formatDate(voucher.endDate)}</p>
              {/* Add more information as needed */}
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Discount_code;

 

