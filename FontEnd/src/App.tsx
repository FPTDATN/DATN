import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'


function App() {

  return (
    <>
      <Routes>
        <Route path='signup' element={<Register/>} />
        <Route path='login' element={<Login/>} />
      </Routes>
    </>
  )
}

export default App
