import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

function waiting(time: any) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

interface Comment {
  _id?: string;
  text: string;
  userId?: any;
  productId?: any;
  parentCommentId?: any
  createdAt?: any
}

const commentApi = createApi({
  reducerPath: 'comments',
  tagTypes: ['Comments'],
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
    getAllComments: builder.query<Comment[], void>({
      query: () => '/comments',
      providesTags: ['Comments']
    }),

    getByIdComments: builder.query<Comment, any>({
      query: (_id) => `/comments/${_id}`,
      providesTags: ['Comments']
    }),

    addComment: builder.mutation({
      query: (comment: Comment) => ({
        url: '/comments',
        method: 'POST',
        body: comment,
      }),
      invalidatesTags: ['Comments'],
    }),
    updateComment: builder.mutation<Comment, { commentId: string; comment: Partial<Comment> }>({
      query: ({commentId,comment}) => ({
        url: `/comments/${commentId}`,
        method: 'PUT',
        body: comment,
      }), invalidatesTags: ['Comments']
    }),

    removeComment: builder.mutation({
      query: (id: string) => ({
        url: `/comments/${id}`,
        method: 'DELETE',
      }), invalidatesTags: ['Comments']

    }),


  }),

});

export const {
  useAddCommentMutation,
  useGetAllCommentsQuery,
  useGetByIdCommentsQuery,
  useUpdateCommentMutation,
  useRemoveCommentMutation,
} = commentApi;

export default commentApi;
export const commentReducer = commentApi.reducer;
