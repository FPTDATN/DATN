import { useCalculateRevenueByYearQuery } from '@/services/order';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const RevenueYear = () => {
    const { data: revenueByYearData } = useCalculateRevenueByYearQuery()
  return (
    <div className='pt-4'>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="pl-6 text-xs font-medium py-3">
                        Thống kê theo năm
                    </th>
                </tr>
            </thead>
            <div className="flex items-center justify-center rounded  ">
                <BarChart width={600} height={300} data={revenueByYearData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalRevenue" fill="#8884d8" barSize={20} />
                </BarChart>
            </div>
        </div>
  )
}

export default RevenueYear
