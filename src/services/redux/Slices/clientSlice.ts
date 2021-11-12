import { createSlice } from "@reduxjs/toolkit";

export interface IClientState {
  page: number;
  clients: any[];
  totalClients: number;
  addedHeaders: any[];
  headers: any[];
  visibleClients: any[];
  totalPages: number;
  checkedClients: any[];
}

const initialState: IClientState = {
  page: 1,
  clients: [],
  visibleClients: [],
  totalClients: 0,
  totalPages: 0,
  checkedClients: [],
  addedHeaders: [
    { value: "Клиент", label: "fullName" },
    { value: "Сумма скидки", label: "discountSum" },
    { value: "Сумма баллов", label: "pointSum" },
    { value: "Сумма кешбека", label: "cashbackSum" },
    { value: "Пол", label: "gender" },
    { value: "Возраст", label: "age" },
  ],

  headers: [
    { value: "Клиент", label: "fullName" },
    { value: "Сумма скидки", label: "discountSum" },
    { value: "Сумма баллов", label: "pointSum" },
    { value: "Сумма кешбека", label: "cashbackSum" },
    { value: "Пол", label: "gender" },
    { value: "Возраст", label: "age" },
    { value: "Оплачено", label: "amountOperation" },
    { value: "Рекомендации", label: "countRefer" },
    { value: "Источники трафика", label: "sourceBy" },
    { value: "Уровень", label: "status" },
    { value: "Последняя покупка", label: "lastPurchase" },
  ],
};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClients: (state, { payload }) => {
      state.clients = [...payload];
      state.visibleClients = payload.map((el: any) => {
        const client = {
          id: el.id,
          fullName: `${el.firstName} ${el.lastName}`,
          discountSum: el.addInfo.discountSum || "-",
          pointSum: el.addInfo.pointSum || "-",
          cashbackSum: el.addInfo.cashbackSum || "-",
          gender: el.addInfo.genderStr,
          age: 15,
          amountOperation: el.addInfo.amountOperation || "-",
          countRefer: el.addInfo.countRefer || "-",
          sourceBy: el.addInfo.sourceBy,
          status: el.addInfo.status,
          lastPurchase: el.addInfo.lastPurchaseAmount || "-",
        };
        return client;
      });
    },
    setPage: (state, { payload }) => {
      state.page = payload;
    },
    setTotalClients: (state, { payload }) => {
      state.totalClients = payload;
      state.totalPages = Math.ceil(payload / 3);
    },
    setHeader: (state, { payload }) => {
      state.addedHeaders = [...state.addedHeaders, payload];
    },
    removeHeader: (state, { payload }) => {
      state.addedHeaders = state.addedHeaders.filter(
        (header) => header.value !== payload.value
      );
    },
    addClient: (state, { payload }) => {},
    removeClient: (state, { payload }) => {
      state.checkedClients = state.checkedClients.filter(
        (client) => client.id !== payload
      );
    },
    addAllClients: (state, { payload }) => {
      state.checkedClients = payload ? [...state.clients] : [];
    },
  },
});

export const {
  setPage,
  setClients,
  setTotalClients,
  setHeader,
  addClient,
  removeHeader,
  addAllClients,
} = clientSlice.actions;
export default clientSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { dayjs } from "dayjs";

// export interface clientState {
// 	page: number;
// 	clients: Object[],
// 	startDate: dayjs | null;
// 	endDate: dayjs | null;
// 	clientsHeaders: any;
// 	checkedClients: Object[] | [];
// 	persCardClient: Object | null;
// 	gender: "male" | "female" | "";
// 	dateFrom: dayjs | null;
// 	dateTo: dayjs | null;
// 	purchaseAmountFrom: number;
// 	purchaseAmountTo: number;
// 	purchaseCost: number;
// 	status: "base" | "silver" | "gold" | "platinum" | "blocked" | "";
// 	trafficProvider: "app" | "mobile" | "cashier" | "";
// 	filterIsOpen: boolean;
// 	applied: boolean;
// }

// const initialState: clientState = {
// 	page: 1,
// 	clients: [],
// 	startDate: null,
// 	endDate: null,
// 	clientsHeaders: [
// 		"check",
// 		"client",
// 		"DiscountSum",
// 		"PointSum",
// 		"CashbackSum",
// 		"gender",
// 	],
// 	checkedClients: [],
// 	persCardClient: null,
// 	gender: "",
// 	dateFrom: null,
// 	dateTo: null,
// 	purchaseAmountFrom: 0,
// 	purchaseAmountTo: 0,
// 	purchaseCost: 0,
// 	status: "",
// 	trafficProvider: "",
// 	filterIsOpen: false,
// 	applied: true,
// };

