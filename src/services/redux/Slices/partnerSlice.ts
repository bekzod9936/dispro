import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
interface partnerState {
	currentPage: string;
	company: object;
}
const initialState: partnerState = {
	currentPage: "statistics",
	company: {},
};

const partnerSlice = createSlice({
	name: "partner",
	initialState: initialState,
	reducers: {
		setCurrentPage: (state, action: PayloadAction<any>) => {
			console.log("I am here redux!");
			state.currentPage = action.payload;
		},
		setCompany: (state, action: PayloadAction<any>) => {
			state.company = { ...action.payload };
		},
	},
});

export const { setCurrentPage, setCompany } = partnerSlice.actions;
export default partnerSlice.reducer;
