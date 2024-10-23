import { getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrdersThunk = createAsyncThunk('orders/getOrders', async () => {
  const orders = await getOrdersApi();
  return orders;
});

export const addOrderBurgerThunk = createAsyncThunk(
  'orders/addOrderBurger',
  async (order: string[]) => {
    const data = await orderBurgerApi(order);
    return data;
  }
);

type IinitialState = {
  orders: TOrder[];
  orderStatus: boolean;
  orderModalData: TOrder | null;
};

const initialState: IinitialState = {
  orders: [],
  orderStatus: false,
  orderModalData: null
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.orderModalData = null;
      state.orderStatus = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getOrdersThunk.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
    builder.addCase(addOrderBurgerThunk.pending, (state) => {
      state.orderStatus = true;
    });
    builder.addCase(addOrderBurgerThunk.fulfilled, (state, { payload }) => {
      state.orderStatus = false;
      state.orderModalData = payload.order;
    });
  },
  selectors: {
    getOrdersSelectors: (state) => state.orders,
    getOrderStatus: (state) => state.orderStatus,
    getOrderModalDataSelector: (state) => state.orderModalData,
    resetOrderState: (state) => state
  }
});
export const { resetOrderState } = ordersSlice.actions;

export const { getOrdersSelectors, getOrderStatus, getOrderModalDataSelector } =
  ordersSlice.selectors;
export const reducer = ordersSlice.reducer;
