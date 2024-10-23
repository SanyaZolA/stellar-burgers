import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

export const getIngredientsThunk = createAsyncThunk(
  'ingredients/getIngredientsThunk',
  async () => {
    const ingredients = await getIngredientsApi();
    return ingredients;
  }
);

type IinitialState = {
  ingredients: TIngredient[];
  isLoading: boolean;
};

const initialState: IinitialState = {
  ingredients: [],
  isLoading: false
};

export const IngredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIngredientsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getIngredientsThunk.fulfilled, (state, action) => {
      state.ingredients = action.payload;
      state.isLoading = false;
    });
  },
  selectors: {
    getLoadingIngredients: (state) => state.isLoading,
    getIngredientsSelectors: (state) => state.ingredients
  }
});

export const { getIngredientsSelectors, getLoadingIngredients } =
  IngredientsSlice.selectors;
export const reducer = IngredientsSlice.reducer;
