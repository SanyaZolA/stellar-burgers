import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid4 } from 'uuid'; // Импортируем uuid для генерации уникальных ID
import { TConstructorIngredient, TIngredient } from '@utils-types';

type IinitialState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: IinitialState = {
  bun: null,
  ingredients: []
};

const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      const ingredient = action.payload;
      if (ingredient.type === 'bun') {
        state.bun = ingredient;
      } else {
        state.ingredients.push({
          ...ingredient,
          id: window.crypto.randomUUID()
        });
      }
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        const temp = state.ingredients[index];
        state.ingredients[index] = state.ingredients[index - 1];
        state.ingredients[index - 1] = temp;
      }
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.ingredients.length - 1) {
        const temp = state.ingredients[index];
        state.ingredients[index] = state.ingredients[index + 1];
        state.ingredients[index + 1] = temp;
      }
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.ingredients.splice(action.payload, 1);
    }
  },
  selectors: {
    getBurgerIngredient: (state) => state
  }
});

export const {
  addIngredient,
  moveIngredientUp,
  moveIngredientDown,
  removeIngredient
} = burgerIngredientsSlice.actions;

export const { getBurgerIngredient } = burgerIngredientsSlice.selectors;
export const reducer = burgerIngredientsSlice.reducer;
