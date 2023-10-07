import { ProductType } from "@/types/Product";
import { Rate } from "antd";
import { FunctionComponent, useState } from "react";
import { AiOutlineShoppingCart } from 'react-icons/ai'

interface ListProductItemsProps {
    heading?: string;
    hostProducts?: ProductType[]
}

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const ListProductItems: FunctionComponent<ListProductItemsProps> = ({ heading }) => {

    const [value, setValue] = useState(3);

    return <section className="flex items-center font-poppins dark:bg-gray-800 ">
        <div className="justify-center flex-1 max-w-6xl px-0 py-4 mx-auto lg:py-8 md:px-4">
            <h2 className="pb-2 text-xl font-bold text-left text-gray-800 md:text-3xl dark:text-gray-400">
                {heading}
            </h2>
            <div className="w-20 mb-6 border-b border-red-700 dark:border-gray-400"></div>
            <div className="grid gap-4 mb-11 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                <div className="border border-gray-200 rounded-md bg-gray-50 dark:border-gray-900 rounded-b-md dark:bg-gray-900">
                    <div className="relative ">
                        <a href="#" className="">
                            <img src="https://i.postimg.cc/xC8FnZPT/pexels-suzy-hazelwood-2536965.jpg" alt="" className="object-cover w-full mx-auto h-96 lg:h-64" />
                        </a>
                        <div className="absolute z-10 flex items-center justify-center w-10 h-10 p-4 text-center text-gray-100 bg-orange-600 rounded-full shadow-xl left-1 top-1 ">
                            <span className="relative text-base font-semibold text-gray-200 "> SALE</span>
                        </div>
                        <div className="flex justify-center ">
                            <div className="absolute z-10 text-xl font-semibold flex items-center justify-center p-2 -mt-6 text-center text-primary/90 border rounded-full shadow-xl cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-900 hover:text-gray-50 hover:bg-primary/95 w-11 h-11 ">
                                <AiOutlineShoppingCart />
                            </div>
                        </div>
                    </div>
                    <div className="p-6 ">
                        <h3 className="mb-3 text-xl font-medium text-center dark:text-gray-400">
                            <a href="#"> Product name</a>
                        </h3>
                        <p className="mb-3 text-lg font-medium text-center text-gray-600 dark:text-gray-400">
                            <span className="text-primary/90 dark:text-gray-300">$600.00</span>
                            <span className="ml-2 text-gray-400 line-through dark:text-gray-400">$1000</span>
                        </p>
                        <div className="flex justify-center">
                            <span>
                                <Rate tooltips={desc} onChange={setValue} value={value} />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="border border-gray-200 rounded-md bg-gray-50 dark:border-gray-900 rounded-b-md dark:bg-gray-900">
                    <div className="relative ">
                        <a href="#" className="">
                            <img src="https://i.postimg.cc/K8qmN64m/pexels-javon-swaby-2783873.jpg" alt="" className="object-cover w-full mx-auto h-96 lg:h-64" />
                        </a>
                        <div className="absolute z-10 flex items-center justify-center w-10 h-10 p-4 text-center text-gray-100 rounded-full shadow-xl bg-rose-700 left-1 top-1">
                            <span className="relative text-sm font-semibold text-gray-200 "> 22% OFF</span>
                        </div>
                        <div className="flex justify-center ">
                            <div className="absolute z-10 flex items-center justify-center p-2 -mt-6 text-center text-primary/90 border rounded-full shadow-xl cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-900 hover:text-gray-50 hover:bg-primary/95 w-11 h-11 ">
                                <div className="flex justify-center ">
                                    <div className="absolute z-10 text-xl font-semibold flex items-center justify-center p-2 -mt-6 text-center text-primary/90 border rounded-full shadow-xl cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-900 hover:text-gray-50 hover:bg-primary/95 w-11 h-11 ">
                                        <AiOutlineShoppingCart />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 ">
                        <h3 className="mb-3 text-xl font-medium text-center dark:text-gray-400">
                            <a href="#"> Product name</a>
                        </h3>
                        <p className="mb-3 text-lg font-medium text-center text-gray-600 dark:text-gray-400">
                            <span className="text-primary/90 dark:text-gray-300">$600.00</span>
                            <span className="ml-2 text-gray-400 line-through dark:text-gray-400">$1000</span>
                        </p>
                        <div className="flex justify-center">
                            <span>
                                <Rate tooltips={desc} onChange={setValue} value={value} />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="border border-gray-200 rounded-md bg-gray-50 dark:border-gray-900 rounded-b-md dark:bg-gray-900">
                    <div className="relative ">
                        <a href="#" className="">
                            <img src="https://i.postimg.cc/zv8m573d/pexels-artem-beliaikin-1117272.jpg" alt="" className="object-cover w-full mx-auto h-96 lg:h-64" />
                        </a>
                        <div className="absolute z-10 flex items-center justify-center w-10 h-10 p-4 text-center text-gray-100 bg-orange-600 rounded-full shadow-xl left-1 top-1 ">
                            <span className="relative text-base font-semibold text-gray-200 "> SALE</span>
                        </div>
                        <div className="flex justify-center ">
                            <div className="absolute z-10 flex items-center justify-center p-2 -mt-6 text-center text-primary/90 border rounded-full shadow-xl cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-900 hover:text-gray-50 hover:bg-primary/95 w-11 h-11 ">
                                <div className="flex justify-center ">
                                    <div className="absolute z-10 text-xl font-semibold flex items-center justify-center p-2 -mt-6 text-center text-primary/90 border rounded-full shadow-xl cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-900 hover:text-gray-50 hover:bg-primary/95 w-11 h-11 ">
                                        <AiOutlineShoppingCart />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 ">
                        <h3 className="mb-3 text-xl font-medium text-center dark:text-gray-400">
                            <a href="#"> Product name</a>
                        </h3>
                        <p className="mb-3 text-lg font-medium text-center text-gray-600 dark:text-gray-400">
                            <span className="text-primary/90 dark:text-gray-300">$600.00</span>
                            <span className="ml-2 text-gray-400 line-through dark:text-gray-400">$1000</span>
                        </p>
                        <div className="flex justify-center">
                            <span>
                                <Rate tooltips={desc} onChange={setValue} value={value} />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="border border-gray-200 rounded-md bg-gray-50 dark:border-gray-900 rounded-b-md dark:bg-gray-900">
                    <div className="relative ">
                        <a href="#" className="">
                            <img src="https://i.postimg.cc/HLyFyRyZ/pexels-suzy-hazelwood-2533266.jpgg" alt="" className="object-cover w-full mx-auto h-96 lg:h-64" />
                        </a>
                        <div className="absolute z-10 flex items-center justify-center w-10 h-10 p-4 text-center text-gray-100 bg-green-600 rounded-full shadow-xl left-1 top-1 ">
                            <span className="relative text-base font-semibold text-gray-200 "> New</span>
                        </div>
                        <div className="flex justify-center ">
                            <div className="absolute z-10 flex items-center justify-center p-2 -mt-6 text-center text-primary/90 border rounded-full shadow-xl cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-900 hover:text-gray-50 hover:bg-primary/95 w-11 h-11 ">
                                <div className="flex justify-center ">
                                    <div className="absolute z-10 text-xl font-semibold flex items-center justify-center p-2 -mt-6 text-center text-primary/90 border rounded-full shadow-xl cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-900 hover:text-gray-50 hover:bg-primary/95 w-11 h-11 ">
                                        <AiOutlineShoppingCart />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 ">
                        <h3 className="mb-3 text-xl font-medium text-center dark:text-gray-400">
                            <a href="#"> Product name</a>
                        </h3>
                        <p className="mb-3 text-lg font-medium text-center text-gray-600 dark:text-gray-400">
                            <span className="text-primary/90 dark:text-gray-300">$600.00</span>
                            <span className="ml-2 text-gray-400 line-through dark:text-gray-400">$1000</span>
                        </p>
                        <div className="flex justify-center">
                            <span>
                                <Rate tooltips={desc} onChange={setValue} value={value} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
}

export default ListProductItems;