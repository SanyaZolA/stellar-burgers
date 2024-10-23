import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/services/store';
import { getBurgerIngredient } from '../../services/slice/burgerIngredientsSlise';
import {
  addOrderBurgerThunk,
  getOrderModalDataSelector,
  getOrderStatus,
  resetOrderState
} from '../../services/slice/ordersSlice';
import { useNavigate } from 'react-router-dom';

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
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      dispatch(
        addOrderBurgerThunk(constructorItems.ingredients.map((ing) => ing._id))
      );
    }
  };

  const closeOrderModal = () => {
    dispatch(resetOrderState());
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
