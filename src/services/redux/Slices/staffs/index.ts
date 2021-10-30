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
  summaOperations: 0,
  stepManager: 1,
  permissions: [],
  userId: 0,
  selectedRole: [],
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
    setSummaOperations: (state, action: any) => {
      state.summaOperations = action.payload;
    },
    setStepManager: (state, action: any) => {
      state.stepManager = action.payload;
    },
    setPermissions: (state, action: any) => {
      state.permissions = action.payload;
    },
    setUserId: (state, action: any) => {
      state.userId = action.payload;
    },
    setSelectedRole: (state, action: any) => {
      state.selectedRole = action.payload;
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
  setSummaOperations,
  setStepManager,
  setPermissions,
  setUserId,
  setSelectedRole,
} = staffsSlice.actions;
export default staffsSlice.reducer;
