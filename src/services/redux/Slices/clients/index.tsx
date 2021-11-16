import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IClient, IFetchData, IFilters, IPeriod, IPersonalInfo, IState, IVisibleClient } from "./types";

const initialState: IState = {
    loading: false,
    isFiltersVisible: false,
    clients: [],
    page: 1,
    period: {
        startDate: "",
        endDate: "",
    },
    totalCount: 0,
    visibleClients: [],
    selectedClients: [],
    totalPages: 0,
    filters: {},
    currentClient: null,
    qrCodeBar: false,
};

const clientsSlice = createSlice({
    name: "clients",
    initialState,
    reducers: {
        setClients: (state: IState, { payload }: PayloadAction<IFetchData>) => {
            const visibleClients = payload.clients.map((el: IClient) => {
                return {
                    id: el.id,
                    image: el.image,
                    fullName: `${el.firstName} ${el.lastName}`,
                    discountSum: el.addInfo.discountSum || "-",
                    pointSum: el.addInfo.pointSum || "-",
                    cashbackSum: el.addInfo.cashbackSum || "-",
                    gender: el.addInfo.genderStr,
                    age:
                        new Date().getFullYear() - new Date(el.dateOfBirth).getFullYear(),
                    amountOperation: el.addInfo.amountOperation || "-",
                    countRefer: el.addInfo.countRefer || "-",
                    sourceBy: el.addInfo.sourceBy,
                    status: el.addInfo.status,
                    lastPurchase: el.addInfo.lastPurchaseAmount || "-",
                };
            });
            state.clients = [...payload.clients]
            state.visibleClients = [...visibleClients]
            state.totalCount = payload.totalCount
            state.selectedClients = []
            state.totalPages = Math.ceil(payload.totalCount / 5)
        },
        setPage: (state: IState, { payload }: PayloadAction<number>) => {
            state.page = payload
        },
        setClient: (state: IState, { payload }: PayloadAction<number>) => {
            const client = state.clients.find(el => el.id === payload)
            const isAdded = state.selectedClients.find(el => el.id === payload)
            if (isAdded) {
                state.selectedClients = state.selectedClients.filter(el => el.id !== payload)
            }
            else {
                if (client) state.selectedClients = [...state.selectedClients, client]
            }
        },
        selectAll: (state: IState, { payload }: PayloadAction<boolean>) => {
            state.selectedClients = payload ? [...state.clients] : []
        },
        setFilters: (state: IState, { payload }: PayloadAction<IFilters>) => {
            state.filters = { ...payload }
        },
        resetFilters: (state: IState) => {
            state.filters = {}
        },
        setOpenSideBar: (state: IState, { payload }: PayloadAction<boolean>) => {
            state.qrCodeBar = payload
        },
        removeFilter: (state: IState, { payload }: PayloadAction<string>) => {
            delete state.filters[payload]
        },
        setPeriod: (state: IState, { payload }: PayloadAction<string>) => {
            if (payload) {
                const [startDate, endDate] = payload.split(" ~ ")
                state.period = {
                    startDate,
                    endDate
                }
            } else {
                state.period = { startDate: "", endDate: "" }
            }
        },
        setCurrentClient: (state: IState, { payload }: PayloadAction<any>) => {
            state.currentClient = payload
        }
    }
})

export const {
    removeFilter,
    setOpenSideBar,
    setClients,
    setPage,
    setClient,
    selectAll,
    setFilters,
    resetFilters,
    setPeriod,
    setCurrentClient } = clientsSlice.actions
export default clientsSlice.reducer