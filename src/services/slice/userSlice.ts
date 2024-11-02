import {
  TLoginData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '../../utils/burger-api';
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
  error: undefined | string;
};

const initialState: IInitialState = {
  user: {
    name: '',
    email: ''
  },
  loading: false,
  error: undefined
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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUserApiThunk.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(registerUserApiThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(registerUserApiThunk.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.loading = false;
    });

    builder.addCase(loginUserApiThunk.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(loginUserApiThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(loginUserApiThunk.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.loading = false;
    });

    builder.addCase(getUserApiThunk.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(getUserApiThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getUserApiThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
    });

    builder.addCase(updateUserApiThunk.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(updateUserApiThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateUserApiThunk.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.loading = false;
    });

    builder.addCase(logoutApiThunk.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(logoutApiThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(logoutApiThunk.fulfilled, (state) => {
      state.user = {
        name: '',
        email: ''
      };
      state.loading = false;
      state.error = undefined;
    });
  },
  selectors: {
    getUser: (state) => state.user,
    getLoading: (state) => state.loading
  }
});

export const { getUser, getLoading } = userSlice.selectors;
export const reducer = userSlice.reducer;
