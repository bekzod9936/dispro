import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface Props {
  addressAdd: boolean;
  addressInfo: {
    telNumbers?: string[];
    id?: number;
    name?: string;
    companyId?: number;
    address?: string;
    addressDesc?: string;
    location?: Location;
    workingTime?: {};
    isMain?: boolean;
    regionId?: number;
    dynLink?: string;
  } | null;
  copyDate: any[];
}
const initialState: Props = {
  addressAdd: true,
  addressInfo: {},
  copyDate: [],
};

const infoSlice = createSlice({
  name: 'info',
  initialState: initialState,
  reducers: {
    setAddressAdd: (state, action: PayloadAction<boolean>) => {
      state.addressAdd = action.payload;
    },
    setAddressInfo: (state, action: PayloadAction<Object | null>) => {
      state.addressInfo = action.payload;
    },
    setCopyDate: (state, action: PayloadAction<any[]>) => {
      state.copyDate = action.payload;
    },
  },
});

export const { setAddressAdd, setAddressInfo, setCopyDate } = infoSlice.actions;
export default infoSlice.reducer;
