import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { staffsState, ICashiers, IManagers } from "./types";

const initialState: staffsState = {
  cashiers: [],
  managers: [],
  query: "",
  allCashiers: [],
  allManagers: [],
  selectedCashiers: [],
  selectedManagers: [],
  openFilter: false,
  openCash: false,
  openManager: false,
};

const staffsSlice = createSlice({
  name: "staffs",
  initialState: initialState,
  reducers: {
    setCashiers: (state, action: PayloadAction<ICashiers[]>) => {
      state.cashiers = action.payload;
    },
    setManagers: (state, action: PayloadAction<IManagers[]>) => {
      state.managers = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    selectAllCashier: (state, action: any) => {
      state.allCashiers = action.payload;
    },
    setAllManager: (state, action: any) => {
      state.allManagers = action.payload;
    },
    setSelectedCashiers: (state, action: any) => {
      state.selectedCashiers = action.payload;
    },
    setSelectedManagers: (state, action: any) => {
      state.selectedManagers = action.payload;
    },
    setOpenFilter: (state, action: any) => {
      state.openFilter = action.payload;
    },
    setOpenCash: (state, action: any) => {
      state.openCash = action.payload;
    },
    setOpenManager: (state, action: any) => {
      state.openManager = action.payload;
    },
  },
});

export const {
  setCashiers,
  setManagers,
  setQuery,
  selectAllCashier,
  setSelectedCashiers,
  setOpenFilter,
  setOpenCash,
  setOpenManager,
  setSelectedManagers,
  setAllManager,
} = staffsSlice.actions;
export default staffsSlice.reducer;
