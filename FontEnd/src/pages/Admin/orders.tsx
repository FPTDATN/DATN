// Import useState and useEffect if you haven't already

import { useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} from '@/api/order';
import React, { useEffect, useState } from 'react';

export const Orders = () => {
  const { data: orders, isLoading, isError } = useGetOrdersQuery();
  const updateOrderStatusMutation = useUpdateOrderStatusMutation();
  const [orderStatusOptions, setOrderStatusOptions] = useState<string[]>([]);

  useEffect(() => {
    if (orders) {
      const statusOptions = orders.map((order) => order.status);
      setOrderStatusOptions(statusOptions);
    }
  }, [orders]);

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    // Gọi mutation để cập nhật trạng thái của đơn hàng
    updateOrderStatusMutation.mutate({ _id: orderId, status: newStatus });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading orders.</div>;
  }

  const formatCreatedAt = (createdAt: any) => {
    const date = new Date(createdAt);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <div className="antialiased h-screen table table-fixed">
      <div className="flex justify-between p-6">
        <h1 className="text-2xl">List Orders</h1>
        {/* ... (Phần tìm kiếm) */}
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Code orders
              </th>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Date created
              </th>
              <th scope="col" className="px-6 py-3">
                Customer name
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Customer payments
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr
                key={order._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900"
                >
                  {order.orderNumber}
                </th>
                <td className="px-6 py-4">{order.product}</td>
                <td className="px-6 py-4">{formatCreatedAt(order.createdAt)}</td>
                <td className="px-6 py-4">{order.customerName}</td>
                <td className="px-6 py-4">
                  <select
                    id={`status-${order._id}`}
                    name={`status-${order._id}`}
                    value={order.status}
                    onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                  >
                    {orderStatusOptions.map((statusOption) => (
                      <option key={statusOption} value={statusOption}>
                        {statusOption}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4">${order.customerPayments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
