import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ILoyalitySlice {
  useProgram: boolean;
  usePoint: boolean;
}

const initialState: ILoyalitySlice = {
  useProgram: false,
  usePoint: false,
};

const loyalitySlice = createSlice({
  name: "loyality",
  initialState,
  reducers: {
    setLoyaltyUse: (state, action: PayloadAction<ILoyalitySlice>) => {
      state.usePoint = action.payload.usePoint;
      state.useProgram = action.payload.useProgram;
    },
  },
});

export const { setLoyaltyUse } = loyalitySlice.actions;
export default loyalitySlice.reducer;
