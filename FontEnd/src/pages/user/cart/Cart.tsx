import { decrease, increase, remove } from '@/slices/cart';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { reduceTotal } from '@/utils/reduce';
import { Button } from 'antd';
import { FunctionComponent } from 'react';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';

interface CartProps {}

const Cart: FunctionComponent<CartProps> = () => {
    const { cartItems } = useAppSelector((state) => state.cart);

    const dispatch = useAppDispatch();

    return (
        <div className="px-6">
            <h2 className="text-3xl font-semibold dark:text-gray-400 mb-8 mt-4">Giỏ hàng của bạn</h2>
            {cartItems.length === 0 ? (
                <h1 className="text-2xl text-center py-20">Bạn chả có cái gì trong đây cả 😠😠😠</h1>
            ) : (
                <div>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Tên
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Ảnh
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Màu
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Size
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Loại
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Giá
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Số lượng
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Hành động
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {item.name}
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <img
                                                className="w-14 h-14 object-cover"
                                                src={item?.images[0]}
                                                alt={item.name}
                                            />
                                        </th>
                                        <td className="px-6 py-4">{item.colorId}</td>
                                        <td className="px-6 py-4">{item.sizeId}</td>
                                        <td className="px-6 py-4">{item?.categoryId?.name}</td>
                                        <td className="px-6 py-4">${item?.price * item?.quantity}</td>
                                        <td className="px-6 py-4">
                                            <Button onClick={() => dispatch(decrease(item._id))}>
                                                <RiSubtractLine />
                                            </Button>
                                            <span className='mx-3'>{item.quantity}</span>
                                            <Button onClick={() => dispatch(increase(item._id))}>
                                                <RiAddLine />
                                            </Button>
                                        </td>
                                        <td className="px-6 py-4 flex flex-nowrap items-center">
                                            <Button >Sửa</Button>
                                            <Button onClick={() => dispatch(remove(item._id))} className='ml-2' danger>Xóa</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <section className="flex items-center font-poppins dark:bg-gray-700 ">
                        <div className="justify-center flex-1 px-4 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
                            <div className="bg-gray-50 dark:bg-gray-800">
                                <div className="">
                                    <div className="w-full px-4 xl:w-4/12">
                                        <div className="p-6 border border-blue-100 dark:bg-gray-900 dark:border-gray-900 bg-blue-50 md:p-8">
                                            <h2 className="mb-8 text-2xl font-bold text-gray-700 dark:text-gray-400">
                                                Order Summary
                                            </h2>
                                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-300 dark:border-gray-700 ">
                                                <span className="text-gray-700 dark:text-gray-400">Tổng phụ</span>
                                                <span className="text-xl font-bold text-gray-700 dark:text-gray-400 ">
                                                    ${reduceTotal(cartItems)}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between pb-4 mb-4 ">
                                                <span className="text-gray-700 dark:text-gray-400 ">Shipping</span>
                                                <span className="text-xl font-bold text-gray-700 dark:text-gray-400 ">
                                                    Miễn phí
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between pb-4 mb-4 ">
                                                <span className="text-gray-700 dark:text-gray-400">
                                                    Tổng số đơn hàng
                                                </span>
                                                <span className="text-xl font-bold text-gray-700 dark:text-gray-400">
                                                    ${reduceTotal(cartItems)}
                                                </span>
                                            </div>
                                            <h2 className="text-lg text-gray-500 dark:text-gray-400">
                                                Chúng tôi hỗ trợ:
                                            </h2>
                                            <div className="flex items-center mb-4 ">
                                                <a href="#">
                                                    <img
                                                        src="https://i.postimg.cc/g22HQhX0/70599-visa-curved-icon.png"
                                                        alt=""
                                                        className="object-cover h-16 mr-2 w-26"
                                                    />
                                                </a>
                                                <a href="#">
                                                    <img
                                                        src="https://i.postimg.cc/HW38JkkG/38602-mastercard-curved-icon.png"
                                                        alt=""
                                                        className="object-cover h-16 mr-2 w-26"
                                                    />
                                                </a>
                                                <a href="#">
                                                    <img
                                                        src="https://i.postimg.cc/HL57j0V3/38605-paypal-straight-icon.png"
                                                        alt=""
                                                        className="object-cover h-16 mr-2 w-26"
                                                    />
                                                </a>
                                            </div>
                                            <div className="flex items-center justify-between ">
                                                <button className="block w-full py-4 font-bold text-center text-gray-100 uppercase bg-primary/90 rounded-md hover:bg-primary/95">
                                                    Checkout
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
};

export default Cart;
