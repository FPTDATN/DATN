import  { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import type { RadioChangeEvent } from 'antd';
import { Radio, Tabs } from 'antd';
import { TabsPosition } from 'antd/es/tabs';
import RelatedProducts from '@/components/ui/RelatedProduct';
import  Breadcrumbs1 from '@/components/breadcrumbs/index1';
import Comment from '../comment/Comment';
const ProductDetail = () => {
    const [mode, setMode] = useState<TabsPosition>('top');

    const handleModeChange = (e: RadioChangeEvent) => {
        setMode(e.target.value);
    };

    return <section className="py-4 font-poppins dark:bg-gray-800">
        <div className='w-full px-8 h-2 pb-10'>
            <Breadcrumbs1 />
        </div>

        <div className="max-w-6xl px-4 mx-auto">
            <div className="flex flex-wrap mb-24 -mx-4">
                <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                    <div className="sticky top-0 overflow-hidden ">

                        <Carousel autoPlay>
                            <div>
                                <img className='rounded-lg'
                                    alt=""
                                    src="https://dongphuchaianh.com/wp-content/uploads/2022/04/ao-thun-in-hinh-hoa-tiet-mau-hong.jpg"
                                />
                                {/* <p className="legend">Legend 1</p> */}
                            </div>
                            <div>
                                <img className='rounded-lg'
                                    alt=""
                                    src="https://dongphuchaianh.com/wp-content/uploads/2022/04/ao-thun-in-hinh-hoa-tiet-an-tuong.jpg"
                                />
                                {/* <p className="legend">Legend 2</p> */}
                            </div>
                            <div>
                                <img className='rounded-lg'
                                    alt=""
                                    src="https://dongphuchaianh.com/wp-content/uploads/2022/04/ao-thun-in-hinh-hoa-tiet-mau-trang.jpg"
                                />
                                {/* <p className="legend">Legend 3</p> */}
                            </div>
                            <div>
                                <img className='rounded-lg'
                                    alt=""
                                    src="https://dongphuchaianh.com/wp-content/uploads/2022/04/ao-thun-in-hinh-hoa-tiet-mau-vang.jpg"
                                />
                                {/* <p className="legend">Legend 4</p> */}
                            </div>
                        </Carousel>
                    </div>
                </div>
                <div className="w-full px-4 md:w-1/2">
                    <div className="lg:pl-20">
                        <div className="mb-6 ">
                            <span className="px-2.5 py-0.5 text-xs text-blue-600 bg-blue-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">New
                                Arrival</span>
                            <h2 className="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                                Intel® Core™ i5-12600HX Processor (18M Cache, up to 4.60 GHz)
                            </h2>
                            <div className="flex flex-wrap items-center mb-6">
                                <ul className="flex mb-4 mr-2 lg:mb-0">
                                    <li>
                                        <a href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star " viewBox="0 0 16 16">
                                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z">
                                                </path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star " viewBox="0 0 16 16">
                                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z">
                                                </path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star " viewBox="0 0 16 16">
                                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z">
                                                </path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star " viewBox="0 0 16 16">
                                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z">
                                                </path>
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                                <a className="mb-4 text-xs underline hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-300 lg:mb-0" href="#">
                                    View the acer store
                                </a>
                            </div>
                            <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                                <span>Rs.7,000.00</span>
                                <span className="ml-3 text-base font-normal text-gray-500 line-through dark:text-gray-400">Rs.10,000.00</span>
                            </p>
                        </div>
                        <div className="flex items-center mb-8">
                            <h2 className="w-22 mr-6 text-xl font-semibold dark:text-gray-400 ">
                                Màu Sắc:</h2>
                            <div className="flex flex-wrap -mx-2 -mb-2">
                                <button
                                    className="p-1 mb-2 mr-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400 ">
                                    <div className="w-6 h-6 bg-cyan-300"></div>
                                </button>
                                <button
                                    className="p-1 mb-2 mr-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400">
                                    <div className="w-6 h-6 bg-green-300 "></div>
                                </button>
                                <button
                                    className="p-1 mb-2 mr-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400">
                                    <div className="w-6 h-6 bg-red-200 "></div>
                                </button>
                                <button
                                    className="p-1 mb-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400">
                                    <div className="w-6 h-6 bg-yellow-200 "></div>
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center mb-8">
                            <h2 className="w-25 text-xl font-semibold dark:text-gray-400 flex">
                                Kích Cỡ:</h2>
                            <div className="flex-1 flex-wrap -mx-2 -mb-2">
                                <button
                                    className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400">XL
                                </button>
                                <button
                                    className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">S
                                </button>
                                <button
                                    className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">M
                                </button>
                                <button
                                    className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">XS
                                </button>

                            </div>
                        </div>
                        <div className="w-32 mb-8 ">
                            <label
                                className="w-full text-xl font-semibold text-gray-700 dark:text-gray-400">Số Lượng :</label>
                            <div className="relative flex flex-row w-full h-10 mt-4 bg-transparent rounded-lg">
                                <button
                                    className="w-20 h-full text-gray-600 bg-gray-300 rounded-l outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-400">
                                    <span className="m-auto text-2xl font-thin">-</span>
                                </button>
                                <input type="number"
                                    className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-300 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
                                    placeholder="1" />
                                <button
                                    className="w-20 h-full text-gray-600 bg-gray-300 rounded-r outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-400">
                                    <span className="m-auto text-2xl font-thin">+</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-4 mb-6">
                            <a href="#" className="w-full px-4 py-3 text-center text-gray-100 bg-blue-600 border border-transparent dark:border-gray-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl">
                                Thêm Vào Giỏ Hàng</a>
                        </div>
                        <div className="flex gap-4 mb-6">
                            <a href="#" className="w-full px-4 py-3 text-center text-gray-100 bg-blue-600 border border-transparent dark:border-gray-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl">
                                Mua Ngay</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='max-w-6xl px-4 mx-auto'>
            <Radio.Group onChange={handleModeChange} value={mode} style={{ marginBottom: 8 }}>
                <Radio.Button value="top">Ngang</Radio.Button>
                <Radio.Button value="left">Dọc</Radio.Button>
            </Radio.Group>
            <Tabs
                defaultActiveKey="1"
                tabPosition={mode}
                style={{ height: 320, fontSize: 16 }}
                items={[{
                    label: `Mô tả`,
                    key: 'a',
                    children: `
                    Áo là một loại trang phục cơ bản và phổ biến trong văn hóa và đời sống hàng ngày. Nó thường được làm từ vải hoặc các vật liệu khác như len, lụa, cotton, polyester, và có thể có nhiều kiểu dáng và mục đích sử dụng khác nhau.
                    Áo có thể có nhiều phong cách và kiểu dáng khác nhau, từ các loại áo cổ tròn, áo cổ sơ mi, áo cổ bẻ, áo dài, áo khoác, áo len, áo dạ, áo sơ mi, áo thun, áo vest, áo hoodie, áo hai dây, áo quần, áo cánh, và nhiều hơn nữa. Theo từng nền văn hóa và xu hướng thời trang, các kiểu áo có thể thay đổi theo thời gian và địa điểm.
                    `,
                }, {
                    label: `Chức năng sản phẩm`,
                    key: 'b',
                    children: `Condof tab`,
                }]}
            />
        </div>
        <div className='p-4 mx-auto'>
            <RelatedProducts />
        </div>
        <div className="p-4 mx-auto">
            <Comment />
        </div>
    </section>


}

export default ProductDetail