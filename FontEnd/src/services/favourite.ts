import { waiting } from '@/utils/waiting';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const favouriteapi = createApi({
    reducerPath: 'favourite',
    tagTypes: ['Favourite'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        fetchFn: async (...arg) => {
            await waiting(2000);
            return fetch(...arg);
        }
    }), endpoints: (builder) => ({
        addToWishlist: builder.mutation<any, { user_id: any, product_id: string }>({
            query: ({ user_id, product_id }) => ({
                url: '/favourite',
                method: 'POST',
                body: { user_id, product_id },
            }),
            invalidatesTags: ['Favourite'],

        }),
        getWishlist: builder.query<any, string>({
            query: (user_id) => `/favourite/${user_id}`,
            providesTags: ['Favourite'],
        }),
        removeProductFromWishlist: builder.mutation<any, { user_id: string, product_id: string }>({
            query: ({ user_id, product_id }) => ({
                url: `/favourite/remove/${user_id}/${product_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Favourite'],

        }),
        checkProductInWishlist: builder.query<any, { product_id: any, user_id: any }>({
            query: ({ user_id, product_id }) => `/favourite/${user_id}/product/${product_id}`,
        }),
    }),
});

export const { useAddToWishlistMutation, useGetWishlistQuery, useRemoveProductFromWishlistMutation, useCheckProductInWishlistQuery } = favouriteapi;