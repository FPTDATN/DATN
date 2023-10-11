import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {waiting} from '@/utils/waiting';
import { ProductType } from '@/seeds';
import { PaginatedProduct } from '@/types/Product';

interface ProductApiInput {
    name: string
    description?: string;
    price: number;
    sale_off?: number;
    quantity?: number;
    colorId?: string;
    sizeId?: string[];
    brandId?:string[];
    images?: string[];
    categoryId?: string;
    createAt:Date;
    updateAt:Date;
}

const productApi = createApi({
    reducerPath: 'product',
    tagTypes: ['Product'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        fetchFn: async(...arg) => {
            await waiting(2000);
            return fetch(...arg)
        }
    }),
    endpoints: (builder) => ({ 
        getProducts:builder.query<PaginatedProduct,void>({
            query: () => '/products',
            providesTags: ['Product'],
        }),
        getProductById:builder.query<ProductType, string>({
            query: (_id) => `/products/${_id}`,
            providesTags: ['Product']
        }),
        createProduct: builder.mutation<ProductApiInput,ProductApiInput>({
            query: (product) => ({
                url:'/products',
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['Product']
        })
    })
});

export const {useGetProductsQuery,useGetProductByIdQuery,useCreateProductMutation} = productApi;
export default productApi