import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface IAuthSlice {
    signedIn: boolean;
    partnerLogin: any;
    regCompanyId: number;
}
const initialState: IAuthSlice = {
    signedIn: false,
    partnerLogin: null,
    regCompanyId: 0
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSignedIn: (state, action: PayloadAction<boolean>) => {
            state.signedIn = action.payload
        },
        setLogIn: (state, action: PayloadAction<any>) => {
            state.partnerLogin = action.payload;
        },
        setRegCompanyId: (state, action: PayloadAction<any>) => {
            state.regCompanyId = action.payload
        }
    }
})

export const { setSignedIn, setLogIn, setRegCompanyId } = authSlice.actions;
export default authSlice.reducer