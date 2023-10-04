import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import persistor, { store } from "./store";
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify'

// Css module

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css'
import './index.css'
import { SkeletonTheme } from 'react-loading-skeleton';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading="null" persistor={persistor}>
          <ToastContainer />
          <SkeletonTheme baseColor="#e8e8e8" highlightColor="#dfdfdf">
            <App />
          </SkeletonTheme>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
)
