import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

export const ProtectedRoute: FC<{ children: JSX.Element }> = ({ children }) => {
  const accessToken = getCookie('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  // Если оба токена отсутствуют, перенаправляем на страницу логина
  const isAuthenticated = !!accessToken || !!refreshToken;

  // Если не аутентифицирован, перенаправляем на страницу логина
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  // Если токены присутствуют, рендерим дочерние компоненты
  return children;
};

export default ProtectedRoute;
