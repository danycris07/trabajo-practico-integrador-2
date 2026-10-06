import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoutes><LoginPage /></PublicRoutes>} />
        <Route path="/register" element={<PublicRoutes><RegisterPage /></PublicRoutes>} />
        <Route path="/" element={<PrivateRoutes><HomePage /></PrivateRoutes>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};