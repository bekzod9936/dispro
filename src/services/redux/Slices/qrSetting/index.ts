import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IsettingsSlice {
  stores: any;
}
const initialState: IsettingsSlice = {
  stores: [],
};

const qrSettingsSlice = createSlice({
  name: "qrSetting",
  initialState,
  reducers: {
    setStores: (state, action: PayloadAction<string>) => {
      state.stores = action.payload;
    },
  },
});

export const { setStores } = qrSettingsSlice.actions;
export default qrSettingsSlice.reducer;
