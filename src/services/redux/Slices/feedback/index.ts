import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IFeedBack,
  IMessage,
  ICashiers,
  IratingAndReviews,
  IRatings,
  IHistory,
} from './types';

const initialState: IFeedBack = {
  messages: [],
  cashiers: [],
  clients: [],
  ratings: [],
  histories: [],
  supporthistories: [],
  totalHistory: 0,
  totalSupportHistory: 0,
  totalCount: 0,
  averageRating: 0,
  totalRating: 0,
  socket: {},
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
    setRatingsFeedBack: (state, action: PayloadAction<IRatings[]>) => {
      state.ratings = action.payload;
    },
    setChatClientHistory: (state, action: PayloadAction<IHistory[]>) => {
      state.histories = action.payload;
    },
    setChatSupportHistory: (state, action: PayloadAction<IHistory[]>) => {
      state.supporthistories = action.payload;
    },
    setTotalCountFeedBack: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },

    setTotalHistory: (state, action: PayloadAction<number>) => {
      state.totalHistory = action.payload;
    },
    setTotalSupportHistory: (state, action: PayloadAction<number>) => {
      state.totalSupportHistory = action.payload;
    },
    setAverageRatingFeedBack: (state, action: PayloadAction<number>) => {
      state.averageRating = action.payload;
    },
    setTotalRatingFeedBack: (state, action: PayloadAction<number>) => {
      state.totalRating = action.payload;
    },
    setSocket: (state, action: PayloadAction<any>) => {
      state.socket = action.payload;
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
  setSocket,
  setChatClientHistory,
  setTotalHistory,
  setChatSupportHistory,
  setTotalSupportHistory,
} = feedbackPostSlice.actions;
export default feedbackPostSlice.reducer;
