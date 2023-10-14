import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CategoryType, PaginatedCategory } from '@/types/category';
import { waiting } from '@/utils/waiting';

export type TCategory = {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };

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
        getCategories: builder.query<PaginatedCategory, void>({
            query: () => '/category',
            providesTags: ['Category'],
        }),
        getCatgoryById: builder.query<CategoryType, string>({
            query: (_id) => `/category/${_id}`,
            providesTags: ['Category'],
        }),
        createCategory: builder.mutation<TCategory, string>({
            query: (category) => ({
                url: '/categories',
                method: 'POST',
                body: category,
            }),
            invalidatesTags: ['Category'],
        }),
        deleteCategory: builder.mutation<void, string>({
            query: (categoryId) => ({
                url: `/categories/${categoryId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category'],
        }),
        
        updateCategory: builder.mutation<TCategory, { categoryId: string; category: Partial<TCategory> }>({
            query: ({ categoryId, category }) => ({
              url: `/categories/${categoryId}`,
              method: 'PUT',
              body: category,
            }),
            invalidatesTags: ['Category'],
          }),
    }),
});

export const { useGetCategoriesQuery, useGetCatgoryByIdQuery, useCreateCategoryMutation, useDeleteCategoryMutation,useUpdateCategoryMutation} = categoryApi;
export default categoryApi;