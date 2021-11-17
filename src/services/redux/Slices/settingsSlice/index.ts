import { IBaseLoyality, IOpenState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IsettingsSlice {
  loyalty: string;
  base_loyality?: IBaseLoyality;
  openState: IOpenState;
  openM: boolean;
  ballCheck: boolean;
  cashbackCheck: boolean;
  saleCheck: boolean;
  openModal: boolean;
  emptyCashback: boolean;
  emptyBall: boolean;
  emptySale: boolean;
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

  //mobile program loyality
  ballCheck: false,
  cashbackCheck: false,
  saleCheck: false,
  openModal: false,
  emptyCashback: true,
  emptyBall: true,
  emptySale: true,
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
    setBallCheck: (state, action: PayloadAction<boolean>) => {
      state.ballCheck = action.payload;
    },
    setCashbackCheck: (state, action: PayloadAction<boolean>) => {
      state.cashbackCheck = action.payload;
    },
    setSaleCheck: (state, action: PayloadAction<boolean>) => {
      state.saleCheck = action.payload;
    },
    handleModal: (state, action: PayloadAction<boolean>) => {
      state.openModal = action.payload;
    },
    setMEmptyCashback: (state, action: PayloadAction<boolean>) => {
      state.emptyCashback = action.payload;
    },
    setMEmptyBall: (state, action: PayloadAction<boolean>) => {
      state.emptyBall = action.payload;
    },
    setMEmptySale: (state, action: PayloadAction<boolean>) => {
      state.emptySale = action.payload;
    },
  },
});

export const {
  setLoyaltyProgramm,
  setBaseLoyality,
  handleClick,
  addModal,
  setBallCheck,
  setCashbackCheck,
  setSaleCheck,
  handleModal,
  setMEmptyCashback,
  setMEmptyBall,
  setMEmptySale,
} = settingsSlice.actions;
export default settingsSlice.reducer;
