import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInfo, IAccounts, RProps } from './types';

interface Props {
  data?: IInfo;
  addressAdding?: boolean;
  exitmodal?: boolean;
  accounts?: IAccounts[];
  balance?: number;
  limit?: number;
  regions?: RProps[];
  payGo?: number;
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
  exitmodal: false,
  accounts: [],
  balance: 0,
  limit: 0,
  regions: [],
  payGo: 0,
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
    setExitModal: (state, action: PayloadAction<boolean>) => {
      state.exitmodal = action.payload;
    },
    setBalanceAccounts: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    setLimitAccounts: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setAccounts: (state, action: PayloadAction<IAccounts[]>) => {
      state.accounts = action.payload;
    },
    setRegions1: (state, action: PayloadAction<RProps[]>) => {
      state.regions = action.payload;
    },
    setPayGo: (state, action: PayloadAction<number>) => {
      state.payGo = action.payload;
    },
  },
});

export const {
  setInfoData,
  setAddressAdding,
  setExitModal,
  setAccounts,
  setLimitAccounts,
  setBalanceAccounts,
  setRegions1,
  setPayGo,
} = info.actions;
export default info.reducer;
