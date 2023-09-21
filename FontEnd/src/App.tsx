import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Layout from './pages/layout/Layout'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='signup' element={<Register />} />
          <Route path='login' element={<Login />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
