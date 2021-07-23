import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface IAuthSlice {
    signedIn: boolean;
    partnerLogin: boolean;
}
const initialState = {
    signedIn: false,
    partnerLogin: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSignedIn: (state, action: PayloadAction<boolean>) => {
            state.signedIn = action.payload
        },
        setLogIn: (state, action: PayloadAction<boolean>) => {
            state.partnerLogin = action.payload;
        }
    }
})

export const { setSignedIn, setLogIn } = authSlice.actions;
export default authSlice.reducer