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
                path: 'signup',
                element: <Signup />
            }
            ,
            {
                path: 'signin',
                element: <Signin />
            },
<<<<<<< HEAD
            {
                path: 'filter',
                element: <FilterProducts/>
            }
            
=======
>>>>>>> 81d16f2430bf00e46b5712ccf2246de3b9b331e2
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
