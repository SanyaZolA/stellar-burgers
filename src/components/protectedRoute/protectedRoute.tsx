import { FC, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

export const ProtectedRoute: FC<{ children: JSX.Element }> = ({ children }) => {
  const location = useLocation();
  const accessToken = getCookie('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  const isAuthenticated = !!accessToken || !!refreshToken;

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
