import { Rate } from 'antd';
import { FunctionComponent, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import SaleOffCard from '../ui/SaleOffCard';

interface ProductItemProps {
    arrangeList?: boolean;
}

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const ProductItem: FunctionComponent<ProductItemProps> = ({ arrangeList }) => {
    const [value, setValue] = useState(3);
    const [loading, _setLoading] = useState(false);

    return (
        <>
            {loading ? <div>
                <Skeleton className='h-[260px]' />
                <Skeleton count={4} />

            </div> : !arrangeList ? (
                <div className="border border-gray-200 rounded-md bg-gray-50 dark:border-gray-900 rounded-b-md dark:bg-gray-900">
                    <div className="relative ">
                        <Link to={''} className="">
                            <img
                                src="https://i.postimg.cc/xC8FnZPT/pexels-suzy-hazelwood-2536965.jpg"
                                alt=""
                                className="object-cover w-full mx-auto h-32 md:h-80 lg:h-40"
                            />
                        </Link>

                        {/* Card sale off if saleoff > 0 */}
                        <SaleOffCard type='saleoff' off={1}/>

                        <div className="flex justify-center ">
                            <div className="absolute z-10 text-xl font-semibold flex items-center justify-center p-2 -mt-6 text-center text-primary/90 border rounded-full shadow-xl cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-900 hover:text-gray-50 hover:bg-primary/95 w-11 h-11 ">
                                <AiOutlineShoppingCart />
                            </div>
                        </div>
                    </div>
                    <div className="py-6">
                        <h3 className="mb-3 text-base lg:text-xl line-clamp-2 font-medium text-center dark:text-gray-400">
                            <Link to={''}> Product name</Link>
                        </h3>
                        <p className="mb-3 text-lg font-medium text-center text-gray-600 dark:text-gray-400">
                            <span className="text-primary/90 dark:text-gray-300 text-sm lg:text-xl">$600.00</span>
                            <span className="ml-2 text-gray-400 line-through dark:text-gray-400 text-sm lg:text-xl">$1000</span>
                        </p>
                        <div className="flex justify-center">
                            <span>
                                <Rate className='text-sm' tooltips={desc} onChange={setValue} value={value} />
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 border border-gray-200 rounded-md bg-gray-50 dark:border-gray-900 rounded-b-md dark:bg-gray-900">
                    <div className="relative">
                        <Link to={''} className="">
                            <img
                                src="https://i.postimg.cc/xC8FnZPT/pexels-suzy-hazelwood-2536965.jpg"
                                alt=""
                                className="object-cover w-full mx-auto h-32 md:h-80 lg:h-52"
                            />
                        </Link>
                        <div className="absolute z-10 flex items-center justify-center w-10 h-10 p-4 text-center text-gray-100 bg-orange-600 rounded-full shadow-xl left-1 top-1 ">
                            <span className="relative text-base font-semibold text-gray-200 "> SALE</span>
                        </div>
                    </div>
                    <div className="px-6 py-0 md:py-6 lg:py-6">
                        <h3 className="mb-3 mt-3 text-base lg:text-xl line-clamp-2 font-medium text-center dark:text-gray-400">
                            <Link to={''}> Product name</Link>
                        </h3>
                        <p className="mb-3 text-lg font-medium text-center text-gray-600 dark:text-gray-400">
                            <span className="text-primary/90 dark:text-gray-300 text-sm lg:text-xl">$600.00</span>
                            <span className="ml-2 text-gray-400 line-through dark:text-gray-400 text-sm lg:text-xl">$1000</span>
                        </p>
                        <div className="flex justify-center">
                            <span>
                                <Rate className='text-sm md:text-base lg:text-xl' tooltips={desc} onChange={setValue} value={value} />
                            </span>
                        </div>
                    </div>
                    <button className="flex w-full col-span-2 text-sm md:text-base lg:text-xl justify-center px-4 py-2 text-primary/90 border border-primary/90 items-center dark:border-gray-600 dark:text-gray-400 hover:bg-primary/90 hover:text-gray-100 dark:hover:bg-gray-800 dark:hover:border-gray-900">
                        Add to cart
                    </button>
                </div>
            )}




        </>
    );
};

export default ProductItem;
