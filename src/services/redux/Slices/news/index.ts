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
    totalCountNews:0
  },
  setPeriod: {
    dateFrom:'',
    dateTo:'',
  },
  query:'',
  selectedNews:[]
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
    setNewsTotalCount: (state, action: PayloadAction<number>) => {
      state.NewsInfo.totalCountNews = action.payload;
    },

    setNewsBetween: (state, action: PayloadAction<string>) => {
      state.NewsInfo.between = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setStartPeriod:(state,action:PayloadAction<string>)=>{
      state.setPeriod.dateFrom=action.payload;
    },
    setEndPeriod:(state,action:PayloadAction<string>)=>{
      state.setPeriod.dateTo=action.payload;
    },
    setSelectedNews: (state, action: any) => {
      state.selectedNews = action.payload;
    },
  },
});

export const {
    setNewsData,
    setNewsTotal,
    setNewsBetween,
    setQuery,
    setStartPeriod,
    setEndPeriod,
    setNewsTotalCount,
    setSelectedNews,
} = newsSlice.actions;
export default newsSlice.reducer;
