import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useSelector } from 'react-redux';
import {
  getUser,
  registerUserApiThunk,
  getUserApiThunk
} from '../../services/slice/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from 'src/services/store';
import { useNavigate } from 'react-router-dom';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.user?.name !== ''
  );
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile'); // Навигация только после обновления состояния
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: SyntheticEvent) => {
    const data = {
      name: userName,
      email,
      password
    };
    dispatch(getUserApiThunk());
    dispatch(registerUserApiThunk(data));
    e.preventDefault();
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
