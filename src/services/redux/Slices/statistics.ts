import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Props {
  ageAvg?: number;
  allClientParkCards?: number;
  cashbackSum?: number;
  chequeAvg?: number;
  chequeCount?: number;
  clientCount?: number;
  couponAmountSum?: number;
  couponDiscountSum?: number;
  discountSum?: number;
  femaleCount?: number;
  filter?: {
    gender?: { id?: number; name?: string }[];
    levels?: { name?: string; number?: number }[];
    referal?: { name?: string; refIds: number[] }[];
  };
  maleCount?: number;
  paidWithMoney?: number;
  paidWithPoint?: number;
  pointSum?: number;
  uniqueChequeClient?: number;
}

interface statisticsState {
  currentSection: string;
  clientStatistics: Object[] | [];
  operationStatistics: Object[] | [];
  clientStats?: Props;
}
const initialState: statisticsState = {
  currentSection: "clients",
  clientStatistics: [],
  operationStatistics: [],
  clientStats: {},
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState: initialState,
  reducers: {
    setCurrentSection: (state, action: PayloadAction<string>) => {
      state.currentSection = action.payload;
    },
    setStatistics: (state, action: PayloadAction<Object[]>) => {
      state.clientStatistics = action.payload;
    },
    setOperationStatistics: (state, action: PayloadAction<Object[]>) => {
      state.operationStatistics = action.payload;
    },
    setClientStats: (state, action: PayloadAction<Props>) => {
      state.clientStats = action.payload;
    },
  },
});

export const {
  setCurrentSection,
  setStatistics,
  setOperationStatistics,
  setClientStats,
} = statisticsSlice.actions;
export default statisticsSlice.reducer;
