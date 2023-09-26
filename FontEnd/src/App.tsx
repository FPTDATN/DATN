import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Layout from './pages/layout/Layout';
import Pay from './pages/Pay/pay';
import Card from './pages/Card/card';
import { HomePage } from './pages/homePage';
import { HotProduct } from './pages/hot-product';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="signup" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/" element={<HomePage />}>
          <Route index element={<HotProduct />} />
        </Route>
        <Route path="/pay" element={<Pay />} />
        <Route path="/card" element={<Card />} />
      </Routes>
    </>
  );
}

export default App;