import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOrdersThunk,
  addOrderBurgerThunk,
  getOrdersSelectors
} from '../../services/slice/ordersSlice';
import { AppDispatch } from 'src/services/store';

export const ProfileOrders: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrdersThunk());
  }, []);

  const orders: TOrder[] = useSelector(getOrdersSelectors);

  return <ProfileOrdersUI orders={orders} />;
};
