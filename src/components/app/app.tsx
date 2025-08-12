import React, { lazy, Suspense, useEffect } from 'react';
import {
  ConstructorPage,
  Login,
  Register,
  Profile,
  Page404,
  Feed,
  ForgotPassword,
  ResetPassword,
  ProfileOrders
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
import { AppDispatch, useDispatch } from '../../services/store';
import { getIngredientsThunk } from '../../services/slice/ingredientsSlice';
import { ProtectedRoute } from '../protectedRoute/protectedRoute';
import { getFeedThunk } from '../../services/slice/feedSlice';
import { getUserApiThunk } from '../../services/slice/userSlice';
import { Preloader } from '@ui';
import { getOrdersThunk } from '../../services/slice/ordersSlice';

const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state?.background;

  useEffect(() => {
    dispatch(getUserApiThunk());
    dispatch(getIngredientsThunk());
    dispatch(getFeedThunk());
    dispatch(getOrdersThunk());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Suspense fallback={<Preloader />}>
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
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <OrderInfo />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<Page404 />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path='/ingredients/:id'
              element={
                <Modal title={''} onClose={() => navigate(-1)}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/feed/:number'
              element={
                <Modal title={''} onClose={() => navigate(-1)}>
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
      </Suspense>
    </div>
  );
};

export default App;
