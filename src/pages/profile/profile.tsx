import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { updateUserApiThunk } from '../../services/slice/userSlice';
import { Preloader } from '@ui';
import { getCookie } from '../../utils/cookie';
import { useDispatch, useSelector } from '../../services/store';

export const Profile: FC = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const accessToken = getCookie('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  const isAuthenticated = !!accessToken || !!refreshToken;

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUserApiThunk({ ...formValue }));
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  if (!isAuthenticated) {
    return <Preloader />;
  }

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
