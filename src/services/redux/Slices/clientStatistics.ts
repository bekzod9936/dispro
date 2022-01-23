import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dayjs } from "dayjs";

interface IClientStatisticState {
  gender: "male" | "female" | "";
  dateFrom: Dayjs | null;
  dateTo: Dayjs | null;
  endDate: Dayjs | null;
  startDate: Dayjs | null;
  purchaseAmountFrom: number;
  purchaseAmountTo: number;
  purchaseCost: number;
  status: "base" | "silver" | "gold" | "platinum" | "";
  trafficProvider: "app" | "mobile" | "cashier" | "";
  filterIsOpen: boolean;
  applied: boolean;
}

const initialState: IClientStatisticState = {
  gender: "",
  dateFrom: null,
  dateTo: null,
  purchaseAmountFrom: 0,
  purchaseAmountTo: 0,
  purchaseCost: 0,
  status: "",
  trafficProvider: "",
  filterIsOpen: false,
  applied: true,
  endDate: null,
  startDate: null,
};
const clientStatisticsSlice = createSlice({
  name: "client-statistics",
  initialState,
  reducers: {
    resetFilters: (state) => ({
      ...state,
      gender: "",
      dateFrom: null,
      dateTo: null,
      purchaseAmountFrom: 0,
      purchaseAmountTo: 0,
      purchaseCost: 0,
      status: "",
      trafficProvider: "",
    }),
    resetDates: (state) => ({ ...state, endDate: null, startDate: null }),
    resetFilterItem: (state: any, action: PayloadAction<string>) => {
      let init: any = initialState;
      state[action.payload] = init[action.payload];
    },
    setGender: (state, action: PayloadAction<any>) => {
      state.gender = action.payload;
    },
    setDateFrom: (state, action: PayloadAction<any>) => {
      state.dateFrom = action.payload;
    },
    setDateTo: (state, action: PayloadAction<any>) => {
      state.dateTo = action.payload;
    },
    setPurchuaseAmountFrom: (state, action: PayloadAction<number>) => {
      state.purchaseAmountFrom = action.payload;
    },
    setPurchuaseAmountTo: (state, action: PayloadAction<number>) => {
      state.purchaseAmountTo = action.payload;
    },
    setPurchaseCost: (state, action: PayloadAction<number>) => {
      state.purchaseCost = action.payload;
    },
    setTrafficProvider: (state, action: PayloadAction<any>) => {
      state.trafficProvider = action.payload;
    },
    setStatus: (state, action: PayloadAction<any>) => {
      state.status = action.payload;
    },
    setFilterIsOpen: (state, action: PayloadAction<boolean>) => {
      state.filterIsOpen = action.payload;
    },
    setStartDate: (state, action: PayloadAction<any>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<any>) => {
      state.endDate = action.payload;
    },
    setApplied: (state, action: PayloadAction<boolean>) => {
      state.applied = action.payload;
    },
  },
});

export const {
  setGender,
  setDateFrom,
  setStatus,
  setDateTo,
  setPurchaseCost,
  setPurchuaseAmountFrom,
  setPurchuaseAmountTo,
  setTrafficProvider,
  setFilterIsOpen,
  setStartDate,
  setEndDate,
  setApplied,
  resetFilters,
  resetDates,
  resetFilterItem,
} = clientStatisticsSlice.actions;
export default clientStatisticsSlice.reducer;
