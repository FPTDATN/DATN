import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {waiting} from '@/utils/waiting';
interface ApiLoginInput {

    usernameOrEmail:string;


    password:string;
}

interface ApiRegisterInput {
    username:string;
    email:string;

    password:string;
    confirmPassword:string;
    firstName:string;
    lastName:string;
    fullName:string;
    phone:number;
    address?:string;
    rule:boolean;
    cardnumber?:number | null; // nếu có

}

interface ApiRenponse {
    name:string;
    email:string;
    avatar?:string;
}

const authApi = createApi({
    reducerPath: 'auth',
    tagTypes: ['Auth'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        fetchFn: async(...arg) => {
            await waiting(2000);
            return fetch(...arg)
        },
    }),
    endpoints: (builder) => ({ 
        signin: builder.mutation<ApiRenponse,ApiLoginInput>({
            query: (credential) => ({
                url: '/signin',
                method: 'POST',
                body:credential,
                credentials:'include'
            })
        }),
        signup:builder.mutation<ApiRenponse,ApiRegisterInput>({
            query: (credential) => ({
                url: '/signup',
                method: 'POST',
                body: credential,
                credentials:'include'
            })
        })
    })
})

export const {useSigninMutation,useSignupMutation} = authApi;
export default authApi;