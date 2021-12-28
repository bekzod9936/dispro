import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISecurty, IReward, IRefQrcodes, IBranchQrcodes } from "./type";

interface ISettings {
  security?: ISecurty;
  reward?: IReward;
  refQrcodes?: IRefQrcodes[];
  branchQrcodes?: IBranchQrcodes[];
}
const initialState: ISettings = {
  security: {
    isEnabledPaySumLimit: false,
    isEnabledPurchaseLimit: false,
  },
  reward: {},
  refQrcodes: [],
  branchQrcodes: [],
};

const qrSettingsSlice = createSlice({
  name: "settingnew",
  initialState,
  reducers: {
    setSecurty: (state, action: PayloadAction<ISecurty>) => {
      state.security = action.payload;
    },
    setReward: (state, action: PayloadAction<IReward>) => {
      state.reward = action.payload;
    },
    setRefQrcodes: (state, action: PayloadAction<IRefQrcodes[]>) => {
      state.refQrcodes = action.payload;
    },
    setBranchQrCodes: (state, action: PayloadAction<IBranchQrcodes[]>) => {
      state.branchQrcodes = action.payload;
    },
  },
});

export const { setSecurty, setReward, setRefQrcodes, setBranchQrCodes } =
  qrSettingsSlice.actions;
export default qrSettingsSlice.reducer;
