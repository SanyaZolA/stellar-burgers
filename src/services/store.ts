import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { reducer as ingredientsReducer } from './slice/ingredientsSlice';
import { reducer as feedsReducer } from './slice/feedSlice';
import { reducer as burgerIngredientsReducer } from './slice/burgerIngredientsSlice';
import { reducer as ordersReducer } from './slice/ordersSlice';
import { reducer as userReducer } from './slice/userSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feeds: feedsReducer,
  burgerIngredients: burgerIngredientsReducer,
  orders: ordersReducer,
  user: userReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export default store;
