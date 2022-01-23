import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const feedbackSlice = createSlice({
    name: "feedback",
    initialState: { socket: null },
    reducers: {
        setSocket: (state, action: PayloadAction<any>) => {
            state.socket = action.payload
        }
    }
})


export const { setSocket } = feedbackSlice.actions;
export default feedbackSlice.reducer;