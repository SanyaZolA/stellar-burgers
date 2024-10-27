import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import { getLoading, loginUserApiThunk } from '../../services/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import {
  AppDispatch,
  useDispatch,
  useSelector,
  RootState
} from '../../services/store';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const isLoadingProfile = useSelector(getLoading);

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.user?.name !== ''
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(loginUserApiThunk(userData));
  };

  if (isLoadingProfile) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
