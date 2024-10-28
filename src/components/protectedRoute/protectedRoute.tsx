import { FC, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { getUserApiThunk } from '../../services/slice/userSlice';
import { useDispatch } from '../../services/store';

export const ProtectedRoute: FC<{ children: JSX.Element }> = ({ children }) => {
  const location = useLocation();
  const accessToken = getCookie('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const dispatch = useDispatch();

  const isAuthenticated = !!accessToken || !!refreshToken;

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserApiThunk());
    }
  }, []);

  return children;
};

export default ProtectedRoute;
