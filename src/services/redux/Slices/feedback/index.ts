import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IFeedBack,
  IMessage,
  ICashiers,
  IratingAndReviews,
  IRatings,
  IHistory,
  IChose,
  IRating,
  IChoose,
  ITHistorySupport,
} from './types';

const initialState: IFeedBack = {
  messages: [],
  cashiers: [],
  clients: [],
  ratings: [],
  histories: [],
  supporthistories: [],
  totalHistory: {
    total: 0,
    page: 1,
    perPage: 10,
    loading: false,
    hasMore: true,
  },
  totalSupportHistory: {
    total: 0,
    page: 1,
    perPage: 10,
    loading: false,
    hasMore: true,
  },
  totalCount: 0,
  averageRating: { avg: 0, count: 0, downVal: 0, upVal: 0 },
  socket: {},
  chosenClient: { data: {}, choose: false },
  chosenListUser: {
    inntialHistory: { page: 1, perPage: 5 },
    fetchHistory: false,
    isChoose: false,
    chosen: {},
  },
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

    setTotalHistory: (state, action: PayloadAction<ITHistorySupport>) => {
      state.totalHistory = action.payload;
    },
    setTotalSupportHistory: (
      state,
      action: PayloadAction<ITHistorySupport>
    ) => {
      state.totalSupportHistory = action.payload;
    },
    setAverageRatingFeedBack: (state, action: PayloadAction<IRating>) => {
      state.averageRating = action.payload;
    },

    setSocket: (state, action: PayloadAction<any>) => {
      state.socket = action.payload;
    },
    setChosenClientChat: (state, action: PayloadAction<IChose>) => {
      state.chosenClient = action.payload;
    },
    setChosenListUser: (state, action: PayloadAction<IChoose>) => {
      state.chosenListUser = action.payload;
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
  setSocket,
  setChatClientHistory,
  setTotalHistory,
  setChatSupportHistory,
  setTotalSupportHistory,
  setChosenClientChat,
  setChosenListUser,
} = feedbackPostSlice.actions;
export default feedbackPostSlice.reducer;
