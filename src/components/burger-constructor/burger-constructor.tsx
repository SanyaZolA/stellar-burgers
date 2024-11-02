import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  AppDispatch,
  RootState,
  useDispatch,
  useSelector
} from '../../services/store';
import {
  getBurgerIngredient,
  delIngredient
} from '../../services/slice/burgerIngredientsSlice';
import {
  addOrderBurgerThunk,
  getOrderModalDataSelector,
  getOrderStatus,
  resetOrderState
} from '../../services/slice/ordersSlice';
import { useNavigate } from 'react-router-dom';
import { getFeedThunk } from '../../services/slice/feedSlice';

export const BurgerConstructor: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.user?.name !== ''
  );
  const navigate = useNavigate();

  const constructorItems = useSelector(getBurgerIngredient);

  const orderRequest = useSelector(getOrderStatus);

  const orderModalData = useSelector(getOrderModalDataSelector);

  const onOrderClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      if (!constructorItems.bun || orderRequest) return;
      const orderIngredients = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ing) => ing._id),
        constructorItems.bun._id
      ];
      dispatch(addOrderBurgerThunk(orderIngredients));
      dispatch(delIngredient());
      dispatch(getFeedThunk());
    }
  };

  const closeOrderModal = () => {
    dispatch(resetOrderState());
    dispatch(delIngredient());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
