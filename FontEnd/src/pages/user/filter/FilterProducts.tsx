import ProductItem from "@/components/products/ProductItem";
import { Pagination } from "antd";
import { FunctionComponent, useState } from "react";
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { BsFillGridFill, BsGrid3X3GapFill,BsSearch } from 'react-icons/bs'

interface FilterProductsProps {

}

const FilterProducts: FunctionComponent<FilterProductsProps> = () => {

    const [arrangeList, setArrangeList] = useState(false);

    return (
        <section className="py-10 bg-gray-50 font-poppins dark:bg-gray-800 ">
            <div className="px-4 py-4 mx-auto max-w-7xl lg:py-6 md:px-6">
                <div className="flex flex-wrap mb-24 -mx-3">
                    <div className="w-full pr-4 lg:w-1/4 lg:block">
                        <div className="p-4 mb-5 bg-white border border-gray-200 dark:border-gray-900 dark:bg-gray-900">
                            <h2 className="text-2xl font-bold dark:text-gray-400">Product Categories</h2>
                            <div className="w-16 pb-2 mb-6 border-b border-rose-600 dark:border-gray-400"></div>
                            <ul>
                                <li className="mb-4">
                                    <label htmlFor="" className="flex items-center dark:text-gray-400 ">
                                        <input type="checkbox" className="w-4 h-4 mr-2" />
                                        <span className="text-lg">Sweater</span>
                                    </label>
                                </li>
                                <li className="mb-4">
                                    <label htmlFor="" className="flex items-center dark:text-gray-400 ">
                                        <input type="checkbox" className="w-4 h-4 mr-2 " />
                                        <span className="text-lg">Socks</span>
                                    </label>
                                </li>
                                <li className="mb-4">
                                    <label htmlFor="" className="flex items-center dark:text-gray-400">
                                        <input type="checkbox" className="w-4 h-4 mr-2" />
                                        <span className="text-lg">T-Shirt</span>
                                    </label>
                                </li>
                                <li className="mb-4">
                                    <label htmlFor="" className="flex items-center dark:text-gray-400">
                                        <input type="checkbox" className="w-4 h-4 mr-2" />
                                        <span className="text-lg">Shoes</span>
                                    </label>
                                </li>
                                <li className="mb-4">
                                    <label htmlFor="" className="flex items-center dark:text-gray-400">
                                        <input type="checkbox" className="w-4 h-4 mr-2" />
                                        <span className="text-lg">Hoodies &amp; Pants</span>
                                    </label>
                                </li>
                            </ul>
                            <a href="#" className="text-base font-medium text-blue-500 hover:underline dark:text-blue-400">View
                                More</a>
                        </div>
                        <div className="p-4 mb-5 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-900">
                            <h2 className="text-2xl font-bold dark:text-gray-400 ">Size</h2>
                            <div className="w-16 pb-2 mb-6 border-b border-rose-600 dark:border-gray-400"></div>
                            <div className="flex flex-wrap -mx-2 -mb-2">
                                <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400">XL
                                </button>
                                <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">S
                                </button>
                                <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">M
                                </button>
                                <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">XS
                                </button>
                            </div>
                        </div>
                        <div className="p-4 mb-5 bg-white border border-gray-200 dark:border-gray-900 dark:bg-gray-900">
                            <h2 className="text-2xl font-bold dark:text-gray-400">Colors</h2>
                            <div className="w-16 pb-2 mb-6 border-b border-rose-600 dark:border-gray-400"></div>
                            <div className="flex flex-wrap -mx-2 -mb-2">
                                <button className="p-1 mb-2 mr-4 ">
                                    <div className="w-5 h-5 bg-emerald-400"></div>
                                </button>
                                <button className="p-1 mb-2 mr-4 ">
                                    <div className="w-5 h-5 bg-blue-700"></div>
                                </button>
                                <button className="p-1 mb-2 mr-4 ">
                                    <div className="w-5 h-5 bg-rose-600"></div>
                                </button>
                                <button className="p-1 mb-2 mr-4 ">
                                    <div className="w-5 h-5 bg-amber-700"></div>
                                </button>
                                <button className="p-1 mb-2 mr-4 ">
                                    <div className="w-5 h-5 bg-green-700"></div>
                                </button>
                                <button className="p-1 mb-2 mr-4 ">
                                    <div className="w-5 h-5 bg-pink-400"></div>
                                </button>
                                <button className="p-1 mb-2 mr-4 ">
                                    <div className="w-5 h-5 bg-indigo-400"></div>
                                </button>
                                <button className="p-1 mb-2 mr-4 ">
                                    <div className="w-5 h-5 bg-cyan-600"></div>
                                </button>
                                <button className="p-1 mb-2 mr-4 ">
                                    <div className="w-5 h-5 bg-stone-400"></div>
                                </button>
                                <button className="p-1 mb-2 mr-4 ">
                                    <div className="w-5 h-5 bg-yellow-400"></div>
                                </button>
                            </div>
                        </div>
                        <div className="p-4 mb-5 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-900">
                            <h2 className="text-2xl font-bold dark:text-gray-400">Brand</h2>
                            <div className="w-16 pb-2 mb-6 border-b border-rose-600 dark:border-gray-400"></div>
                            <ul>
                                <li className="mb-4">
                                    <label htmlFor="" className="flex items-center dark:text-gray-300">
                                        <input type="checkbox" className="w-4 h-4 mr-2" />
                                        <span className="text-lg dark:text-gray-400">Amul</span>
                                    </label>
                                </li>
                                <li className="mb-4">
                                    <label htmlFor="" className="flex items-center dark:text-gray-300">
                                        <input type="checkbox" className="w-4 h-4 mr-2" />
                                        <span className="text-lg dark:text-gray-400">RIGO</span>
                                    </label>
                                </li>
                                <li className="mb-4">
                                    <label htmlFor="" className="flex items-center dark:text-gray-300">
                                        <input type="checkbox" className="w-4 h-4 mr-2" />
                                        <span className="text-lg dark:text-gray-400">Nyptra</span>
                                    </label>
                                </li>
                                <li className="mb-4">
                                    <label htmlFor="" className="flex items-center dark:text-gray-300">
                                        <input type="checkbox" className="w-4 h-4 mr-2" />
                                        <span className="text-lg dark:text-gray-400">Shangri-la </span>
                                    </label>
                                </li>
                            </ul>
                            <a href="#" className="text-base font-medium text-blue-500 hover:underline dark:text-blue-400">View
                                More</a>
                        </div>
                    </div>
                    <div className="w-full px-3 lg:w-3/4">
                        <div className="px-3">
                            <div className="items-center justify-between hidden px-4 py-2 mb-4 bg-gray-100 md:flex dark:bg-gray-900 ">
                                <div className="flex items-center max-w-xs py-2 pr-2 pl-4 bg-white rounded-lg dark:text-gray-300 dark:bg-gray-600 lg:flex">
                                    <BsSearch className="text-base"/>
                                    <input type="text" className="w-full outline-none py-2 pl-3 border-0 dark:text-gray-300 dark:bg-gray-600" placeholder="Search..." />
                                    
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex">
                                        <button onClick={() => setArrangeList(!arrangeList)} className="text-xl inline-block h-full p-2 mr-3 border rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700">
                                            <AiOutlineUnorderedList />
                                        </button>
                                        <button className="text-xl inline-block h-full p-2 mr-3 border rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700">
                                            <BsFillGridFill />
                                        </button>
                                        <button className="text-xl inline-block h-full p-2 mr-6 border rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700">
                                            <BsGrid3X3GapFill />
                                        </button>
                                    </div>
                                    <div>
                                        <select name="" id="" className="block w-40 text-base bg-gray-100 dark:text-gray-400 dark:bg-gray-900">
                                            <option value="">Sort by latest</option>
                                            <option value="">Sort by Popularity</option>
                                            <option value="">Sort by Price</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${!arrangeList ? 'grid' : ''} grid-cols-1 md:grid-cols-2 lg:grid-cols-3  items-center`}>
                            <div className="w-full px-3 mb-6">
                                <ProductItem arrangeList={arrangeList} />
                            </div>
                            <div className="w-full px-3 mb-6">
                                <ProductItem arrangeList={arrangeList} />
                            </div>
                            <div className="w-full px-3 mb-6">
                                <ProductItem arrangeList={arrangeList} />
                            </div>
                            <div className="w-full px-3 mb-6">
                                <ProductItem arrangeList={arrangeList} />
                            </div>
                            <div className="w-full px-3 mb-6">
                                <ProductItem arrangeList={arrangeList} />
                            </div>
                            <div className="w-full px-3 mb-6">
                                <ProductItem arrangeList={arrangeList} />
                            </div>
                        </div>
                        <div className="flex justify-end mt-6">
                            <Pagination defaultCurrent={6} total={500} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FilterProducts;