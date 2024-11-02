import { configureStore } from '@reduxjs/toolkit';
import { ordersSlice, getOrdersThunk, addOrderBurgerThunk, resetOrderState } from './ordersSlice';

const store = configureStore({
  reducer: {
    orders: ordersSlice.reducer
  }
});

const mockOrderResponse = {
  order: {
    "ingredients": [], 
    _id: '1',
    status: "done",
    name: "Краторный бургер",
    createdAt: "2024-11-02T12:02:19.943Z",
    updatedAt: "2024-11-02T12:02:21.095Z",
    number: 58438,
    price: 2510 }, // Замените на реальные поля TOrder
  success: true, // Убедитесь, что это свойство есть
  name: 'New Order',
};

describe('ordersSlice', () => {
  beforeEach(() => {
    store.dispatch(resetOrderState());
  });

  test('Должен вернуть начальное состояние', () => {
    const state = store.getState().orders;
    expect(state).toEqual({
      orders: [],
      orderStatus: false,
      orderModalData: null
    });
  });

  test('Тест fulfilled для getOrdersThunk', async () => {
    const mockOrders = [
      {   _id: '1',
        status: 'done',
        name: 'Order 1',
        createdAt: '2024-11-02T00:05:50.303Z',
        updatedAt: '2024-11-02T00:05:51.313Z',
        number: 58394,
        ingredients: [],
      },
      {   
        _id: '2',
        status: 'done',
        name: 'Order 1',
        createdAt: '2024-11-02T00:05:50.303Z',
        updatedAt: '2024-11-02T00:05:51.313Z',
        number: 58394,
        ingredients: [],
      }
    ];

    await store.dispatch(getOrdersThunk.fulfilled(mockOrders, '', undefined));
    const state = store.getState().orders;
    expect(state.orders).toEqual(mockOrders);
  });

  test('Тест pending для addOrderBurgerThunk', () => {
    store.dispatch(addOrderBurgerThunk.pending('', ['ingredient1', 'ingredient2']));
    const state = store.getState().orders;
    expect(state.orderStatus).toBe(true);
  });

  test('Тест fulfilled для addOrderBurgerThunk', async () => {
    await store.dispatch(addOrderBurgerThunk.fulfilled(mockOrderResponse, '', ['ingredient1', 'ingredient2']));
    const state = store.getState().orders;
    expect(state.orderStatus).toBe(false);
    expect(state.orderModalData).toEqual(mockOrderResponse.order);
  });

  test('Тест resetOrderState action', () => {
    store.dispatch(addOrderBurgerThunk.fulfilled(mockOrderResponse, '', ['ingredient1', 'ingredient2']));
    store.dispatch(resetOrderState());
    const state = store.getState().orders;
    expect(state.orderStatus).toBe(false);
    expect(state.orderModalData).toBeNull();
  });
});
