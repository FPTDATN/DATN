import { decrease, increase, remove } from '@/slices/cart';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { formartVND } from '@/utils/formartVND';
import { reduceTotal } from '@/utils/reduce';
import { Button } from 'antd';
import { FunctionComponent } from 'react';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';

interface CartProps {}

const Cart: FunctionComponent<CartProps> = () => {
    const { cartItems } = useAppSelector((state) => state.cart);

    const dispatch = useAppDispatch();    

    return (
        <div className="px-6 mt-20">
            {cartItems.length === 0 ? (
                <div className="flex items-center flex-col h-screen justify-center gap-y-2">
                    <img src="https://cdn-icons-png.flaticon.com/512/4555/4555971.png" className='w-[360px] h-[360px] opacity-25' alt="" />

                    <h1 className='mt-10 text-xl font-semibold'>Giỏ hàng của bạn hiện đang trống.</h1>
                    <p className='max-w-[960px] text-center'>
                        Trước khi tiến hành thanh toán, bạn phải thêm một số sản phẩm vào giỏ hàng của mình. Bạn sẽ tìm
                        thấy rất nhiều sản phẩm thú vị trên trang "Cửa hàng" của chúng tôi.
                    </p>

                    <a href='/' className='uppercase bg-primary/90 text-white text-center px-4 py-2'>Trở lại cửa hàng</a>
                </div>
            ) : (
                <section className="main-content">
                    <div className="row max-inner">
                        <div className="columns col-12">
                            {/* <!-- start: cart form --> */}
                            <form className='flex justify-center flex-col'>
                                <table className="cart-table" cellSpacing={0}>
                                    <thead>
                                        <tr>
                                            <th className="product-thumbnail text-center px-4 border py-2">Ảnh</th>
                                            <th className="product-description text-center px-4 py-2" colSpan={1}>
                                                Chi tiết
                                            </th>
                                            <th className="product-price text-center px-4 py-2">Giá</th>
                                            <th className="product-quantity text-center px-4 py-2">Số Lượng</th>
                                            <th className="product-total text-center px-4 py-2">Tổng tiền</th>
                                            <th className="product-remove items-center text-center px-4 py-2">Tùy Chỉnh</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* <!-- start: cart item --> */}
                                        {cartItems.map((item) => (
                                            <tr key={item._id} className="cart-item">
                                                <td className="product-thumbnail border">
                                                    <a href={`/detail/${item._id}`} className="w-[205px] h-[220px]">
                                                        <img
                                                            src={item.images[0]}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </a>
                                                </td>
                                                <td className="product-description">
                                                    <h3>
                                                        <a href={`/detail/${item._id}`}>{item.name}</a>
                                                    </h3>
                                                    <p>{item.description}</p>
                                                    <p>
                                                        <strong>Size:</strong> {item.sizeId}
                                                        <br />
                                                        <strong>Color:</strong> {item.colorId}
                                                        <br />
                                                        <strong>Type:</strong> {item.categoryId?.name ? item.categoryId?.name : 'Chưa cập nhật'}
                                                    </p>
                                                </td>
                                                <td className="product-price">{formartVND(item.price * item.quantity)}</td>
                                                <td className="product-quantity">
                                                    <div className="flex flex-col items-center gap-y-1">
                                                        <Button onClick={() => dispatch(decrease(item._id))}>
                                                            <RiSubtractLine />
                                                        </Button>
                                                        <span className="mx-3">{item.quantity}</span>
                                                        <Button onClick={() => dispatch(increase(item._id))}>
                                                            <RiAddLine />
                                                        </Button>
                                                    </div>
                                                </td>
                                                <td className="product-total">{formartVND(item.price * item.quantity)}</td>
                                                <td className="product-remove ">
                                                    <Button
                                                        onClick={() => dispatch(remove(item._id))}
                                                        className="mx-3"
                                                        danger
                                                    >
                                                        Xóa
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                        
                                    </tbody>
                                </table>

                                {/* <!-- start: cart summary --> */}
                                <table className="cart-details">
                                    <tbody>
                                        <tr className="spacer-row">
                                            <td colSpan={1}></td>
                                        </tr>
                                        <tr>
                                            <td className="cart-summary" colSpan={1}>
                                                Tổng Hợp
                                            </td>
                                            <td className="cart-subtotals">
                                                <span>Giá đơn hàng:</span> {formartVND(reduceTotal((cartItems)))}
                                            </td>
                                            <td className="cart-shipping">
                                                <span>Shipment:</span> Free
                                            </td>
                                            <td className="cart-total">
                                                <span>Tổng tiền:</span> {formartVND(reduceTotal((cartItems)))}
                                            </td>
                                            <td className="">
                                                <a href="/checkout" className='block text-sm text-white text-center bg-gray-700 px-6 py-2'>Thanh toán</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                {/* <!-- end: cart summary -->    */}
                            </form>
                            {/* <!-- end: cart form --> */}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Cart;
