import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from 'react-redux';
import { logoutApiThunk } from '../../services/slice/userSlice';
import { AppDispatch } from 'src/services/store';
import { deleteCookie } from '../../utils/cookie';
import { useNavigate } from 'react-router-dom';

export const ProfileMenu: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logoutApiThunk()).then((result) => {
      if (logoutApiThunk.fulfilled.match(result)) {
        deleteCookie('accessToken');
        localStorage.clear();
        navigate('/');
      }
    });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
