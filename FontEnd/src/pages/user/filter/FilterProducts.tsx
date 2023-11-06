import ProductItem from '@/components/products/ProductItem';
import { Checkbox, Pagination, List } from 'antd';
import { FunctionComponent } from 'react';
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
                    <div className="flex flex-wrap mx-auto mb-24">
                        <div className="w-full lg:w-1/6 lg:block">
                            <div className="bg-white text-lg p-2 shadow-sm">
                                <div className='overflow-y-auto max-h-[280px] relative'>
                                    <h1 className='sticky bg-white h-[30px] z-50 top-0 left-0'>Danh mục</h1>
                                    <List>
                                        {categoriesData?.docs.map((category) => (
                                            <List.Item key={category._id}>
                                                <Checkbox>{category.name}</Checkbox>
                                            </List.Item>
                                        ))}
                                    </List>
                                </div>

                                <div className="mt-3 overflow-y-auto max-h-[280px]">
                                    <h1 className='sticky bg-white h-[30px] z-50 top-0 left-0'>Thương hiệu</h1>
                                    <List>
                                        {brands?.map((brand) => (
                                            <List.Item key={brand._id}>
                                                <Checkbox>{brand.name}</Checkbox>
                                            </List.Item>
                                        ))}
                                    </List>
                                </div>

                                <div className="mt-3 overflow-y-auto max-h-[280px]">
                                    <h1 className='sticky bg-white h-[30px] z-50 top-0 left-0'>Màu sắc</h1>
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
                        <div className="w-full lg:w-3/4 flex-1">
                            
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
