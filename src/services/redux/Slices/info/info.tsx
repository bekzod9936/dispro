import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ILinks,
  ISocialLinks,
  IFromTo,
  IWork,
  IWorkTime,
  IInfo,
} from './types';

interface Props {
  data?: IInfo;
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
};

const info = createSlice({
  name: 'info',
  initialState: initialState,
  reducers: {
    setInfoData: (state, action: PayloadAction<IInfo>) => {
      state.data = action.payload;
    },
  },
});

export const { setInfoData } = info.actions;
export default info.reducer;
