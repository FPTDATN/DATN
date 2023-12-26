import { useCalculateRevenueByMonthQuery } from "@/services/order";
import { useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const RevenueMoth = () => {
    const { data: revenueByMonthData } = useCalculateRevenueByMonthQuery();
    return (
        <div className='pt-4'>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="pl-6 text-xs font-medium py-3">
                        Thống kê theo tháng
                    </th>
                </tr>
            </thead>
            <div className="flex items-center justify-center rounded  ">
                <BarChart width={600} height={300} data={revenueByMonthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="monthYear" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalRevenue" fill="#8884d8" barSize={20} />
                </BarChart>
            </div>
        </div>
    )
}

export default RevenueMoth
