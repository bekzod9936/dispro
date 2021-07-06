import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Moment } from "moment";
import { RootState } from "../store";

interface clientState {
	startDate: Moment | null;
	endDate: Moment | null;
}

const initialState: clientState = {
	startDate: null,
	endDate: null,
};

const clientSlice = createSlice({
	name: "client",
	initialState,
	reducers: {
		setClientStartDate: (state, action: PayloadAction<any>) => {
			state.startDate = action.payload;
		},
		setClientEndDate: (state, action: PayloadAction<any>) => {
			state.endDate = action.payload;
		},
	},
});

export const { setClientStartDate, setClientEndDate } = clientSlice.actions;
export default clientSlice.reducer;
