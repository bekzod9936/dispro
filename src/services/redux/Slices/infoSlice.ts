import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface Props {
  addressAdd: boolean;
}
const initialState: Props = {
  addressAdd: true,
};

const infoSlice = createSlice({
  name: 'info',
  initialState: initialState,
  reducers: {
    setAddressAdd: (state, action: PayloadAction<boolean>) => {
      state.addressAdd = action.payload;
    },
  },
});

export const { setAddressAdd } = infoSlice.actions;
export default infoSlice.reducer;
