import React, { FunctionComponent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCatgoryByIdQuery } from '@/services/category'; 
import ProductItem from '@/components/products/ProductItem'; 
import { Skeleton, Empty } from 'antd';

interface ListProductItemsProps {
  heading?: string;
}
const ProductsOfCategory: FunctionComponent<ListProductItemsProps> = ({ heading }) => {
  const { categoryId } = useParams();
  const { data: categoryData, isLoading: isLoadingCategory } = useGetCatgoryByIdQuery(categoryId || '');
  const [currentPage] = useState(0);
  const perPage = 8;
  const allProducts = categoryData?.products;

  return (
    <section className="flex items-center font-poppins section_danhmuc">
      <div className="flex-1 max-w-6xl px-0 py-4 mx-auto grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <h2 className="pb-2 uppercase text-xl font-semibold text-left text-gray-800 md:text-3xl dark:text-gray-400">
          {heading}
        </h2>
        <div className="w-20 mb-6 border-b border-red-700 dark:border-gray-400"></div>

        {allProducts && allProducts.length > 0 ? (
          <div className="grid gap-3 mb-11 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {allProducts.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <Empty description="Không có sản phẩm trong danh mục này." />
        )}

        {isLoadingCategory && (
          <div className="grid gap-4 mb-11 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {[...new Array(8)].map((_item, index) => (
              <div key={index}>
                <Skeleton className="h-[170px] w-full" />
                <Skeleton count={3} className="h-[42px]" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsOfCategory;
