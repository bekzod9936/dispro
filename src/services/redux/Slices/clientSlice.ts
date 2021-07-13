import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Moment } from "moment";
import { RootState } from "../store";

interface clientState {
	startDate: Moment | null;
	endDate: Moment | null;
	clientsHeaders: any;
	checkedClients: Object[] | [];
	persCardClient: Object | null;
	gender: "male" | "female" | "";
	dateFrom: Moment | null;
	dateTo: Moment | null;
	purchaseAmountFrom: number;
	purchaseAmountTo: number;
	purchaseCost: number;
	status: "base" | "silver" | "gold" | "platinum" | "blocked" | "";
	trafficProvider: "app" | "mobile" | "cashier" | "";
	filterIsOpen: boolean;
	applied: boolean;
}

const initialState: clientState = {
	startDate: null,
	endDate: null,
	clientsHeaders: [
		"check",
		"client",
		"DiscountSum",
		"PointSum",
		"CashbackSum",
		"gender",
	],
	checkedClients: [],
	persCardClient: null,
	gender: "",
	dateFrom: null,
	dateTo: null,
	purchaseAmountFrom: 0,
	purchaseAmountTo: 0,
	purchaseCost: 0,
	status: "",
	trafficProvider: "",
	filterIsOpen: false,
	applied: true,
};

const clientSlice = createSlice({
	name: "client",
	initialState,
	reducers: {
		resetClientFilters: (state) => ({
			...state,
			gender: "",
			dateFrom: null,
			dateTo: null,
			purchaseAmountFrom: 0,
			purchaseAmountTo: 0,
			purchaseCost: 0,
			status: "",
			trafficProvider: "",
		}),
		setClientStartDate: (state, action: PayloadAction<any>) => {
			state.startDate = action.payload;
		},
		setClientEndDate: (state, action: PayloadAction<any>) => {
			state.endDate = action.payload;
		},
		setClientHeaders: (state, action: PayloadAction<any>) => {
			state.clientsHeaders = [...state.clientsHeaders, action.payload];
		},
		filterClientHeaders: (state, action: PayloadAction<any>) => {
			let afterFilter = state.clientsHeaders.filter(
				(item: string) => item !== action.payload
			);
			state.clientsHeaders = [...afterFilter];
		},
		setClient: (state, action: PayloadAction<any>) => {
			state.checkedClients = [...state.checkedClients, action.payload];
		},
		filterClients: (state, action: PayloadAction<any>) => {
			let afterFilter = state.checkedClients.filter(
				(item: any) => item.id !== action.payload
			);
			state.checkedClients = [...afterFilter];
		},
		resetClients: (state) => {
			state.checkedClients = [];
		},
		choseAllClients: (state, action: PayloadAction<any>) => {
			state.checkedClients = [...action.payload];
		},
		setPersCardClient: (state, action: PayloadAction<any>) => {
			state.persCardClient = action.payload;
		},
		resetClientDates: (state) => ({ ...state, endDate: null, startDate: null }),
		resetClientFilterItem: (state: any, action: PayloadAction<string>) => {
			let init: any = initialState;
			state[action.payload] = init[action.payload];
		},
		setClientGender: (state, action: PayloadAction<any>) => {
			state.gender = action.payload;
		},
		setClientDateFrom: (state, action: PayloadAction<any>) => {
			state.dateFrom = action.payload;
		},
		setClientDateTo: (state, action: PayloadAction<any>) => {
			state.dateTo = action.payload;
		},
		setClientPurchuaseAmountFrom: (state, action: PayloadAction<number>) => {
			state.purchaseAmountFrom = action.payload;
		},
		setClientPurchuaseAmountTo: (state, action: PayloadAction<number>) => {
			state.purchaseAmountTo = action.payload;
		},
		setClientPurchaseCost: (state, action: PayloadAction<number>) => {
			state.purchaseCost = action.payload;
		},
		setClientTrafficProvider: (state, action: PayloadAction<any>) => {
			state.trafficProvider = action.payload;
		},
		setClientStatus: (state, action: PayloadAction<any>) => {
			state.status = action.payload;
		},
		setClientFilterIsOpen: (state, action: PayloadAction<boolean>) => {
			state.filterIsOpen = action.payload;
		},

		setClientApplied: (state, action: PayloadAction<boolean>) => {
			state.applied = action.payload;
		},
	},
});

export const {
	setClientStartDate,
	setClientEndDate,
	setClientHeaders,
	filterClientHeaders,
	setClient,
	filterClients,
	choseAllClients,
	resetClients,
	setPersCardClient,
	setClientGender,
	setClientDateFrom,
	setClientStatus,
	setClientDateTo,
	setClientPurchaseCost,
	setClientPurchuaseAmountFrom,
	setClientPurchuaseAmountTo,
	setClientTrafficProvider,
	setClientFilterIsOpen,
	setClientApplied,
	resetClientFilters,
	resetClientDates,
	resetClientFilterItem,
} = clientSlice.actions;
export default clientSlice.reducer;
