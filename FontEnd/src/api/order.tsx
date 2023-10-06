import { IOrder } from '@/interfaces/Order';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const orderApi = createApi({
      reducerPath: 'order',
      tagTypes: ['Order'],
      baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api', 
      }),
      endpoints: (builder) => ({
        createOrder: builder.mutation<IOrder ,IOrder>({
          query: (orderData) => ({
            url: '/orders',
            method: 'POST',
            body: orderData,
          }),
          invalidatesTags: ['Order']
        }),
        getOrders: builder.query<IOrder[] , void>({
          query: () => '/orders',
          providesTags: ['Order']
        }),
        updateOrderStatus: builder.mutation<IOrder, { _id: string, status: string }>({
          query: ({ _id, status }) => ({
            url: `/orders/${_id}`,
            method: 'PUT',
            body: { status }, 
          }),
          invalidatesTags: ['Order'],
        }),
        
          deleteOrder: builder.mutation<void, string>({
            query: (orderId) => ({
              url: `/orders/${orderId}`,
              method: 'DELETE',
            }),
            invalidatesTags: ['Order'],
          }),
      }),
    });
    export const { useCreateOrderMutation, useGetOrdersQuery ,useDeleteOrderMutation, useUpdateOrderStatusMutation } = orderApi;
export const orderReducer = orderApi.reducer;
export default orderApi;