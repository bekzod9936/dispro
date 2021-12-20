import { IBaseLoyality, IOpenState, IToggle } from "./types";
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
  offChecked:boolean;
  emptySale: boolean;
  toggleName: IToggle;
  smallI: any;
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
    type: "discount",
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
  offChecked:false,
  emptySale: true,
  toggleName: {
    name: "",
  },
  smallI: "",
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
    setOffChecked:(state,action:PayloadAction<boolean>)=>{
      state.offChecked=action.payload;
    },
    setMEmptySale: (state, action: PayloadAction<boolean>) => {
      state.emptySale = action.payload;
    },
    setChangeToggle: (state, action: PayloadAction<IToggle>) => {
      state.toggleName = action.payload;
    },
    setSmallI: (state, action: PayloadAction<any>) => {
      state.smallI = action.payload;
    },
  },
});

export const {
  setLoyaltyProgramm,
  setBaseLoyality,
  handleClick,
  addModal,
  setBallCheck,
  setOffChecked,
  setCashbackCheck,
  setSaleCheck,
  handleModal,
  setMEmptyCashback,
  setMEmptyBall,
  setMEmptySale,
  setChangeToggle,
  setSmallI,
} = settingsSlice.actions;
export default settingsSlice.reducer;
