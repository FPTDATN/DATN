
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Layout from './pages/layout/Layout'
import Pay from './pages/Pay/pay'
import Card from './pages/Card/card'
import PayCard from './pages/Pay/pay1'
import { HomePage } from './pages/homePage';
import { HotProduct } from './pages/hot-product';
import { Admin } from './pages/Admin/admin';
import { Dashboard } from './pages/Admin/dashboard';
import { Product_admin } from './pages/Admin/products';
import { Category_admin } from './pages/Admin/category';
import { Users } from './pages/Admin/users';
import ProductDetail from './pages/ProductDetail';
import { Orders } from './pages/Admin/orders'



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="detail" element={<ProductDetail />} />
         
        </Route>
          <Route path="signup" element={<Register />} />
          <Route path="login" element={<Login />} />
        <Route path="/" element={<HomePage />}>
          <Route index element={<HotProduct />} />
        </Route>

        <Route path='pay' element={<Pay />} />
        <Route path='paycard' element={<PayCard />} />
          <Route path='card' element={<Card />} />
        <Route path='admin' element={<Admin/>}>
        <Route index element={<Dashboard />}></Route>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='products' element={<Product_admin />} />
          <Route path='category' element={<Category_admin />} />
          <Route path='users' element={<Users/>} />
          <Route path='orders' element={<Orders/>} />
        </Route>
      </Routes>
      
    </>
  );
}

export default App;