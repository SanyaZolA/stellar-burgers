import { configureStore } from '@reduxjs/toolkit';
import { reducer, getUser, getLoading } from './userSlice';
import {
  registerUserApiThunk,
  loginUserApiThunk,
  getUserApiThunk,
  updateUserApiThunk,
  logoutApiThunk,
  initialState
} from './userSlice';

const mockUser = {
  user: { name: 'Санька', email: 'test@example.com' },
  success: true,
  accessToken: 'test',
  refreshToken: 'test'
};

const store = configureStore({
  reducer: {
    reducer: reducer
  }
});

describe('userSlice', () => {
  test('Тест селектора getUser и getLoading', () => {
    const stateState = {
      user: initialState
    };
    expect(getUser(stateState)).toEqual(stateState.user.user);
    expect(getLoading(stateState)).toEqual(stateState.user.loading);
  });

  test('Тест pending у registerUserApiThunk', () => {
    const statePending = reducer(
      {
        user: {
          name: '',
          email: ''
        },
        loading: true,
        error: undefined
      },
      registerUserApiThunk.pending('', {
        email: 'test@example.com',
        name: 'Test User',
        password: '1234567'
      })
    );
    expect(statePending.loading).toEqual(true);
    expect(statePending.error).toBeUndefined();
    expect(statePending.user).toEqual(initialState.user);
  });

  test('Тест rejected у registerUserApiThunk', () => {
    const stateRejected = reducer(
      {
        user: {
          name: '',
          email: ''
        },
        loading: true,
        error: undefined
      },
      registerUserApiThunk.rejected(new Error('error'), 'Ошибка тестирования', {
        email: '',
        name: '',
        password: ''
      })
    );
    expect(stateRejected.loading).toEqual(false);
    expect(stateRejected.error).toEqual('error');
    expect(stateRejected.user).toEqual(initialState.user);
  });

  test('Тест fulfilled у registerUserApiThunk', () => {
    store.dispatch(
      registerUserApiThunk.fulfilled(mockUser, '', {
        email: 'test@example.com',
        name: 'Санька',
        password: '1234567'
      })
    );
    const state = store.getState();
    expect(state.reducer.user).toEqual(mockUser.user);
    expect(state.reducer.loading).toBe(false);
  });

  test('Тест pending у loginUserApiThunk', () => {
    store.dispatch(
      loginUserApiThunk.pending('', {
        email: 'test@example.com',
        password: '1234567'
      })
    );
    expect(store.getState().reducer.loading).toBe(true);
    expect(store.getState().reducer.error).toBeUndefined();
  });

  test('Тест rejected  у loginUserApiThunk', () => {
    store.dispatch(
      loginUserApiThunk.rejected(new Error('error'), 'Ошибка тестирования', {
        email: 'test@example.com',
        password: '1234567'
      })
    );
    expect(store.getState().reducer.loading).toBe(false);
    expect(store.getState().reducer.error).toEqual('error');
  });

  test('Тест fulfilled у loginUserApiThunk', () => {
    const mockUser = {
      user: { name: 'Test User', email: 'test@example.com' },
      success: true,
      accessToken: 'test',
      refreshToken: 'test'
    };
    store.dispatch(
      loginUserApiThunk.fulfilled(mockUser, '', {
        email: 'test@example.com',
        password: '1234567'
      })
    );
    expect(store.getState().reducer.user).toEqual(mockUser.user);
    expect(store.getState().reducer.loading).toBe(false);
  });

  test('Тест pending у getUserApiThunk', () => {
    store.dispatch(getUserApiThunk.pending(''));
    expect(store.getState().reducer.loading).toBe(true);
  });

  test('Тест rejected у getUserApiThunk', () => {
    store.dispatch(
      getUserApiThunk.rejected(new Error('error'), 'Ошибка тестирования')
    );
    expect(store.getState().reducer.loading).toBe(false);
    expect(store.getState().reducer.error).toEqual('error');
  });

  test('Тест fulfilled у getUserApiThunk', () => {
    store.dispatch(getUserApiThunk.fulfilled(mockUser, ''));
    expect(store.getState().reducer.user).toEqual(mockUser.user);
    expect(store.getState().reducer.loading).toBe(false);
  });

  test('Тест pending у logoutApiThunk', () => {
    store.dispatch(logoutApiThunk.pending(''));
    expect(store.getState().reducer.loading).toBe(true);
  });

  test('Тест rejected у logoutApiThunk', () => {
    store.dispatch(
      logoutApiThunk.rejected(new Error('error'), 'Ошибка тестирования')
    );
    expect(store.getState().reducer.loading).toBe(false);
    expect(store.getState().reducer.error).toEqual('error');
  });

  test('Тест fulfilled у logoutApiThunk', () => {
    store.dispatch({
      type: 'user/setUser',
      payload: {
        user: { name: 'Санька', email: 'test@example.com' },
        loading: false,
        error: 'error'
      }
    });
    const mockUser = { success: true };
    store.dispatch(logoutApiThunk.fulfilled(mockUser, ''));
    const state = store.getState().reducer;
    expect(state).toEqual({
      user: {
        name: '',
        email: ''
      },
      loading: false,
      error: undefined
    });
  });

  test('Тест pending у updateUserApiThunk', () => {
    store.dispatch(
      updateUserApiThunk.pending('', {
        name: 'Test User',
        email: 'test@example.com'
      })
    );
    expect(store.getState().reducer.loading).toBe(true);
  });

  test('Тест pending у updateUserApiThunk', () => {
    store.dispatch(
      updateUserApiThunk.pending('', {
        name: 'Test User',
        email: 'test@example.com'
      })
    );
    expect(store.getState().reducer.loading).toBe(true);
  });

  test('Тест fulfilled у updateUserApiThunk', () => {
    const mockUser = {
      user: { name: 'Test User', email: 'test@example.com' },
      success: true,
      accessToken: 'test',
      refreshToken: 'test'
    };
    store.dispatch(
      updateUserApiThunk.fulfilled(mockUser, '', {
        name: 'Test User',
        email: 'test@example.com'
      })
    );
    expect(store.getState().reducer.user).toEqual(mockUser.user);
    expect(store.getState().reducer.loading).toBe(false);
  });
});
