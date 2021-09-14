import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface IAuthSlice {
  signedIn: boolean;
  partnerLogin: any;
  regCompanyId: number;
  companyState: string;
  proceedAuth: boolean;
  refetch: Function;
}

const initialState: IAuthSlice = {
  signedIn: false,
  partnerLogin: null,
  regCompanyId: 0,
  companyState: 'old',
  proceedAuth: false,
  refetch: () => {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignedIn: (state, action: PayloadAction<boolean>) => {
      state.signedIn = action.payload;
    },
    setLogIn: (state, action: PayloadAction<any>) => {
      state.partnerLogin = action.payload;
    },
    setRegCompanyId: (state, action: PayloadAction<any>) => {
      state.regCompanyId = action.payload;
    },
    setCompanyState: (state, action: PayloadAction<any>) => {
      state.companyState = action.payload;
    },
    setProceedAuth: (state, action: PayloadAction<boolean>) => {
      state.proceedAuth = action.payload;
    },
    refetchCompanyList: (state, action: PayloadAction<Function>) => {
      state.refetch = action.payload;
    },
  },
});

export const {
  setSignedIn,
  setLogIn,
  setRegCompanyId,
  setCompanyState,
  setProceedAuth,
  refetchCompanyList,
} = authSlice.actions;

export default authSlice.reducer;
