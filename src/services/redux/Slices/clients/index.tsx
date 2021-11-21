import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { numberWith } from "services/utils";
import { IClient, IFetchData, IFilters, IState } from "./types";

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
    note: "",
    referals: [],
    headers: [
        { value: "Клиент", label: "fullName" },
        { value: "Сумма скидки", label: "discountSum" },
        { value: "Сумма баллов", label: "pointSum" },
        { value: "Сумма кешбека", label: "cashbackSum" },
        { value: "Пол", label: "gender" },
        { value: "Возраст", label: "age" },
    ]
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
                    discountSum: numberWith(el.addInfo.discountSum + "", " ") || "-",
                    pointSum: numberWith(el.addInfo.pointSum + "", " ") || "-",
                    cashbackSum: numberWith(el.addInfo.cashbackSum + "", " ") || "-",
                    gender: el.addInfo.genderStr,
                    age: new Date().getFullYear() - new Date(el.dateOfBirth).getFullYear(),
                    amountOperation: numberWith(el.addInfo.amountOperation + "", " ") || "-",
                    countRefer: el.addInfo.countRefer || "-",
                    sourceBy: el.addInfo.sourceBy,
                    purchaseCount: numberWith(el.addInfo.countOperation + "", " "),
                    status: el.addInfo.status,
                    lastPurchase: el.addInfo.lastPurchaseDate ? dayjs(el.addInfo.lastPurchaseDate).format("DD.MM.YYYY") : "-",
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
            state.page = 1
        },
        resetFilters: (state: IState) => {
            state.filters = {}
            state.page = 1
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
        },
        setNote: (state: IState, { payload }: any) => {
            state.note = payload
        },
        setReferals: (state: IState, { payload }: any) => {
            state.referals = [...payload]
        },
        setHeaders: (state: IState, { payload }) => {
            const isAdded = state.headers.some(header => header.value === payload.value);
            if (isAdded) {
                state.headers = state.headers.filter(header => header.value !== payload.value);
            } else {
                state.headers = [...state.headers, payload]
            }
        }

    }
})

export const {
    removeFilter,
    setOpenSideBar,
    setReferals,
    setClients,
    setPage,
    setClient,
    selectAll,
    setFilters,
    resetFilters,
    setPeriod,
    setCurrentClient,
    setNote,
    setHeaders } = clientsSlice.actions
export default clientsSlice.reducer