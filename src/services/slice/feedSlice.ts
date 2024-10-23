import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
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
};

const initialState: FeedState = {
  orders: [],
  success: false,
  total: 0,
  totalToday: 0
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFeedThunk.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.success = true;
    });
  }
});

export const getFeedSelectors = (state: { feeds: FeedState }) => state.feeds;

export const reducer = feedSlice.reducer;
