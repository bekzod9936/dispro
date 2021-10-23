import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IFeedBack,
  IMessage,
  ICashiers,
  IratingAndReviews,
  IRatings,
} from './types';

const initialState: IFeedBack = {
  messages: [],
  cashiers: [],
  clients: [],
  ratings: [],
  totalCount: 0,
  averageRating: 0,
  totalRating: 0,
};

const feedbackPostSlice = createSlice({
  name: 'feedbackPosts',
  initialState: initialState,
  reducers: {
    setMessagesFeedBack: (state, action: PayloadAction<IMessage[]>) => {
      state.messages = action.payload;
    },
    setCashiersFeedBack: (state, action: PayloadAction<ICashiers[]>) => {
      state.cashiers = action.payload;
    },
    setClientsFeedBack: (state, action: PayloadAction<IratingAndReviews[]>) => {
      state.clients = action.payload;
    },
    setTotalCountFeedBack: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    setRatingsFeedBack: (state, action: PayloadAction<IRatings[]>) => {
      state.ratings = action.payload;
    },
    setAverageRatingFeedBack: (state, action: PayloadAction<number>) => {
      state.averageRating = action.payload;
    },
    setTotalRatingFeedBack: (state, action: PayloadAction<number>) => {
      state.totalRating = action.payload;
    },
  },
});

export const {
  setMessagesFeedBack,
  setCashiersFeedBack,
  setClientsFeedBack,
  setTotalCountFeedBack,
  setRatingsFeedBack,
  setAverageRatingFeedBack,
  setTotalRatingFeedBack,
} = feedbackPostSlice.actions;
export default feedbackPostSlice.reducer;
