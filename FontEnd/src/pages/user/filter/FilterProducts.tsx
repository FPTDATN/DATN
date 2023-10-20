import ProductItem from '@/components/products/ProductItem';
import { Checkbox, Menu, MenuProps, Pagination } from 'antd';
import { FunctionComponent, useState } from 'react';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { BsFillGridFill, BsGrid3X3GapFill, BsSearch } from 'react-icons/bs';
import { BiSolidCategory } from 'react-icons/bi';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { AiFillStar } from 'react-icons/ai';
import { useGetProductsQuery } from '@/services/product';
import { useGetCategoriesQuery } from '@/services/category';
import Loading from '@/components/ui/Loading';

interface FilterProductsProps {}

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const FilterProducts: FunctionComponent<FilterProductsProps> = () => {
    const { data: productsData, isLoading } = useGetProductsQuery();
    const { data: categoriesData } = useGetCategoriesQuery();

    const brands = [
        {
            _id: 'idbrand1',
            title: 'Thương hiệu 1',
            checked: false,
        },
        {
            _id: 'idbrand2',
            title: 'Thương hiệu 2',
            checked: false,
        },
        {
            _id: 'idbrand3',
            title: 'Thương hiệu 3',
            checked: false,
        },
        {
            _id: 'idbrand4',
            title: 'Thương hiệu 4',
            checked: false,
        },
    ];

    const onChange = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const items: MenuItem[] = [
        getItem(
            <div>
                <h2 className="text-xl text-gray-600 font-normal dark:text-gray-400">Loại hàng</h2>
            </div>,
            'sub1',
            <div>
                <BiSolidCategory className="text-base text-gray-600" />
            </div>,
            categoriesData?.docs.map((category) => {
                return getItem(
                    <Checkbox onChange={onChange}>
                        <h3 className="text-base">{category.name}</h3>
                    </Checkbox>,
                    category._id!,
                );
            }),
        ),
        getItem(
            <div>
                <h2 className="text-xl text-gray-600 font-normal dark:text-gray-400">Thương hiệu</h2>
            </div>,
            'sub2',
            <div>
                <AiFillStar className="text-base text-gray-600" />
            </div>,
            brands.map((brand) => {
                return getItem(
                    <Checkbox onChange={onChange}>
                        <h3 className="text-base">{brand.title}</h3>
                    </Checkbox>,
                    brand._id,
                );
            }),
        ),
    ];

    const [openKeys, setOpenKeys] = useState(['sub1']);

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const [arrangeList, setArrangeList] = useState(false);

    return (
        <section className="py-6 min-h-screen bg-gray-50 font-poppins dark:bg-gray-800 ">
            {isLoading ? <Loading/> :<div className="px-4 mx-auto lg:py-6 md:px-6">
                <div className="flex flex-wrap mb-24 -mx-3">
                    <div className="w-full lg:w-1/6 lg:block">
                        <Menu
                            className="w-full mb-2 border"
                            mode="inline"
                            openKeys={openKeys}
                            onOpenChange={onOpenChange}
                            items={items}
                        />

                        <div className="p-4 mb-5 bg-white border border-gray-200 dark:border-gray-900">
                            <h2 className="text-2xl font-normal dark:text-gray-400 ">Size</h2>
                            <div className="w-16 pb-2 mb-6 border-b border-rose-600 dark:border-gray-400"></div>
                            <div className="flex flex-wrap -mx-2 -mb-2">
                                <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400">
                                    XL
                                </button>
                                <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">
                                    S
                                </button>
                                <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">
                                    M
                                </button>
                                <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">
                                    XS
                                </button>
                            </div>
                        </div>
                        <div className="p-4 mb-5 bg-white border border-gray-200 dark:border-gray-900">
                            <h2 className="text-2xl font-normal dark:text-gray-400">Colors</h2>
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
                    </div>
                    <div className="w-full lg:w-3/4">
                        <div className="px-3">
                            <div className="items-center justify-between hidden px-4 py-2 mb-4 md:flex ">
                                <div className="flex items-center max-w-xs py-2 pr-2 pl-4 bg-white rounded-lg dark:text-gray-300 dark:bg-gray-600 lg:flex">
                                    <BsSearch className="text-base" />
                                    <input
                                        type="text"
                                        className="w-full outline-none py-2 pl-3 border-0 dark:text-gray-300 dark:bg-gray-600"
                                        placeholder="Search..."
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex">
                                        <button
                                            onClick={() => setArrangeList(!arrangeList)}
                                            className="text-xl inline-block h-full p-2 mr-3 border rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700"
                                        >
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
                                        <select
                                            name=""
                                            id=""
                                            className="block w-40 text-base bg-gray-100 dark:text-gray-400"
                                        >
                                            <option value="">Sort by latest</option>
                                            <option value="">Sort by Popularity</option>
                                            <option value="">Sort by Price</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`${
                                !arrangeList ? 'grid' : ''
                            } grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4  items-center px-4`}
                        >
                            {productsData?.docs.map((product) => (
                                <div key={product._id} className="w-full mb-6">
                                    <ProductItem product={product} arrangeList={arrangeList} />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end mt-6">
                            <Pagination defaultCurrent={6} total={500} />
                        </div>
                    </div>
                </div>
            </div>}
        </section>
    );
};

export default FilterProducts;
