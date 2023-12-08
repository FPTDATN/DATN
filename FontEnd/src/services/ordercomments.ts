import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

function waiting(time: any) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

interface OrderComment {
  _id?: string;
  text: string;
  userId?: any;
  orderId?: any;
  productId?:any;
  parentOrderId?: any
  createdAt?: any
}

const ordercommentApi = createApi({
  reducerPath: 'ordercomments',
  tagTypes: ['Ordercomments'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api',
    prepareHeaders(headers) {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers;
    },
    fetchFn: async (...args) => {
      await waiting(2000);
      return fetch(...args);
    },
  }),
  endpoints: (builder) => ({


    getAllOrderComments: builder.query<OrderComment[], void>({
      query: () => '/ordercomments',
      providesTags: ['Ordercomments']
    }),

    getByIdOrderComments: builder.query<OrderComment, any>({
      query: (_id) => `/ordercomments/${_id}`,
      providesTags: ['Ordercomments']
    }),

    addOrderComment: builder.mutation({
      query: (ordercomments: OrderComment) => ({
        url: '/ordercomments',
        method: 'POST',
        body: ordercomments,
      }),
      invalidatesTags: ['Ordercomments'],
    }),
    updateOrderComment: builder.mutation<OrderComment, { userId: string,productId:string, orderId: string, ordercommentId: string; ordercomments: Partial<OrderComment> }>({
      query: ({ userId, orderId, ordercommentId,productId, ordercomments }) => ({
        url: `/ordercomments/${ordercommentId}`,
        method: 'PUT',
        body: { userId, productId,orderId, ...ordercomments },
      }), invalidatesTags: ['Ordercomments']
    }),

    removeOrderComment: builder.mutation({
      query: (id: string) => ({
        url: `/ordercomments/${id}`,
        method: 'DELETE',
      }), invalidatesTags: ['Ordercomments']

    }),


  }),

});

export const {
  useGetAllOrderCommentsQuery,
  useGetByIdOrderCommentsQuery,
  useAddOrderCommentMutation,
  useUpdateOrderCommentMutation,
  useRemoveOrderCommentMutation
} = ordercommentApi;

export default ordercommentApi;
