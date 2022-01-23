import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDeferred, ISetCoupon, IState } from "./types";

const initialCouponState: IDeferred = {
    ageFrom: 0,
    ageUnlimited: true,
    categoryIds: [],
    company: null,
    companyId: 1,
    count: 0,
    currencyId: 1,
    description: "",
    endDate: "",
    fee: 0,
    id: 0,
    image: "",
    price: 0,
    publishDate: "",
    startDate: "",
    status: 0,
    title: "",
    type: 0,
    used: 0,
    value: 0,
    stat: null,
    settings: {
        time: {
            from: "",
            to: ""
        },
        weekDays: []
    }
}
const initialState: IState = {
    drafts: [],
    deferred: [],
    onSale: [],
    archive: [],
    canceled: [],
    currentCoupon: initialCouponState,
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
            state.currentCoupon = initialCouponState
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