import { FunctionComponent } from "react";
import { GrFormAdd, GrFormSubtract } from 'react-icons/gr'

interface CartProps {

}

const Cart: FunctionComponent<CartProps> = () => {
    return (

        <section className="flex items-center font-poppins dark:bg-gray-700 ">
            <div className="justify-center flex-1 px-4 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
                <div className="bg-gray-50 dark:bg-gray-800">
                    <h2 className="text-3xl font-semibold dark:text-gray-400 mb-8">Your Cart</h2>
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4 mb-8 xl:w-8/12 xl:mb-0">
                            <div className="flex flex-wrap items-center -mx-4 ">
                                <div className="w-full md:block hidden px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
                                    <h2 className="font-bold text-gray-500 dark:text-gray-400">Product name</h2>
                                </div>
                                <div className="hidden px-4 lg:block lg:w-2/12">
                                    <h2 className="font-bold text-gray-500 dark:text-gray-400">Price</h2>
                                </div>
                                <div className="hidden md:block px-4 md:w-1/6 lg:w-2/12 ">
                                    <h2 className="font-bold text-gray-500 dark:text-gray-400">Quantity</h2>
                                </div>
                                <div className="hidden md:block px-4 text-right md:w-1/6 lg:w-2/12 ">
                                    <h2 className="font-bold text-gray-500 dark:text-gray-400"> Subtotal</h2>
                                </div>
                            </div>
                            <div className="py-4 mb-8 border-t border-b border-gray-200 dark:border-gray-700">
                                <div className="flex flex-wrap items-center mb-6 -mx-4 md:mb-8">
                                    <div className="w-full px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
                                        <div className="flex flex-wrap items-center -mx-4">
                                            <div className="w-full px-4 mb-3 md:w-1/3">
                                                <div className="w-full h-96 md:h-24 md:w-24">
                                                    <img src="https://i.postimg.cc/kGjz3dpD/pexels-cottonbro-3296434.jpg" alt="" className="object-cover w-full h-full" />
                                                </div>
                                            </div>
                                            <div className="w-2/3 px-4">
                                                <h2 className="mb-2 text-xl font-bold dark:text-gray-400">DSL Camera</h2>
                                                <p className="text-gray-500 dark:text-gray-400 ">Picture frame</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden px-4 lg:block lg:w-2/12">
                                        <p className="text-lg font-bold text-blue-500 dark:text-gray-400">$99.00</p>
                                        <span className="text-xs text-gray-500 line-through dark:text-gray-400">$1500</span>
                                    </div>
                                    <div className="w-auto px-2 md:w-1/6 lg:w-2/12 ">
                                        <div className="inline-flex items-center px-4 font-semibold text-gray-500 border border-gray-200 rounded-md dark:border-gray-700 ">
                                            <button className="py-2 text-xl hover:text-gray-700 dark:text-gray-400">
                                                <GrFormSubtract />
                                            </button>
                                            <input type="number" className="w-12 px-2 py-4 text-center border-0 rounded-md dark:bg-gray-800 bg-gray-50 dark:text-gray-400 md:text-right" placeholder="1" />
                                            <button className="py-2 text-xl hover:text-gray-700 dark:text-gray-400">
                                                <GrFormAdd />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12 ">
                                        <p className="text-lg font-bold text-blue-500 dark:text-gray-400">$99.00</p>
                                    </div>
                                </div>

                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                <span className="text-gray-700 dark:text-gray-400">Apply Coupon</span>
                                <input type="text" className="flex-1 px-8 py-4 font-normal placeholder-gray-300 border dark:border-gray-700 dark:placeholder-gray-500 md:flex-none md:mr-6 dark:text-gray-400 dark:bg-gray-800" placeholder="x304k45" required />
                                <button className="flex-1 inline-block px-8 py-4 font-bold text-center text-gray-100 bg-primary/90 rounded-md hover:bg-primary/95 md:flex-none">Apply</button>
                            </div>
                        </div>
                        <div className="w-full px-4 xl:w-4/12">
                            <div className="p-6 border border-blue-100 dark:bg-gray-900 dark:border-gray-900 bg-blue-50 md:p-8">
                                <h2 className="mb-8 text-2xl font-bold text-gray-700 dark:text-gray-400">Order Summary</h2>
                                <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-300 dark:border-gray-700 ">
                                    <span className="text-gray-700 dark:text-gray-400">Subtotal</span>
                                    <span className="text-xl font-bold text-gray-700 dark:text-gray-400 ">$99</span>
                                </div>
                                <div className="flex items-center justify-between pb-4 mb-4 ">
                                    <span className="text-gray-700 dark:text-gray-400 ">Shipping</span>
                                    <span className="text-xl font-bold text-gray-700 dark:text-gray-400 ">Free</span>
                                </div>
                                <div className="flex items-center justify-between pb-4 mb-4 ">
                                    <span className="text-gray-700 dark:text-gray-400">Order Total</span>
                                    <span className="text-xl font-bold text-gray-700 dark:text-gray-400">$99.00</span>
                                </div>
                                <h2 className="text-lg text-gray-500 dark:text-gray-400">We offer:</h2>
                                <div className="flex items-center mb-4 ">
                                    <a href="#">
                                        <img src="https://i.postimg.cc/g22HQhX0/70599-visa-curved-icon.png" alt="" className="object-cover h-16 mr-2 w-26" />
                                    </a>
                                    <a href="#">
                                        <img src="https://i.postimg.cc/HW38JkkG/38602-mastercard-curved-icon.png" alt="" className="object-cover h-16 mr-2 w-26" />
                                    </a>
                                    <a href="#">
                                        <img src="https://i.postimg.cc/HL57j0V3/38605-paypal-straight-icon.png" alt="" className="object-cover h-16 mr-2 w-26" />
                                    </a>
                                </div>
                                <div className="flex items-center justify-between ">
                                    <button className="block w-full py-4 font-bold text-center text-gray-100 uppercase bg-primary/90 rounded-md hover:bg-primary/95">
                                        <a href="checkout" className="text-white text-center w-full block">Thanh Toán</a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Cart;