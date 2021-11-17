import { IBaseLoyality, IOpenState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IsettingsSlice {
  loyalty: string;
  base_loyality?: IBaseLoyality;
  openState: IOpenState;
  openM: boolean;
}
const initialState: IsettingsSlice = {
  loyalty: "loyal",
  base_loyality: {
    max_percent: 0,
    give_cashback_after: 0,
    base_percent: 0,
    base_name: "",
  },
  openState: {
    type: "other",
    open: false,
  },
  openM: false,
};

const settingsSlice = createSlice({
  name: "settingsSlice",
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
    addModal: (state, action: PayloadAction<boolean>) => {
      state.openM = action.payload;
    },
  },
});

export const { setLoyaltyProgramm, setBaseLoyality, handleClick, addModal } =
  settingsSlice.actions;
export default settingsSlice.reducer;
