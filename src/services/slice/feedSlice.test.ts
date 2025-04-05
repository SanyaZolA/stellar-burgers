import { configureStore } from '@reduxjs/toolkit';
import { getFeedThunk, reducer } from './feedSlice';
import { TOrder } from '@utils-types';
import * as burgerApi from '../../utils/burger-api';
import { TFeedsResponse } from '../../utils/burger-api';

type getFeedsApi = () => Promise<TFeedsResponse>;

jest.mock('../../utils/burger-api', () => ({
  getFeedsApi: jest.fn() as jest.MockedFunction<getFeedsApi>
}));

describe('Тест слайса - feedSlice', () => {
  test('проверка редьюсера', () => {
    const store = configureStore({
      reducer: reducer
    });
    const action = store.dispatch({ type: 'test' });
    expect(action).toEqual({ type: 'test' });
  });

  test('Тест pending у getFeedThunk', () => {
    const statePending = reducer(
      {
        orders: [],
        total: 0,
        totalToday: 0,
        success: false,
        isLoading: false,
        error: undefined
      },
      getFeedThunk.pending('')
    );
    expect(statePending.isLoading).toEqual(true);
  });

  test('Тест rejected у getFeedThunk', () => {
    const stateRejected = reducer(
      {
        orders: [],
        total: 0,
        totalToday: 0,
        success: false,
        isLoading: false,
        error: undefined
      },
      getFeedThunk.rejected(new Error('error'), 'Ошибка тестирования')
    );
    expect(stateRejected.orders).toEqual([]);
    expect(stateRejected.total).toEqual(0);
    expect(stateRejected.totalToday).toEqual(0);
    expect(stateRejected.isLoading).toEqual(false);
    expect(stateRejected.error).toEqual('error');
    expect(stateRejected.success).toEqual(false);
  });

  test('обновление данных при успешном getFeedThunk', async () => {
    const mockFeedData = {
      orders: [
        {
          _id: '67256cdeb27b06001c3e5d8a',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa093e'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный био-марсианский бургер',
          createdAt: '2024-11-02T00:05:50.303Z',
          updatedAt: '2024-11-02T00:05:51.313Z',
          number: 58394
        } as TOrder,
        {
          _id: '67254c50b27b06001c3e5d5e',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0948',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Альфа-сахаридный флюоресцентный люминесцентный бургер',
          createdAt: '2024-11-01T21:46:56.362Z',
          updatedAt: '2024-11-01T21:46:57.259Z',
          number: 58393
        } as TOrder
      ],
      total: 2,
      totalToday: 1
    };

    (burgerApi.getFeedsApi as jest.Mock).mockResolvedValue(mockFeedData);

    const store = configureStore({
      reducer: {
        feed: reducer
      }
    });
    await store.dispatch(getFeedThunk());
    const state = store.getState().feed;
    expect(state.orders).toHaveLength(2);
    expect(state.total).toBe(2);
    expect(state.totalToday).toBe(1);
    expect(state.success).toBe(true);
  });
});
