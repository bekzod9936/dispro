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
    page:1,
    perPage: 5,
    fromDate: '',
    toDate: '',
  },
  query:'',
  selectedNews:[],
  errorMessage:false
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
    setPage:(state,action:PayloadAction<number>)=>{
      state.setPeriod.page=action.payload;
    },
    setPerPage:(state,action:PayloadAction<number>)=>{
      state.setPeriod.perPage=action.payload;
    },
    setFromDate:(state,action:PayloadAction<number|string>)=>{
      state.setPeriod.fromDate=action.payload;
    },
    setToDate:(state,action:PayloadAction<number|string>)=>{
      state.setPeriod.toDate=action.payload;
    },
    setSelectedNews: (state, action: any) => {
      state.selectedNews = action.payload;
    },
    setErrorMessage:(state,action:any)=>{
      state.errorMessage=action.payload;
    }
  },
});

export const {
    setNewsData,
    setNewsTotal,
    setNewsBetween,
    setQuery,
    setPage,
    setPerPage,
    setFromDate,
    setToDate,
    setNewsTotalCount,
    setSelectedNews,
    setErrorMessage,
} = newsSlice.actions;
export default newsSlice.reducer;
