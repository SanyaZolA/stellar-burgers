import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  getOrdersThunk,
  getOrdersSelectors
} from '../../services/slice/ordersSlice';
import { AppDispatch, useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(getOrdersSelectors);

  return <ProfileOrdersUI orders={orders} />;
};

export default ProfileOrders;
