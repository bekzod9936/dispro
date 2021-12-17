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
  IUsersProps,
  IFiter,
} from './types';

const initialState: IFeedBack = {
  messages: [],
  filter: {
    cashiers: [],
    stores: [],
  },
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
  averageRating: { avg: null, count: undefined, downVal: 0, upVal: 0 },
  socket: {},
  chosenClient: { data: {}, choose: false },
  chosenListUser: {
    inntialHistory: { page: 1, perPage: 5 },
    fetchHistory: false,
    isChoose: false,
    chosen: {},
  },
  badgeStorePost: {},
  users: [],
};

const feedbackPostSlice = createSlice({
  name: 'feedbackPosts',
  initialState: initialState,
  reducers: {
    setMessagesFeedBack: (state, action: PayloadAction<IMessage[]>) => {
      state.messages = action.payload;
    },
    setFiterFeedBack: (state, action: PayloadAction<IFiter>) => {
      state.filter = action.payload;
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
    setBadgeStorePost: (state, action: PayloadAction<IMessage>) => {
      state.badgeStorePost = action.payload;
    },
    setUsers: (state, action: PayloadAction<IUsersProps[]>) => {
      state.users = action.payload;
    },
  },
});

export const {
  setMessagesFeedBack,
  setFiterFeedBack,
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
  setBadgeStorePost,
  setUsers,
} = feedbackPostSlice.actions;
export default feedbackPostSlice.reducer;
