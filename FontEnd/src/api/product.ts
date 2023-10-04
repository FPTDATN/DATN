import { PaginatedProduct, ProductType } from '@/types/Product';
import { waiting } from '@/utils/waiting';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const productApi = createApi({
    reducerPath: 'Product',
    tagTypes: ['Product'],

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        fetchFn: async (...arg) => {
            await waiting(2000);
            return fetch(...arg)
        }
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<PaginatedProduct, void>({
            query: () => '/products',
            providesTags: ['Product']
        }),
        getProductById: builder.query<{
            products: ProductType
        }, string>({
            query: (id: string) => `/products/${id}`,
            providesTags: ['Product']
        })
    })
})

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
export default productApi