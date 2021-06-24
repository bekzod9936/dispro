import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Moment } from "moment";
import { IClientStatistics } from "../../Types/api";
import { RootState } from "../store";
interface statisticsState {
	currentSection: string;
	clientStatistics: Object[] | [];
	operationStatistics: Object[] | [];
}
const initialState: statisticsState = {
	currentSection: "clients",
	clientStatistics: [],
	operationStatistics: [],
};

const statisticsSlice = createSlice({
	name: "statistics",
	initialState: initialState,
	reducers: {
		setCurrentSection: (state, action: PayloadAction<string>) => {
			state.currentSection = action.payload;
		},
		setStatistics: (state, action: PayloadAction<Object[]>) => {
			state.clientStatistics = action.payload;
		},
		setOperationStatistics: (state, action: PayloadAction<Object[]>) => {
			state.operationStatistics = action.payload;
		},
	},
});

export const { setCurrentSection, setStatistics, setOperationStatistics } =
	statisticsSlice.actions;
export default statisticsSlice.reducer;
