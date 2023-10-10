import AdminLayout from '@/components/layout/AdminLayout';
import MainLayout from '@/components/layout/MainLayout';
import { Dashbroad } from '@/pages/admin/dashbroad';
import { ListCaegory } from '@/pages/admin/category/listCategory';
import { ListProduc } from '@/pages/admin/product/listProduct';
import Cart from '@/pages/user/cart/Cart';
import Home from '@/pages/user/home/Home';
import { Signin } from '@/pages/user/signin';
import { Signup } from '@/pages/user/signup';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { ListUser } from '@/pages/admin/user/listUser';
import AppTest from '@/pages/admin/category/test';

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
        ]
    },
    // Admin
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            { index: true, element: <Navigate to="dashboard" /> },
            { path: "dashboard", element: <Dashbroad /> },
            { path: "product", element: <ListProduc /> },
            { path: "category", element: <ListCaegory /> },
            { path: "user", element: <ListUser /> },
            { path: "test", element: <AppTest /> },





        ]
    },
]);

export default router;
