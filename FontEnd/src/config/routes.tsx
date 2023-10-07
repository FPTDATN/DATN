import AdminLayout from '@/components/layout/AdminLayout';
import MainLayout from '@/components/layout/MainLayout';
import Cart from '@/pages/user/cart/Cart';
import FilterProducts from '@/pages/user/filter/FilterProducts';
import Home from '@/pages/user/home/Home';
import { Signin } from '@/pages/user/signin';
import { Signup } from '@/pages/user/signup';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    // Main layout
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'cart',
                element: <Cart />
            }
            ,
            {
                path: 'filter',
                element: <FilterProducts/>
            }
            
        ]
    },
    {
        path: '/account',
        children: [
            {
                path: 'signup',
                element: <Signup />
            }
            ,
            {
                path: 'signin',
                element: <Signin />
            },
        ]
    },
    // Admin
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [

        ]
    },
]);

export default router;
