import React, { useEffect } from 'react';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader, OrderInfo, Modal, IngredientDetails } from '@components';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { getIngredientsThunk } from '../../services/slice/ingredientsSlise';
import { ProtectedRoute } from '../protectedRoute/protectedRoute';
import { getFeedThunk } from '../../services/slice/feedSlice';
import { getUserApi } from '@api';
import { getUserApiThunk } from '../../services/slice/userSlice';
import { getCookie } from '../../utils/cookie';

const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state?.background;

  useEffect(() => {
    dispatch(getIngredientsThunk());
    dispatch(getFeedThunk());
    dispatch(getUserApiThunk());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Модальное окно поверх страницы */}
      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title={'Детали заказа'} onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title={''} onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
