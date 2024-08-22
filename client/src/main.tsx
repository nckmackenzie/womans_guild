import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './app/app-provider.tsx';
import App from '@/app/app.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
