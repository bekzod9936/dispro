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
        setSelectedCoupon: (state: IState, action: PayloadAction<number>) => {
            const coupon = state.drafts.find((coupon: IDeferred) => Number(coupon.id) === action.payload)
            state.currentCoupon = { ...coupon }
        },
        setDeferredCoupon: (state: IState, action: PayloadAction<number>) => {
            const coupon = state.deferred.find((coupon: IDeferred) => coupon.id === action.payload)
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
        },
        setArchive: (state: IState, action: PayloadAction<IDeferred[]>) => {
            state.archive = [...action.payload]
        },
        setCurrentArchiveCoupon: (state: IState, action: PayloadAction<number>) => {
            const coupon = state.archive.find(el => el.id === action.payload)
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
    setCanceledCoupon,
    setDeferredCoupon,
    setArchive,
    setCurrentArchiveCoupon,
    setCurrentCoupon
} = proposalsSlice.actions

export default proposalsSlice.reducer