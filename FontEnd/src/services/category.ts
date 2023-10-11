import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { waiting } from '@/utils/waiting';

interface CategoryApiResponse {
    _id: string;
    name: string;
}

interface CategoryInput {
    name: string;
}

const categoryApi = createApi({
    reducerPath: 'category',
    tagTypes: ['Category'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        fetchFn: async (...arg) => {
            await waiting(2000);
            return fetch(...arg);
        },
    }),
    endpoints: (builder) => ({
        getCategories: builder.query<CategoryApiResponse[], void>({
            query: () => '/category',
            providesTags: ['Category'],
        }),
        getCatgoryById: builder.query<CategoryApiResponse, string>({
            query: (_id) => `/category/${_id}`,
            providesTags: ['Category'],
        }),
        createCategory: builder.mutation<CategoryInput, CategoryInput>({
            query: (category) => ({
                url: '/category',
                method: 'POST',
                body: category,
            }),
            invalidatesTags: ['Category'],
        }),
    }),
});

export const { useGetCategoriesQuery, useGetCatgoryByIdQuery, useCreateCategoryMutation } = categoryApi;
export default categoryApi;
