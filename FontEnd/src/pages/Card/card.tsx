import React from 'react'
import { Link } from 'react-router-dom';

const Card = () => {
    const [showModal, setShowModal] = React.useState(false);
    return (
        <div className="max-w-7xl mx-auto py-10 grid grid-cols-2 gap-8">
            <div className="">
                <table>
                        <thead>
                            <tr className = "border-b-4">
                                <th className = "text-left text-lg">Sản phẩm</th>
                                <th className = "text-lg">Giá</th>
                                <th className = "text-lg">Số lượng</th>
                                <th className = "text-lg">Tổng</th>
                            </tr>
                        </thead>   
                    <tbody>
                        <tr className = "border-b py-4">
                            <td className = " text-center flex items-center py-4">
                            <button className="btn btn-remove border px-1 rounded opacity-70 hover:opacity-100 hover:text-red-500 mx-2"><i className="fa-solid fa-xmark"></i></button>
                            <img className = "w-1/6 mr-2" src="${item.img}" alt=""/>
                            </td>
                            <td className = " text-center py-4 text-lime-500"></td>
                            <td className = " text-center py-4 px-4 flex "><button data-id="${item.id}" className="btn btn-decrease border"><i className="fa-solid fa-minus"></i></button><button className="px-2 border"></button><button data-id="${item.id}" className="btn btn-increase border"><i className="fa-solid fa-plus"></i></button></td>
                            <td className = " text-center py-4 text-lime-500"></td>
                        
                        </tr>
                    </tbody>
                    </table>
                <h1 className="text-center text-3xl text-red-500">Giỏ hàng Trống!</h1>
            </div>
            <div className="pl-10 border-l" id="check">
               {/* <div className="text-center">
                 <p>Email: ${auth.email}</p>
                 <p>UserName: ${user.username}</p>
               </div> */}
                <table className="max-w-full">
                    <thead className="border-b-4">
                        <th className="text-lg">Tổng số lượng</th>
                        <th></th>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td >
                                Tổng Phụ
                            </td>
                            <td className="py-5">
                                <h2 className="pl-[400px] text-lime-500"></h2>
                            </td>
                            
                        </tr>
                    </tbody>
                </table>
                <div className="flex justify-between border-b py-4">
                    <div>
                        <p>Giao hàng</p>
                    </div>
                     <div>
                        <p>Giao hàng miễn phí</p>
                        <p>Đây chỉ là ước tính.
                        Giá sẽ cập nhật trong quá trình thanh toán.</p>
                        
                    </div>
                </div>
                <table className="border-b-2 py-4">
                    <thead>
                        <th></th>
                        <th></th>
                    </thead>
                    <tbody className=""> 
                        <tr >
                            <td>Tổng</td>
                            <td>
                                 <h2 className="pl-[480px] text-lime-500"></h2>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-center border py-2 mt-3 bg-orange-700 text-white hover:bg-orange-800">
                {/* <a className="text-xl" href="/pay">
                    Tiến Hành Thanh Toán
                </a> */}
                <button
        className="text-xl"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Tiến hành thanh toán
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Chọn phương thức thanh toán
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <Link to="/pay">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Thanh toán trực tiếp
                  </button>
                  </Link>
                  <Link to="/paycard">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Thanh toán qua thẻ
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
               </div>
            </div>
        </div>
    )
}

export default Card
