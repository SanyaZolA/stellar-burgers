import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import {
  registerUserApiThunk,
  getUserApiThunk
} from '../../services/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import {
  AppDispatch,
  useDispatch,
  useSelector,
  RootState
} from '../../services/store';

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
