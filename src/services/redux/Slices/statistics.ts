import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IClientStatistics } from "../../Types/api";
import { RootState } from "../store";
interface statisticsState {
	currentSection: string;
	clientStatistics: Object[] | [];
}
const initialState: statisticsState = {
	currentSection: "clients",
	clientStatistics: [],
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
	},
});

export const { setCurrentSection, setStatistics } = statisticsSlice.actions;
export default statisticsSlice.reducer;
