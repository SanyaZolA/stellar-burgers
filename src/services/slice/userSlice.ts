import {
  TLoginData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { setCookie } from '../../utils/cookie';

type TUserData = {
  name: string;
  email: string;
  password: string;
};

type IInitialState = {
  user: Omit<TUserData, 'password'>;
  loading: boolean;
};

const initialState: IInitialState = {
  user: {
    name: '',
    email: ''
  },
  loading: true
};

export const registerUserApiThunk = createAsyncThunk(
  'user/registerUserApiThunk',
  async (data: TUserData) => {
    const user = await registerUserApi(data);
    setCookie('accessToken', user.accessToken);
    localStorage.setItem('refreshToken', user.refreshToken);
    return user;
  }
);

export const loginUserApiThunk = createAsyncThunk(
  'user/loginUserApiThunk',
  async (data: TLoginData) => {
    const user = await loginUserApi(data);
    setCookie('accessToken', user.accessToken);
    localStorage.setItem('refreshToken', user.refreshToken);
    return user;
  }
);

export const getUserApiThunk = createAsyncThunk(
  'user/getUserApiThunk',
  async () => {
    const user = await getUserApi();
    return user;
  }
);

export const updateUserApiThunk = createAsyncThunk(
  'user/updateUserApiThunk',
  async (data: TUser) => {
    const user = await updateUserApi(data);
    return user;
  }
);

export const logoutApiThunk = createAsyncThunk(
  'user/logoutApiThunk',
  async () => {
    const user = await logoutApi();
    return user;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUserApiThunk.fulfilled, (state, { payload }) => {
      state.user = payload.user;
    });
    builder.addCase(loginUserApiThunk.fulfilled, (state, { payload }) => {
      state.user = payload.user;
    });
    builder.addCase(getUserApiThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserApiThunk.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.loading = false;
    });
    builder.addCase(updateUserApiThunk.fulfilled, (state, { payload }) => {
      state.user = payload.user;
    });
    builder.addCase(logoutApiThunk.fulfilled, (state) => {
      state.user = {
        name: '',
        email: ''
      };
    });
  },
  selectors: {
    getUser: (state) => state.user,
    getLoading: (state) => state.loading
  }
});

export const { getUser, getLoading } = userSlice.selectors;
export const reducer = userSlice.reducer;
