import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IsettingsSlice {
	loyalty: string;
}
const initialState: IsettingsSlice = {
	loyalty: "loyal",
};

const settingsSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setLoyaltyProgramm: (state, action: PayloadAction<string>) => {
			state.loyalty = action.payload;
		},
	},
});

export const { setLoyaltyProgramm } = settingsSlice.actions;
export default settingsSlice.reducer;
