import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { AppDispatch, useDispatch, useSelector } from '../../services/store';
import { getFeedThunk, getFeedSelectors } from '../../services/slice/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch: AppDispatch = useDispatch();
  const feeds = useSelector(getFeedSelectors);

  const orders: TOrder[] = [...feeds.orders];

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeedThunk())} />
  );
};

export default Feed;
