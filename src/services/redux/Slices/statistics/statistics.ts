import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OffersProps, Props, OperationsProps, TrafficProps } from "./types";

interface statisticsState {
  currentSection: string;
  clientStatistics: Object[] | [];
  operationStatistics: Object[] | [];
  clientStats?: Props;
  offers: OffersProps[];
  operations?: OperationsProps;
  traffics?: TrafficProps[];
}
const initialState: statisticsState = {
  currentSection: "clients",
  clientStatistics: [],
  operationStatistics: [],
  clientStats: {},
  operations: {},
  offers: [
    {
      activeCount: "",
      expireCount: "",
      payedCount: "",
      type: "",
      usedCount: "",
    },
  ],
  traffics: [
    {
      source: "",
      clientCount: "",
      clientPayedCount: "",
      chequeCount: "",
      receipts: "",
    },
  ],
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
    setOffers: (state, action: PayloadAction<OffersProps[]>) => {
      state.offers = action.payload;
    },
    setOperations: (state, action: PayloadAction<OperationsProps>) => {
      state.operations = action.payload;
    },
    setTraffic: (state, action: PayloadAction<TrafficProps[]>) => {
      state.traffics = action.payload;
    },
  },
});

export const {
  setCurrentSection,
  setStatistics,
  setOperationStatistics,
  setClientStats,
  setOffers,
  setOperations,
  setTraffic,
} = statisticsSlice.actions;
export default statisticsSlice.reducer;
