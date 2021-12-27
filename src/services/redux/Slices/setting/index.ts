import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISecurty, IReward, IRefQrcodes } from './type';

interface ISettings {
  security?: ISecurty;
  reward?: IReward;
  refQrcodes?: IRefQrcodes[];
}
const initialState: ISettings = {
  security: {
    isEnabledPaySumLimit: false,
    isEnabledPurchaseLimit: false,
  },
  reward: {},
  refQrcodes: [],
};

const qrSettingsSlice = createSlice({
  name: 'settingnew',
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
  },
});

export const { setSecurty, setReward, setRefQrcodes } = qrSettingsSlice.actions;
export default qrSettingsSlice.reducer;
