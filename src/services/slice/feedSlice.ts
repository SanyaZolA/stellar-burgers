import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

export const getFeedThunk = createAsyncThunk('feed/getFeed', async () => {
  const feed = await getFeedsApi();
  return feed;
});

type FeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  success: boolean;
  isLoading: boolean;
  error: string | undefined;
};

const initialState: FeedState = {
  orders: [],
  success: false,
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: undefined
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFeedThunk.pending, (state) => {
      state.success = false;
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(getFeedThunk.rejected, (state, action) => {
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
      state.error = action.error.message;
      state.isLoading = false;
      state.success = false;
    });
    builder.addCase(getFeedThunk.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.success = true;
      state.isLoading = false;
    });
  }
});

export const getFeedSelectors = (state: { feeds: FeedState }) => state.feeds;

export const reducer = feedSlice.reducer;
