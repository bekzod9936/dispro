import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDeferred, IState } from "./types";
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
        setSelectedCoupon: (state: IState, action: PayloadAction<number>) => {
            const coupon = state.drafts.find((coupon: IDeferred) => coupon.id === action.payload)
            state.currentCoupon = { ...coupon }

        },
        resetCurrentCoupon: (state: IState) => {
            state.currentCoupon = {}
        },
        setOnSale: (state: IState, action: PayloadAction<IDeferred[]>) => {
            state.onSale = action.payload
        },
        setCurrentOnSaleCoupon: (state: IState, action: PayloadAction<number>) => {
            const coupon = state.onSale.find((el: IDeferred) => el.id === action.payload)
            state.currentCoupon = { ...coupon }
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
        setCanceledCoupon: (state: IState, action: PayloadAction<number>) => {
            const coupon = state.canceled.find((el: IDeferred) => el.id === action.payload)
            state.currentCoupon = coupon
        }
    }
})

export const {
    setDeferred,
    setDrafts,
    setSelectedCoupon,
    resetCurrentCoupon,
    setOnSale,
    setCurrentOnSaleCoupon,
    setSaving,
    setCanceled,
    setCanceledCoupon
} = proposalsSlice.actions

export default proposalsSlice.reducer