// const clientSlice = createSlice({
// 	name: "client",
// 	initialState,
// 	reducers: {
// 		setClients: (state, {payload}) => {
// 			state.clients = [...payload]
// 		},
// 		resetClientFilters: (state) => ({
// 			...state,
// 			gender: "",
// 			dateFrom: null,
// 			dateTo: null,
// 			purchaseAmountFrom: 0,
// 			purchaseAmountTo: 0,
// 			purchaseCost: 0,
// 			status: "",
// 			trafficProvider: "",
// 		}),
// 		setPage: (state, { payload }) => {
// 			state.page = payload
// 		}
// 		setClientStartDate: (state, action: PayloadAction<any>) => {
// 			state.startDate = action.payload;
// 		},
// 		setClientEndDate: (state, action: PayloadAction<any>) => {
// 			state.endDate = action.payload;
// 		},
// 		setClientHeaders: (state, action: PayloadAction<any>) => {
// 			state.clientsHeaders = [...state.clientsHeaders, action.payload];
// 		},
// 		filterClientHeaders: (state, action: PayloadAction<any>) => {
// 			let afterFilter = state.clientsHeaders.filter(
// 				(item: string) => item !== action.payload
// 			);
// 			state.clientsHeaders = [...afterFilter];
// 		},
// 		setClient: (state, action: PayloadAction<any>) => {
// 			state.checkedClients = [...state.checkedClients, action.payload];
// 		},
// 		filterClients: (state, action: PayloadAction<any>) => {
// 			let afterFilter = state.checkedClients.filter(
// 				(item: any) => item.id !== action.payload
// 			);
// 			state.checkedClients = [...afterFilter];
// 		},
// 		resetClients: (state) => {
// 			state.checkedClients = [];
// 		},
// 		choseAllClients: (state, action: PayloadAction<any>) => {
// 			state.checkedClients = [...action.payload];
// 		},
// 		setPersCardClient: (state, action: PayloadAction<any>) => {
// 			state.persCardClient = action.payload;
// 		},
// 		resetClientDates: (state) => ({ ...state, endDate: null, startDate: null }),
// 		resetClientFilterItem: (state: any, action: PayloadAction<string>) => {
// 			let init: any = initialState;
// 			state[action.payload] = init[action.payload];
// 		},
// 		setClientGender: (state, action: PayloadAction<any>) => {
// 			state.gender = action.payload;
// 		},
// 		setClientDateFrom: (state, action: PayloadAction<any>) => {
// 			state.dateFrom = action.payload;
// 		},
// 		setClientDateTo: (state, action: PayloadAction<any>) => {
// 			state.dateTo = action.payload;
// 		},
// 		setClientPurchuaseAmountFrom: (state, action: PayloadAction<number>) => {
// 			state.purchaseAmountFrom = action.payload;
// 		},
// 		setClientPurchuaseAmountTo: (state, action: PayloadAction<number>) => {
// 			state.purchaseAmountTo = action.payload;
// 		},
// 		setClientPurchaseCost: (state, action: PayloadAction<number>) => {
// 			state.purchaseCost = action.payload;
// 		},
// 		setClientTrafficProvider: (state, action: PayloadAction<any>) => {
// 			state.trafficProvider = action.payload;
// 		},
// 		setClientStatus: (state, action: PayloadAction<any>) => {
// 			state.status = action.payload;
// 		},
// 		setClientFilterIsOpen: (state, action: PayloadAction<boolean>) => {
// 			state.filterIsOpen = action.payload;
// 		},

// 		setClientApplied: (state, action: PayloadAction<boolean>) => {
// 			state.applied = action.payload;
// 		},
// 		setAllClients: (state, action: PayloadAction<any>) => {
// 			state.checkedClients = [...action.payload];
// 		},
// 	},
// });

// export const {
// 	setClientStartDate,
// 	setAllClients,
// 	setClientEndDate,
// 	setClientHeaders,
// 	filterClientHeaders,
// 	setClient,
// 	filterClients,
// 	choseAllClients,
// 	resetClients,
// 	setPersCardClient,
// 	setClientGender,
// 	setClientDateFrom,
// 	setClientStatus,
// 	setClientDateTo,
// 	setClientPurchaseCost,
// 	setClientPurchuaseAmountFrom,
// 	setClientPurchuaseAmountTo,
// 	setClientTrafficProvider,
// 	setClientFilterIsOpen,
// 	setClientApplied,
// 	resetClientFilters,
// 	resetClientDates,
// 	resetClientFilterItem,
// } = clientSlice.actions;
// export default clientSlice.reducer;
