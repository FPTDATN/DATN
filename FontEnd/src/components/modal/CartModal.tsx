import { FunctionComponent, useState } from "react";
import type { DrawerProps } from 'antd';
import { Drawer } from 'antd';
import { BsCart2 } from 'react-icons/bs'
import { Link } from "react-router-dom";

interface CartModalProps {

}

const CartModal: FunctionComponent<CartModalProps> = () => {

    const [open, setOpen] = useState(false);
    const [placement, _setPlacement] = useState<DrawerProps['placement']>('right');

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return <div className="flex mr-5 cursor-pointer">
        <div className="text-2xl relative">
            <BsCart2 type="primary" onClick={showDrawer} />
            <span className="bg-primary/90 w-5 h-5 flex justify-center items-center rounded-full absolute -top-2 -right-2 text-sm">0</span>
        </div>
        <Drawer
            title="Shopping cart"
            placement={placement}
            closable={true}
            onClose={onClose}
            open={open}
            key={placement}
            className="px-0 py-0"
        >
            
            <div className="flex-1 overflow-y-auto px-0 py-4 sm:px-6">

              <div className="mt-0">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    <li className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg" alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center"/>
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href="#">Throwback Hip Bag</a>
                            </h3>
                            <p className="ml-4">$90.00</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">Salmon</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">Qty 1</p>

                          <div className="flex">
                            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg" alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch." className="h-full w-full object-cover object-center"/>
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href="#">Medium Stuff Satchel</a>
                            </h3>
                            <p className="ml-4">$32.00</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">Blue</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">Qty 1</p>

                          <div className="flex">
                            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                          </div>
                        </div>
                      </div>
                    </li>

                    
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-0 py-4 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>$262.00</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <Link to={'/cart'} onClick={onClose} className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</Link>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or
                  <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          

        </Drawer>
    </div>
}

export default CartModal;