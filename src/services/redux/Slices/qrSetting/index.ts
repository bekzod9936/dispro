import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IsettingsSlice {
  stores: any;
  branches: any;
}
const initialState: IsettingsSlice = {
  stores: [],
  branches: [],
};

const qrSettingsSlice = createSlice({
  name: "qrSetting",
  initialState,
  reducers: {
    setStores: (state, action: PayloadAction<string>) => {
      state.stores = action.payload;
    },
    setBranchList: (state, action: PayloadAction<any>) => {
      state.branches = action.payload;
    },
  },
});

export const { setStores, setBranchList } = qrSettingsSlice.actions;
export default qrSettingsSlice.reducer;
