import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDeferred, ISetCoupon, IState } from "./types";
const initialState: IState = {
    drafts: [],
    deferred: [],
    onSale: [],
    archive: [],
    canceled: [],
    currentCoupon: {},
    isLoading: false,
    currentOnSaleCoupon: {},
    isSaving: false,
    isError: false,

}

const proposalsSlice = createSlice({
    name: "proposals",
    initialState,
    reducers: {
        setDeferred: (state: IState, action: PayloadAction<IDeferred[]>) => {
            state.deferred = action.payload
        },
        setCurrentCoupon: (state: IState, { payload }: PayloadAction<ISetCoupon>) => {
            const coupon = state[payload.location].find(el => el.id === payload.id)
            state.currentCoupon = coupon
        },
        resetCurrentCoupon: (state: IState) => {
            state.currentCoupon = {}
        },
        setOnSale: (state: IState, action: PayloadAction<IDeferred[]>) => {
            state.onSale = action.payload
        },
        setDrafts: (state: IState, action: PayloadAction<IDeferred[]>) => {
            state.drafts = [...action.payload]
        },
        setSaving: (state: IState, action: PayloadAction<boolean>) => {
            state.isSaving = action.payload
        },
        setCanceled: (state: IState, action: PayloadAction<IDeferred[]>) => {
            state.canceled = [...action.payload]
        },
        setArchive: (state: IState, action: PayloadAction<IDeferred[]>) => {
            state.archive = [...action.payload]
        },
    }
})

export const {
    setDeferred,
    setDrafts,
    resetCurrentCoupon,
    setOnSale,
    setSaving,
    setCanceled,
    setArchive,
    setCurrentCoupon
} = proposalsSlice.actions

export default proposalsSlice.reducer