import React from 'react'

const Pay = () => {
    return (

        <div className="max-w-7xl mx-auto py-20 ">

            <form action="" className="flex" id="form-checkout">
                <div className="w-[700px] border-t-2">
                    <h2 className="text-xl font-semibold py-5">THÔNG TIN THANH TOÁN</h2>
                    <p className="py-3" id="">
                        <label htmlFor='' className="font-semibold">Họ Tên *</label> <br />
                        <span className="">
                            <input type="text" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 border py-2 pl-2" name="name" id="name1" placeholder="Họ tên..." />
                        </span>
                    </p>
                    <p className="py-3" id="">
                        <label htmlFor="" className="font-semibold">Địa chỉ *</label><br />
                        <span className="">
                            <input type="text" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 border py-2 pl-2" name="address" id="address" placeholder="Địa chỉ..." />
                        </span>
                    </p>
                    <p className="py-3" id="">
                        <label htmlFor="" className="font-semibold">Số điện thoại *</label><br />
                        <span className="">
                            <input type="text" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 border py-2 pl-2" name="phone" id="phone" placeholder="SĐT..." />
                        </span>
                    </p>
                    <p className="py-3" id="">
                        <label htmlFor="" className="font-semibold">Email *</label><br />
                        <span className="">
                            <input type="text" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 border py-2 pl-2" name="email" id="email" placeholder="Email..." />
                        </span>
                    </p>
                    <p className="py-3" id="">
                        <label htmlFor="" className="font-semibold">Ghi chú đơn hàng (Tùy chọn) *</label><br />
                        <span className="">
                            <textarea name="" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 border py-4 pl-2" id="note" placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn." ></textarea>
                        </span>
                    </p>
                </div>
                <div className="w-[500px] border-2 border-lime-500 ml-10 py-5 px-10">
                    <h2 className="text-xl font-semibold my-5">Đơn hàng của bạn</h2>
                    <table className="w-full">
                        <thead>
                            <tr className="border-b-2">
                                <th className="text-left text-lg">Sản Phẩm</th>
                                <th className=" text-lg text-right">Tổng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="px-1 opacity-70 py-2"></td>
                                <td className="text-lime-500 py-2 text-right"></td>
                            </tr>
                        </tbody>

                        <tfoot>
                            <tr className="border-b">
                                <th className="text-left py-2">Tổng phụ</th>
                                <td className="text-right py-2"><span className="text-lime-500"></span></td>
                            </tr>
                            <tr className="border-b">
                                <th className="text-left py-2">Giao hàng</th>
                                <td className="text-right py-2"><span>Giao hàng miễn phí</span></td>
                            </tr>
                            <tr className="border-b-2">
                                <th className="text-left py-2">Tổng</th>
                                <td className="text-right py-2"><span className="text-lime-500" id="total"></span></td>
                            </tr>
                        </tfoot>
                    </table>
                    {/* <p className="pt-5">Người nhận: ${user.email}</p> */}
                    <button type="submit" className="py-2 px-5 mt-5 bg-orange-500 hover:bg-orange-600 text-white">Đặt hàng</button>
                </div>
            </form>
        </div>



    )
}

export default Pay
