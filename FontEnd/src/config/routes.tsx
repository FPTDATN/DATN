import AdminLayout from '@/components/layout/AdminLayout';
import MainLayout from '@/components/layout/MainLayout';

import Dashbroad from '@/pages/admin/dashbroad';
import ListCaegory from '@/pages/admin/category/listCategory';

import AccountDetail from '@/pages/user/account-detail/AccountDetail';

import Cart from '@/pages/user/cart/Cart';
import FilterProducts from '@/pages/user/filter/FilterProducts';
import Home from '@/pages/user/home/Home';
import ProductDetail from '@/pages/user/productdetail/ProductDetail';
import Signin from '@/pages/user/signin';
import Signup from '@/pages/user/signup';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import ListUser from '@/pages/admin/user/listUser';
import AppTest from '@/pages/admin/category/test';
import ListOrder from '@/pages/admin/order/listorder';
import ListProduct from '@/pages/admin/product/listProduct';
import PrivateRoute from '@/components/protectRoute/PrivateRoute';
import Error from '@/pages/error/Error';
import LocationList from '@/pages/user/checkout/Checkout';
import UpdateUser from '@/pages/admin/user/updateUser';

const router = createBrowserRouter([
    // Main layout
    {
        path: '/404',
        element: <Error />,
    },
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '',
                element: <Home />,
            },
            {
                path: 'cart',
                element: <Cart />,
            },
            {
                path: 'filter',
                element: <FilterProducts />,
            },
            {
                path: 'detail/:id',
                element: <ProductDetail />,
            },
            {
                path: 'checkout',
                element: <LocationList />,
            },
        ],
    },
    {
        path: '/account',
        children: [
            {
                path: 'signup',
                element: <Signup />,
            },
            {
                path: 'signin',
                element: <Signin />,
            },
            {
                path: 'details',
                element: <AccountDetail />,
            },
        ],
    },
    // Admin
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: (
                    // <PrivateRoute>
                    <Navigate to="dashboard" />
                    // {/* </PrivateRoute> */}
                ),
            },
            { path: 'dashboard', element: <Dashbroad /> },
            { path: 'product', element: <ListProduct /> },
            { path: 'category', element: <ListCaegory /> },
            { path: 'user', element: <ListUser /> },
            { path: 'user/update/:id', element: <UpdateUser /> },
            { path: 'test', element: <AppTest /> },
            { path: 'order', element: <ListOrder /> },
        ],
    },
]);

export default router;
