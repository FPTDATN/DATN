import AdminLayout from '@/components/layout/AdminLayout';
import MainLayout from '@/components/layout/MainLayout';
import Cart from '@/pages/cart/Cart';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    // Main layout
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                path: 'cart',
                element: <Cart/>
            }
        ]
    },
    // Admin
    {
        path: '/admin',
        element: <AdminLayout/>,
        children: [
            
        ]
    },
]);

export default router;
