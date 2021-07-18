import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface IAuthSlice {
    signedIn: boolean;
}
const initialState = {
    signedIn: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSignedIn: (state, action: PayloadAction<boolean>) => {
            state.signedIn = action.payload
        }
    }
})

export const { setSignedIn } = authSlice.actions;
export default authSlice.reducer