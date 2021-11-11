import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    INews,
    INewsData,
 
} from './types';

const initialState: INews = {
    NewsInfo: {
    data: [],
    totalCount: 0,
    between: '',
  },
  query:'',
};

const newsSlice = createSlice({
  name: 'news',
  initialState: initialState,
  reducers: {
    setNewsData: (state, action: PayloadAction<INewsData[]>) => {
      state.NewsInfo.data = action.payload;
    },
    setNewsTotal: (state, action: PayloadAction<number>) => {
      state.NewsInfo.totalCount = action.payload;
    },
    setNewsBetween: (state, action: PayloadAction<string>) => {
      state.NewsInfo.between = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    
  },
});

export const {
    setNewsData,
    setNewsTotal,
    setNewsBetween,
    setQuery,
} = newsSlice.actions;
export default newsSlice.reducer;
