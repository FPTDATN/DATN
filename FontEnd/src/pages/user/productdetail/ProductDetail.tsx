import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import type { RadioChangeEvent } from 'antd';
import { Radio, Rate, Tabs } from 'antd';
import { TabsPosition } from 'antd/es/tabs';
import RelatedProducts from '@/components/ui/RelatedProduct';
import Breadcrumbs1 from '@/components/breadcrumbs/index1';
import Comment from '../comment/Comment';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '@/services/product';
import { useAppDispatch } from '@/store/hook';
import { addToCart } from '@/slices/cart';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const ProductDetail = () => {
    const dispatch = useAppDispatch();

    const { id } = useParams();

    const { data } = useGetProductByIdQuery(id!);

    const [mode, setMode] = useState<TabsPosition>('top');
    const [value, setValue] = useState(3);
    const [color, setColor] = useState(data?.products.colorId![0].name);
    const [size, setSize] = useState(data?.products.sizeId![0].name);
    const [quantity, setQuantity] = useState<number>(1);

    const onChange3 = ({ target: { value } }: RadioChangeEvent) => {
        setColor(value);
    };

    const handleModeChange = (e: RadioChangeEvent) => {
        setMode(e.target.value);
    };

    return (
        <section className="py-4 font-poppins dark:bg-gray-800">
            <div className="w-full px-8 h-2 pb-10">
                <Breadcrumbs1 />
            </div>

            <div className=" max-w-6xl px-4 mx-auto">
                <div className="flex flex-wrap mb-24 -mx-4">
                    <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                        <div className="sticky top-0 overflow-hidden ">
                            <Carousel autoPlay>
                                {data?.products?.images?.map((item, index) => (
                                    <div key={index} className="h-[600px]">
                                        <img className="rounded-lg object-cover" alt={item} src={item} />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                        <div className="lg:pl-20">
                            <div className="mb-6 ">
                                <span className="px-2.5 py-0.5 text-xs text-blue-600 bg-blue-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">
                                    New
                                    {data?.products.categoryId?.name}
                                </span>
                                <h2 className="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                                    {data?.products.name}
                                </h2>
                                <div className="flex flex-wrap items-center mb-6">
                                    <span>
                                        <Rate tooltips={desc} onChange={setValue} value={value} />
                                        {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
                                    </span>
                                </div>
                                <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                                    <span>$.{data?.products.price}</span>
                                    <span className="ml-3 text-base font-normal text-gray-500 line-through dark:text-gray-400">
                                        Rs.10,000.00
                                    </span>
                                </p>
                            </div>
                            <div className="flex items-center mb-8">
                                <h2 className="w-22 mr-6 text-xl font-semibold dark:text-gray-400 ">Màu Sắc:</h2>
                                <div className="flex flex-wrap -mx-2 -mb-2">
                                    <Radio.Group onChange={onChange3} value={color} optionType="button">
                                        {data?.products.colorId?.map((color) => (
                                            <Radio key={color._id} value={color.name}>
                                                {color.name}
                                            </Radio>
                                        ))}
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="flex items-center mb-8">
                                <h2 className="w-25 text-xl font-semibold dark:text-gray-400 flex">Kích Cỡ:</h2>
                                <div className="flex-1 flex-wrap mx-2 -mb-2">
                                    <Radio.Group
                                        onChange={(e) => setSize(e.target.value)}
                                        value={size}
                                        optionType="button"
                                    >
                                        {data?.products.sizeId?.map((size) => (
                                            <Radio key={size._id} value={size.name}>
                                                {size.name}
                                            </Radio>
                                        ))}
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="w-32 mb-8 ">
                                <label className="w-full text-xl font-semibold text-gray-700 dark:text-gray-400">
                                    Số Lượng :
                                </label>
                                <div className="relative flex flex-row w-full h-10 mt-4 bg-transparent rounded-lg">
                                    <button className="w-20 h-full text-gray-600 bg-gray-300 rounded-l outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-400">
                                        <span className="m-auto text-2xl font-thin">-</span>
                                    </button>
                                    <input
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                        value={quantity}
                                        type="number"
                                        className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-300 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
                                    />
                                    <button className="w-20 h-full text-gray-600 bg-gray-300 rounded-r outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-400">
                                        <span className="m-auto text-2xl font-thin">+</span>
                                    </button>
                                </div>
                            </div>
                            <div className="flex gap-4 mb-6">
                                <button
                                    onClick={() =>
                                        dispatch(
                                            addToCart({
                                                ...(data?.products! as any),
                                                quantity: quantity,
                                                colorId: color,
                                                sizeId: size,
                                            }),
                                        )
                                    }
                                    className="w-full px-4 py-3 text-center text-gray-100 bg-primary/90 border border-transparent dark:border-gray-700 hover:border-primary/95 hover:text-blue-700 hover:bg-blue-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl"
                                >
                                    Thêm Vào Giỏ Hàng
                                </button>
                            </div>
                            <div className="flex gap-4 mb-6">
                                <a
                                    href="#"
                                    className="w-full px-4 py-3 text-center text-gray-100 bg-primary/90 border border-transparent dark:border-gray-700 hover:border-primary/95 hover:text-blue-700 hover:bg-blue-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl"
                                >
                                    Mua Ngay
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-6xl px-4 mx-auto">
                <Radio.Group onChange={handleModeChange} value={mode} style={{ marginBottom: 8 }}>
                    <Radio.Button value="top">Ngang</Radio.Button>
                    <Radio.Button value="left">Dọc</Radio.Button>
                </Radio.Group>
                <Tabs
                    defaultActiveKey="1"
                    tabPosition={mode}
                    style={{ height: 320, fontSize: 16 }}
                    items={[
                        {
                            label: `Mô tả`,
                            key: 'a',
                            children: `
                    ${data?.products.description}
                    `,
                        },
                        {
                            label: `Chức năng sản phẩm`,
                            key: 'b',
                            children: `Condof tab`,
                        },
                    ]}
                />
            </div>
            <div className="p-4 mx-auto">
                <RelatedProducts />
            </div>
            <div className="p-4 mx-auto">
                <Comment />
            </div>
        </section>
    );
};

export default ProductDetail;
