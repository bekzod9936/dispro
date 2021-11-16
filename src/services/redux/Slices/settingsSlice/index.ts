import { IBaseLoyality, IOpenState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IsettingsSlice {
  loyalty: string;
  base_loyality?: IBaseLoyality;
  openState: IOpenState;
}
const initialState: IsettingsSlice = {
  loyalty: "loyal",
  base_loyality: {
    max_percent: 0,
    give_cashback_after: 0,
    base_percent: 0,
  },
  openState: {
    type: "other",
    open: false,
  },
};

const settingsSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoyaltyProgramm: (state, action: PayloadAction<string>) => {
      state.loyalty = action.payload;
    },
    setBaseLoyality: (state, action: PayloadAction<IBaseLoyality>) => {
      state.base_loyality = action.payload;
    },
    handleClick: (state, action: PayloadAction<IOpenState>) => {
      state.openState = action.payload;
    },
  },
});

export const { setLoyaltyProgramm, setBaseLoyality, handleClick } =
  settingsSlice.actions;
export default settingsSlice.reducer;
