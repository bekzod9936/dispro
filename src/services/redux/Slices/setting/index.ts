import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISecurty, IReward } from './type';

interface ISettings {
  security?: ISecurty;
  reward?: IReward;
}
const initialState: ISettings = {
  security: {
    isEnabledPaySumLimit: false,
    isEnabledPurchaseLimit: false,
  },
  reward: {},
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
  },
});

export const { setSecurty, setReward } = qrSettingsSlice.actions;
export default qrSettingsSlice.reducer;
