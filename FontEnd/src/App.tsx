import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Layout from './pages/layout/Layout'
import Pay from './pages/Pay/pay'
import Card from './pages/Card/card'
import { HomePage } from './pages/homePage'
import { Admin } from './pages/Admin/admin'
import { Dashboard } from './pages/Admin/dashboard'
import { Product_admin } from './pages/Admin/products'
import { Category_admin } from './pages/Admin/category'
import { Users } from './pages/Admin/users'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />}></Route>
          <Route path='signup' element={<Register />} />
          <Route path='login' element={<Login />} />
        </Route>
        <Route>
          <Route path='pay' element={<Pay />} />
          <Route path='card' element={<Card />} />
        </Route>
        <Route path='admin' element={<Admin/>}>
        <Route index element={<Dashboard />}></Route>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='products' element={<Product_admin />} />
          <Route path='category' element={<Category_admin />} />
          <Route path='users' element={<Users />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
