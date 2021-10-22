import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDeferred, IState } from "./types";
const initialState: IState = {
    drafts: [],
    deferred: [],
    onSale: [],
    archive: [],
    canceled: [],
    isLoading: false
}
const proposalsSlice = createSlice({
    name: "proposals",
    initialState,
    reducers: {
        setDrafts: (state: IState, action: PayloadAction<any>) => {
            state.drafts = action.payload
        },
        setDeferred: (state: IState, action: PayloadAction<IDeferred[]>) => {
            state.deferred = action.payload
        }
    }
})

export const {
    setDeferred,
    setDrafts
} = proposalsSlice.actions

export default proposalsSlice.reducer