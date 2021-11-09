import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInfo } from './types';

interface Props {
  data?: IInfo;
  addressAdding?: boolean;
}

export const initialState: Props = {
  data: {
    annotation: '',
    categories: [],
    companyNewsLimitCount: 0,
    currencyId: 0,
    description: '',
    disCommission: 0,
    email: '',
    filled: false,
    filledAddress: false,
    hasCoupon: false,
    id: 0,
    images: [],
    isHalol: false,
    keyWords: '',
    links: [],
    logo: '',
    merchantFields: '',
    merchantId: '0',
    merchantType: 0,
    name: '',
    program: null,
    qrCode: '',
    rating: 0,
    regionId: '',
    socialLinks: [],
    staffId: 0,
    status: 0,
    telNumber: '',
    type: 0,
    workingTime: { aroundTheClock: false, work: [] },
  },
  addressAdding: false,
};

const info = createSlice({
  name: 'info',
  initialState: initialState,
  reducers: {
    setInfoData: (state, action: PayloadAction<IInfo>) => {
      state.data = action.payload;
    },
    setAddressAdding: (state, action: PayloadAction<boolean>) => {
      state.addressAdding = action.payload;
    },
  },
});

export const { setInfoData, setAddressAdding } = info.actions;
export default info.reducer;
