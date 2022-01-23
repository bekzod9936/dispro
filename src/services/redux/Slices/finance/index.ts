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
  ITotal,
  IStore,
  ISide,
} from './types';

const initialState: IFinance = {
  suggestionFinance: {
    data: [],
    total: { count: 0, pages: 0 },
    between: '',
  },
  paymentFinance: {
    data: [],
    total: { count: 0, pages: 0 },
    between: '',
    header: [],
  },
  cashBackFinance: {
    data: [],
    total: { count: 0, pages: 0 },
    between: '',
    header: [],
  },
  historyFinance: {
    data: [],
    total: { count: 0, pages: 0 },
    between: '',
    sum: {
      total: 0,
      minus: 0,
      paid: 0,
      cash: 0,
      card: 0,
    },
    cashier: [],
    storeIds: [],
    sidedrawer: {
      openRow: false,
      chosenRow: {},
    },
  },
};

const financeSlice = createSlice({
  name: 'financeInfo',
  initialState: initialState,
  reducers: {
    setSuggestionFinanceData: (state, action: PayloadAction<ISuggestion[]>) => {
      state.suggestionFinance.data = action.payload;
    },
    setSuggestionFinanceTotal: (state, action: PayloadAction<ITotal>) => {
      state.suggestionFinance.total = action.payload;
    },
    setSuggestionFinanceBetween: (state, action: PayloadAction<string>) => {
      state.suggestionFinance.between = action.payload;
    },
    setPaymentFinanceData: (state, action: PayloadAction<IPayment[]>) => {
      state.paymentFinance.data = action.payload;
    },
    setPaymentFinanceTotal: (state, action: PayloadAction<ITotal>) => {
      state.paymentFinance.total = action.payload;
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
    setCashBackFinanceTotal: (state, action: PayloadAction<ITotal>) => {
      state.cashBackFinance.total = action.payload;
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
    setHistoryFinanceTotal: (state, action: PayloadAction<ITotal>) => {
      state.historyFinance.total = action.payload;
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
    setStoreIdsHistoryFinance: (state, action: PayloadAction<IStore[]>) => {
      state.historyFinance.storeIds = action.payload;
    },
    setSideDrawer: (state, action: PayloadAction<ISide>) => {
      state.historyFinance.sidedrawer = action.payload;
    },
    setId: (state, action: PayloadAction<number>) => {
      state.historyFinance.id = action.payload;
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
  setStoreIdsHistoryFinance,
  setSideDrawer,
  setId,
} = financeSlice.actions;
export default financeSlice.reducer;
