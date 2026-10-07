import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import AdminDashboard from './AdminDashboard.tsx';
import './index.css';

const params = new URLSearchParams(window.location.search);
const isAdmin = params.get('admin') === '1' || window.location.pathname === '/admin';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdmin ? <AdminDashboard /> : <App />}
  </StrictMode>,
);
