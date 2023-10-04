import { CategoryType, PaginatedCategory } from '@/types/Category';
import { waiting } from '@/utils/waiting';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const categoryApi = createApi({
    reducerPath: 'Category',
    tagTypes: ['Category'],

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        fetchFn: async (...arg) => {
            await waiting(1000);
            return fetch(...arg)
        }
    }),
    endpoints: (builder) => ({
        getCategories: builder.query<PaginatedCategory, void>({
            query: () => '/category',
            providesTags: ['Category']
        }),
        getCategoryById: builder.query<CategoryType, string>({
            query: (id: string) => `/category/${id}`,
            providesTags: ['Category']
        })
    })
})

export const { useGetCategoriesQuery, useGetCategoryByIdQuery } = categoryApi;
export default categoryApi