import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISecurty } from './type';

interface ISettings {
  security?: ISecurty;
}
const initialState: ISettings = {
  security: {
    isEnabledPaySumLimit: false,
    isEnabledPurchaseLimit: false,
  },
};

const qrSettingsSlice = createSlice({
  name: 'settingnew',
  initialState,
  reducers: {
    setSecurty: (state, action: PayloadAction<ISecurty>) => {
      state.security = action.payload;
    },
  },
});

export const { setSecurty } = qrSettingsSlice.actions;
export default qrSettingsSlice.reducer;
