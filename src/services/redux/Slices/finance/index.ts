import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IFinance,
  ISuggestion,
  IPayment,
  IPayHeader,
  ICashBack,
  IHistory,
  ISum,
  ICashier,
} from './types';

const initialState: IFinance = {
  suggestionFinance: {
    data: [],
    totalCount: 0,
    between: '',
  },
  paymentFinance: {
    data: [],
    totalCount: 0,
    between: '',
    header: [],
  },
  cashBackFinance: {
    data: [],
    totalCount: 0,
    between: '',
    header: [],
  },
  historyFinance: {
    data: [],
    totalCount: 0,
    between: '',
    sum: {
      total: 0,
      minus: 0,
      paid: 0,
    },
    cashier: [],
  },
};

const financeSlice = createSlice({
  name: 'financeInfo',
  initialState: initialState,
  reducers: {
    setSuggestionFinanceData: (state, action: PayloadAction<ISuggestion[]>) => {
      state.suggestionFinance.data = action.payload;
    },
    setSuggestionFinanceTotal: (state, action: PayloadAction<number>) => {
      state.suggestionFinance.totalCount = action.payload;
    },
    setSuggestionFinanceBetween: (state, action: PayloadAction<string>) => {
      state.suggestionFinance.between = action.payload;
    },
    setPaymentFinanceData: (state, action: PayloadAction<IPayment[]>) => {
      state.paymentFinance.data = action.payload;
    },
    setPaymentFinanceTotal: (state, action: PayloadAction<number>) => {
      state.paymentFinance.totalCount = action.payload;
    },
    setPaymentFinanceBetween: (state, action: PayloadAction<string>) => {
      state.paymentFinance.between = action.payload;
    },
    setPaymentFinanceHeader: (state, action: PayloadAction<IPayHeader[]>) => {
      state.paymentFinance.header = action.payload;
    },
    setCashBackFinanceData: (state, action: PayloadAction<ICashBack[]>) => {
      state.cashBackFinance.data = action.payload;
    },
    setCashBackFinanceTotal: (state, action: PayloadAction<number>) => {
      state.cashBackFinance.totalCount = action.payload;
    },
    setCashBackFinanceBetween: (state, action: PayloadAction<string>) => {
      state.cashBackFinance.between = action.payload;
    },
    setCashBackFinanceHeader: (state, action: PayloadAction<IPayHeader[]>) => {
      state.cashBackFinance.header = action.payload;
    },
    setHistoryFinanceData: (state, action: PayloadAction<IHistory[]>) => {
      state.historyFinance.data = action.payload;
    },
    setHistoryFinanceTotal: (state, action: PayloadAction<number>) => {
      state.historyFinance.totalCount = action.payload;
    },
    setHistoryFinanceBetween: (state, action: PayloadAction<string>) => {
      state.historyFinance.between = action.payload;
    },
    setSumHistoryFinance: (state, action: PayloadAction<ISum>) => {
      state.historyFinance.sum = action.payload;
    },
    setCashierHistoryFinance: (state, action: PayloadAction<ICashier[]>) => {
      state.historyFinance.cashier = action.payload;
    },
  },
});

export const {
  setSuggestionFinanceData,
  setSuggestionFinanceTotal,
  setSuggestionFinanceBetween,
  setPaymentFinanceData,
  setPaymentFinanceTotal,
  setPaymentFinanceBetween,
  setPaymentFinanceHeader,
  setCashBackFinanceHeader,
  setCashBackFinanceBetween,
  setCashBackFinanceTotal,
  setCashBackFinanceData,
  setHistoryFinanceData,
  setHistoryFinanceTotal,
  setHistoryFinanceBetween,
  setSumHistoryFinance,
  setCashierHistoryFinance,
} = financeSlice.actions;
export default financeSlice.reducer;
