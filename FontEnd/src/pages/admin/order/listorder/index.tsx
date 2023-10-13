import { useGetsOrderQuery, useUpdateOrderStatusMutation } from '@/services/order';
import Skeleton from 'react-loading-skeleton';
// import React, { useState } from 'react';

const ListOrder: React.FC = () => {
  const { data, isLoading } = useGetsOrderQuery();
  const [changeOrderStatus] = useUpdateOrderStatusMutation();

  const handleChangeStatus = async (orderId: string, newStatus: string) => {
    try {
      await changeOrderStatus({ orderId, status: newStatus }); // Thay đổi "status" thành "newStatus" để truyền đúng dữ liệu

      // Dữ liệu được cập nhật thành công
      console.log(`Đã cập nhật trạng thái ${newStatus} cho đơn hàng với ID ${orderId}`);
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="pb-4 bg-white dark:bg-gray-900 flex"></div>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 text-xs font-medium py-3">
                Stt
              </th>
              <th scope="col" className="text-center text-xs font-medium py-3">
                Tên khách hàng
              </th>
              <th scope="col" className="text-center text-xs font-medium py-3">
                Số Lượng
              </th>
              <th scope="col" className="text-center text-xs font-medium py-3">
                Trạng Thái
              </th>
              <th scope="col" className="text-center text-xs font-medium py-3">
                Khách Phải trả
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
              {data?.docs.map((order) => (
                <tr
                  key={order._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">{order.orderNumber}</td>
                  <td>{order.buyers[0]?.fullName}</td>
                  <td className="px-6 py-4">{order.products[0]?.quantity}</td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status} 
                      onChange={(e) => handleChangeStatus(order._id, e.target.value)}
                    >
                      <option value="Đang xử lý">Đang xử lý</option>
                      <option value="Chờ xác nhận">Chờ xác nhận</option>
                      <option value="Đã giao hàng">Đã giao hàng</option>
                      <option value="Đã hủy">Đã hủy</option>
                    </select>
                  </td>
                  <td>{order.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};

export default ListOrder;
