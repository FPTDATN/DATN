import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { waiting } from '@/utils/waiting';
interface ApiLoginInput {
    usernameOrEmail: string;

    password: string;
}

interface ApiRegisterInput {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phone?: number | null;
    address?: string;
    rule: boolean;
}

interface ApiRenponse {
    _id: string;
    address: string;
    email: string;
    favourite: any[];
    firstName: string;
    lastName: string;
    phone: number;
    role: string;
    username: string;
}

const authApi = createApi({
    reducerPath: 'auth',
    tagTypes: ['Auth'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        fetchFn: async (...arg) => {
            await waiting(2000);
            return fetch(...arg);
        },
    }),
    endpoints: (builder) => ({
        me: builder.query<ApiRenponse, void>({
            query: () => ({
                url: '/me',
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['Auth'],
        }),
        signin: builder.mutation<ApiRenponse, ApiLoginInput>({
            query: (credential) => ({
                url: '/signin',
                method: 'POST',
                body: credential,
                credentials: 'include',
            }),
            invalidatesTags: ['Auth']
        }),
        signup: builder.mutation<ApiRenponse, ApiRegisterInput>({
            query: (credential) => ({
                url: '/signup',
                method: 'POST',
                body: credential,
                credentials: 'include',
            }),
            invalidatesTags: ['Auth']
        }),
        logout: builder.mutation<boolean, void>({
            query: () => ({
                url: '/logout',
                method: 'POST',
                credentials: 'include'
            }),
            invalidatesTags: ['Auth']
        })
    }),
});

export const { useSigninMutation, useSignupMutation, useLogoutMutation, useMeQuery } = authApi;
export default authApi;
