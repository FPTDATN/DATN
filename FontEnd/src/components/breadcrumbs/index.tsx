import React from 'react';
import { useMeQuery } from '@/services/auth';
import { Breadcrumb } from 'antd';
import { FunctionComponent } from 'react';

interface BreadCrumbProps {}

const BreadCrumb: FunctionComponent<BreadCrumbProps> = () => {
  const { data: authData, isLoading } = useMeQuery();
  if (isLoading) {
    return null;
  }
  const orderId = authData?._id || '';

  return (
    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-while-800">
      <ul className="space-y-2 font-medium">
        <li>
          <a href="/details/view_account" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <span className="ms-3">Thông tin cá nhân </span>
          </a>
        </li>
        <li>
          <a href={`/details/orders/${orderId}`} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <span className="ms-3">Đơn hàng đã đăt</span>
          </a>
        </li>
        <li>
          <a href="/details/favourite" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <span className="ms-3">Sản phẩm yêu thích</span>
          </a>
        </li>
        <li>
          <a href="/details/sale" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <span className="ms-3">Mã giảm giá</span>
          </a>
        </li>
      </ul>
      {/* <Breadcrumb
        className=""
        items={[
          {
            href: '/details/view_account',
            title: 'Trang cá nhân',
          },
          {
            href: `/details/orders/${orderId}`,
            title: 'Đơn hàng đã mua',
          },
          {
            href: '/details/favourite',
            title: 'Sản phẩm yêu thích',
          },
          {
            href: '/details/sale',
            title: 'Mã giảm giá',
          },
        ]}
      /> */}
    </div>
  );
};

export default BreadCrumb;
