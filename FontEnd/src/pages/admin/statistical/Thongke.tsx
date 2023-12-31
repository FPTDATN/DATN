import AdminMobileMenu from "@/components/modal/AdminMobileMenu";
import { useLogoutMutation, useMeQuery } from "@/services/auth";
import { useGetAccountCommentsQuery } from "@/services/comment";
import { useCalculateRevenueByMonthQuery, useCalculateRevenueByYearQuery, useGetOrderStatisticsQuery, useGetRevenueByDaysQuery, useGetRevenueStatisticsQuery } from "@/services/order";
import { useGetTotalProductQuery } from "@/services/product";
import { useGetAccountQuery } from "@/services/user";
import { formartVND } from "@/utils/formartVND";
import { Dropdown, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
const Thongke = () => {
    const { data: DataComment } = useGetAccountCommentsQuery();
    const { data: DataUser } = useGetAccountQuery()
    const { data: revenueData } = useGetRevenueStatisticsQuery()
    const { data: totalProduct } = useGetTotalProductQuery()
    const { data: DataOrders } = useGetOrderStatisticsQuery()
    const usage = DataUser?.usage ?? 0;
    const totalComments = DataComment?.totalComments ?? 0;
    const totalP = totalProduct?.total ?? 0;
    const totalRevenue = revenueData?.totalRevenue ?? 0;
    const totalTotal = DataOrders?.totalOrders ?? 0;
    const { data: authData } = useMeQuery();
    const isAdmin = authData?.role === 'admin';

    const items: MenuProps['items'] = [

        {
            label: (
                <Link className="text-base" to={'/admin/revenue'}>
                    Thống kê theo ngày 
                </Link>
            ),
            key: '0',
        },
        {
            label: (
                <Link className="text-base" to={'/admin/revenueMoth'}>
                    Thống kê theo tháng 
                </Link>
            ),
            key: '1',
        },
        {
            label: (
                <Link className="text-base" to={'/admin/revenueYear'}>
                    Thống kê theo năm
                </Link>
            ),
            key: '2',
        },
    ];

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <article className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
                    <div className="flex items-center justify-end">
                        <div className="rounded bg-green-100 p-1 text-green-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                />
                            </svg>
                        </div>
                    </div>

                    <div>
                        <strong className="block text-sm font-medium text-gray-500"> Bình luận </strong>

                        <p className="flex items-center">
                            <span className="text-2xl font-medium text-gray-900"> {totalComments} </span>
                            <span className="text-xs text-gray-500"> bình luận </span>
                        </p>
                    </div>
                </article>
                <article className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
                    <div className="flex items-center justify-end">
                        <div className="rounded bg-green-100 p-1 text-green-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                />
                            </svg>
                        </div>
                    </div>

                    <div>
                        <strong className="block text-sm font-medium text-gray-500"> Sản phẩm</strong>

                        <p className="flex items-center">
                            <span className="text-2xl font-medium text-gray-900"> {totalP} </span>
                            <span className="text-xs text-gray-500"> Tổng số sản phẩm hiện có </span>
                        </p>
                    </div>
                </article>
                {isAdmin && (
                    <article className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
                        <div className="flex items-center justify-end">
                            <div className="rounded bg-green-100 p-1 text-green-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <strong className="block text-sm font-medium text-gray-500"> User </strong>
                            <p className="flex items-center">
                                <span className="text-2xl font-medium text-gray-900"> {usage}</span>
                                <span className="text-xs text-gray-500"> user </span>
                            </p>
                        </div>
                    </article>
                )}
                <article
                    className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6"
                >
                    <div
                        className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            />
                        </svg>
                    </div>

                    <div>
                        <strong className="block text-sm font-medium text-gray-500"> Tổng đơn hàng </strong>

                        <p>
                            <span className="text-2xl font-medium text-gray-900"> {totalTotal}</span>

                            <span className="text-xs text-gray-500"> đơn hàng </span>
                        </p>
                    </div>

                </article>
                < article className="flex flex-col  rounded-lg border border-gray-100 bg-white p-6">

                    <div>
                        <Dropdown
                            arrow
                            trigger={['click']}
                            placement="bottomRight"
                            menu={{ items }}
                        >
                            <button
                                type="button"
                                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                aria-expanded="false"
                                data-dropdown-toggle="dropdown-user"
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                        </Dropdown>
                    </div>
                    <div className="flex items-center justify-end">
                        <div className="rounded bg-green-100 p-1 text-green-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                />
                            </svg>
                        </div>
                    </div>

                    <div>
                        <strong className="block text-sm font-medium text-gray-500"> Doanh thu </strong>

                        <p className="flex items-center">
                            <span className="text-2xl font-medium text-gray-900"> {formartVND(totalRevenue)} </span>
                            <span className="text-xs text-gray-500"> VND </span>
                        </p>
                    </div>
                </article>
                
            </div>


            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                    </p>
                </div>
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                    </p>
                </div>
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                    </p>
                </div>
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                    </p>
                </div>
            </div>
        </>
    )
}
export default Thongke;