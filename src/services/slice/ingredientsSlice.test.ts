import { configureStore } from '@reduxjs/toolkit';
import {
  getIngredientsSelectors,
  getIngredientsThunk,
  getLoadingIngredients,
  reducer
} from './ingredientsSlice';
import * as burgerApi from '../../utils/burger-api';
import { TFeedsResponse } from '../../utils/burger-api';
import { TIngredient } from '@utils-types';

type getIngredientsApi = () => Promise<TFeedsResponse>;

jest.mock('../../utils/burger-api', () => ({
  getIngredientsApi: jest.fn() as jest.MockedFunction<getIngredientsApi>
}));

type IinitialState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | undefined;
};

const initialState: IinitialState = {
  ingredients: [],
  isLoading: false,
  error: undefined
};

const stateState = {
  ingredients: initialState
};

describe('Тест слайса - ingredientsSlice', () => {
  test('проверка редьюсера', () => {
    const store = configureStore({
      reducer: reducer
    });
    const action = store.dispatch({ type: 'test' });
    expect(action).toEqual({ type: 'test' });
  });

  test('Тест pending у getIngredientsThunk', () => {
    const statePending = reducer(
      {
        ingredients: [],
        isLoading: false,
        error: undefined
      },
      getIngredientsThunk.pending('')
    );
    expect(statePending.isLoading).toEqual(true);
  });

  test('Тест rejected у getIngredientsThunk', () => {
    const stateRejected = reducer(
      {
        ingredients: [],
        isLoading: false,
        error: undefined
      },
      getIngredientsThunk.rejected(new Error('error'), 'Ошибка тестирования')
    );
    expect(stateRejected.ingredients).toEqual([]);
    expect(stateRejected.isLoading).toEqual(false);
    expect(stateRejected.error).toEqual('error');
  });

  test('обновление данных при успешном getIngredientsThunk', async () => {
    const mockFeedData = {
      ingredients: [
        {
          _id: '111',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-01-large.png',
          uniqueId: '333'
        } as TIngredient
      ]
    };

    (burgerApi.getIngredientsApi as jest.Mock).mockResolvedValue(mockFeedData);

    const store = configureStore({
      reducer: {
        feed: reducer
      }
    });
    await store.dispatch(getIngredientsThunk());
    const state = store.getState().feed;
    expect(state.ingredients).toEqual(mockFeedData);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(undefined);
  });

  test('Тест селектора getIngredientsSelectors', () => {
    const result = getIngredientsSelectors(stateState);
    expect(result).toEqual(initialState.ingredients);
  });

  test('Тест селектора getLoadingIngredients', () => {
    const result = getLoadingIngredients(stateState);
    expect(result).toEqual(initialState.isLoading);
  });
});
