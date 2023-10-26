import ProductItem from '@/components/products/ProductItem';
import { Checkbox, Input, Pagination, Select, List } from 'antd';
import { FunctionComponent } from 'react';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { BsFillGridFill, BsGrid3X3GapFill, BsSearch } from 'react-icons/bs';
import { useGetProductsQuery } from '@/services/product';
import { useGetCategoriesQuery } from '@/services/category';
import Loading from '@/components/ui/Loading';
import { useGetBrandsQuery, useGetColorsQuery } from '@/services/option';

interface FilterProductsProps {}

const FilterProducts: FunctionComponent<FilterProductsProps> = () => {
    const { data: productsData, isLoading } = useGetProductsQuery();
    const { data: categoriesData } = useGetCategoriesQuery();
    const { data: brands } = useGetBrandsQuery();
    const { data: colors } = useGetColorsQuery();

    return (
        <section className="py-6 min-h-screen bg-gray-50 font-poppins dark:bg-gray-800 ">
            {isLoading ? (
                <Loading />
            ) : (
                <div className="px-4 mx-auto lg:py-6 md:px-6">
                    <div className="flex flex-wrap max-w-6xl mx-auto  mb-24">
                        <div className="w-full lg:w-1/6 lg:block">
                            <div className="bg-white text-lg p-2 shadow-sm">
                                <div className='overflow-y-auto max-h-[280px]'>
                                    <h1>Danh mục</h1>
                                    <List>
                                        {categoriesData?.docs.map((category) => (
                                            <List.Item key={category._id}>
                                                <Checkbox>{category.name}</Checkbox>
                                            </List.Item>
                                        ))}
                                    </List>
                                </div>

                                <div className="mt-3 overflow-y-auto max-h-[280px]">
                                    <h1>Thương hiệu</h1>
                                    <List>
                                        {brands?.map((brand) => (
                                            <List.Item key={brand._id}>
                                                <Checkbox>{brand.name}</Checkbox>
                                            </List.Item>
                                        ))}
                                    </List>
                                </div>

                                <div className="mt-3 overflow-y-auto max-h-[280px]">
                                    <h1>Màu sắc</h1>
                                    <List>
                                        {colors?.map((color) => (
                                            <List.Item key={color._id}>
                                                <Checkbox>{color.name}</Checkbox>
                                            </List.Item>
                                        ))}
                                    </List>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-3/4 flex-1 shadow-sm">
                            <div className="px-2">
                                <div className="bg-white px-2 items-center justify-between hidden py-2 mb-4 md:flex ">
                                    <div className="flex items-center max-w-xs py-2 pr-2 pl-4 bg-white rounded-lg dark:text-gray-300 dark:bg-gray-600 lg:flex">
                                        <Input
                                            size="large"
                                            type="text"
                                            addonBefore={<BsSearch className="text-base" />}
                                            className="w-full outline-none py-2 pl-3 border-0 dark:text-gray-300 dark:bg-gray-600"
                                            placeholder="Search..."
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex">
                                            <button className="text-xl inline-block h-full p-2 mr-3 border rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700">
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
                                            <Select
                                                
                                                className="block bg-white w-40 text-base bg-gray-100 dark:text-gray-400"
                                            >
                                                <option value="">Sort by latest</option>
                                                <option value="">Sort by Popularity</option>
                                                <option value="">Sort by Price</option>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4  items-center px-2`}>
                                {productsData?.docs.map((product) => (
                                    <div key={product._id} className="w-full mb-6">
                                        <ProductItem product={product} />
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end mt-6">
                                <Pagination defaultCurrent={6} total={500} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default FilterProducts;
