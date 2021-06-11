import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
interface statisticsState {
	currentSection: string;
}
const initialState: statisticsState = {
	currentSection: "clients",
};

const statisticsSlice = createSlice({
	name: "statistics",
	initialState: initialState,
	reducers: {
		setCurrentSection: (state, action: PayloadAction<string>) => {
			state.currentSection = action.payload;
		},
	},
});

export const { setCurrentSection } = statisticsSlice.actions;
export default statisticsSlice.reducer;
