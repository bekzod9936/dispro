import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuthSlice {
	signedIn: boolean;
	partnerLogin: any;
	regCompanyId: number;
	companyState: string;
	proceedAuth: boolean;
}
const initialState: IAuthSlice = {
	signedIn: false,
	partnerLogin: null,
	regCompanyId: 0,
	companyState: "old",
	proceedAuth: false,
};

const authSlice = createSlice({
	name: "auth",
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
	},
});

export const {
	setSignedIn,
	setLogIn,
	setRegCompanyId,
	setCompanyState,
	setProceedAuth,
} = authSlice.actions;
export default authSlice.reducer;
