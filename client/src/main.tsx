import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './app/app-provider.tsx';
// import App from '@/app/app.tsx';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/routes.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);
