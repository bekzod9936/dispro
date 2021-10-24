import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { staffsState, ICashiers, IManagers } from "./types";

const initialState: staffsState = {
  cashiers: [],
  managers: [],
  query: "",
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
  },
});

export const { setCashiers, setManagers, setQuery } = staffsSlice.actions;
export default staffsSlice.reducer;
