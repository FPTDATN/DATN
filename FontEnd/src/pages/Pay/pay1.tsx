import React from 'react'
import './pay1.css'
import qr from '../images/momo-upload-api-221003112148-638003929084418981.webp'
import momo from '../images/momo.png'

const Pay = () => {
    return (

        <div className="max-w-7xl mx-auto py-20 ">

            <form action="" className="flex" id="form-checkout">
                <div className="w-[700px] border-t-2">
                    <h2 className="text-xl font-semibold py-5">THÔNG TIN THANH TOÁN</h2>
                    <div className="mb-3 flex -mx-2">
                    <div className="px-2">
                        <label htmlFor="type1" className="flex items-center cursor-pointer">
                            <input type="radio" className="form-radio h-5 w-5 text-indigo-500" name="type" id="type1" checked />
                            <img src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png" className="h-8 ml-3" />
                        </label>
                    </div>
                    <div className="px-2">
                        <label htmlFor="type2" className="flex items-center cursor-pointer">
                            <input type="radio" className="form-radio h-5 w-5 text-indigo-500" name="type" id="type2" />
                            <img src={momo} className="h-8 ml-3" />
                        </label>
                    </div>
                </div>
                    <p className="py-3" id="">
                        <label htmlFor='' className="font-semibold">Tên chủ thẻ *</label> <br />
                        <span className="">
                            <input type="text" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 border py-2 pl-2" name="name" id="name1" placeholder="Name..." />
                        </span>
                    </p>
                    <p className="py-3" id="">
                        <label htmlFor="" className="font-semibold">Số thẻ *</label><br />
                        <span className="">
                            <input type="text" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 border py-2 pl-2" name="address" id="address" placeholder="0000 0000 0000 0000" />
                        </span>
                    </p>
                    <div className="mb-3 -mx-2 flex items-end">
                    <div className="px-2 w-1/2">
                        <label className="font-bold text-sm mb-2 ml-1">Ngày hết hạn</label>
                        <div>
                            <select className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                                <option value="01">01 - January</option>
                                <option value="02">02 - February</option>
                                <option value="03">03 - March</option>
                                <option value="04">04 - April</option>
                                <option value="05">05 - May</option>
                                <option value="06">06 - June</option>
                                <option value="07">07 - July</option>
                                <option value="08">08 - August</option>
                                <option value="09">09 - September</option>
                                <option value="10">10 - October</option>
                                <option value="11">11 - November</option>
                                <option value="12">12 - December</option>
                            </select>
                        </div>
                    </div>
                    <div className="px-2 w-1/2">
                        <select className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                        </select>
                    </div>
                </div>
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
                    <h2 className="text-xl font-semibold my-5">Thanh toán bằng mã QR</h2>
                    <img src={qr} alt="" width={"80px"} />
                </div>
            </form>
            
        </div>


    )
}

export default Pay