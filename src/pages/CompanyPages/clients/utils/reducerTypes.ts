export interface IState {
    clients: IClient[],
    page: number,
    totalCount: number,
    visibleClients: IVisibleClient[],
    selectedClients: IClient[],
    loading: boolean,
    isFiltersVisible: boolean,
    period: {
        startDate: string,
        endDate: string
    },
    totalPages: number | string,
    filters: {
        gender?: string | number,
        regDate?: {
            regDateFrom?: string,
            regDateTo?: string,
        },
        purchaseAmount?: {
            purchaseCountFrom?: string | number,
            purchaseCountTo?: string | number,
        }
        notless?: number | string,
        status?: any,
        trafficProvider?: string | number
    }
}

export interface IFilters {
    gender?: string | number,
    regDate?: {
        regDateFrom?: string,
        regDateTo?: string,
    },
    purchaseAmount?: {
        purchaseCountFrom?: string | number,
        purchaseCountTo?: string | number,
    }
    notless?: number | string,
    status?: any,
    trafficProvider?: string | number
}

export interface IVisibleClient {
    id: number,
    fullName: string,
    discountSum: number | string,
    pointSum: number | string,
    cashbackSum: number | string,
    gender: number | string,
    age: number | string,
    amountOperation: number | string,
    countRefer: number | string,
    sourceBy: number | string,
    status: number | string,
    lastPurchase: number | string,
}

export enum ActionTypes {
    SET_CLIENTS = "setClients",
    SET_VISIBLE_FILTERS = "setVisibleFilters",
    SET_PAGE = "setPage",
    SELECT_ALL = "selectAll",
    ADD_CLIENT = "addClient",
    REMOVE_CLIENT = "removeClient",
    SET_FILTERS = "setFilters",
    REMOVE_FILTER = "removeFilter",
    RESET_FILTERS = "resetFilters",
    SET_LOADING = "loading",
    SET_PERIOD = "setPeriod",
}

interface IClientLoyalty {
    isActive: boolean,
    percent: number
}

interface IClientsInfo {
    amountOperation: number,
    cashbackSum: number,
    countOperation: number,
    countRefer: number,
    dateOfBirth: string,
    discountSum: number,
    genderStr: string,
    lastPurchaseAmount: number,
    lastPurchaseDate: string,
    pointSum: number,
    referLevel: number,
    sourceBy: string,
    status: string, 
}
export interface IClient {
    addInfo: IClientsInfo,
    personalLoyaltyInfo: IClientLoyalty,
    id: number,
    createdAt: string,
    dateOfBirth: string,
    firstName: string,
    genderTypeId: number,
    image: string,
    lastName: string,
    profileStatus: string,
    qrCode: string,
    regionCode: string,
    regionId: number,
    telNumber: string,
    userId: number

}

interface ActionSetClients {
    type: ActionTypes.SET_CLIENTS,
    payload: {
        clients: IClient[],
        totalCount: number
    }
}

interface ActionSetVisibleFilters {
    type: ActionTypes.SET_VISIBLE_FILTERS,
    payload: boolean
}

interface ActionSetPage {
    type: ActionTypes.SET_PAGE,
    payload: number
}

interface ActionSelectAll {
    type: ActionTypes.SELECT_ALL,
    payload: boolean
}

interface ActionAddClient {
    type: ActionTypes.ADD_CLIENT,
    payload: number 
}

interface ActionRemoveClient {
    type: ActionTypes.REMOVE_CLIENT,
    payload: number    
}

interface ActionSetFilters {
    type: ActionTypes.SET_FILTERS,
    payload: IFilters
}

interface ActionRemoveFilter {
    type: ActionTypes.REMOVE_FILTER,
    payload: string
}

interface ActionResetFilters {
    type: ActionTypes.RESET_FILTERS,
    payload: any
}

interface ActionSetLoading {
    type: ActionTypes.SET_LOADING,
    payload: any
}

interface ActionSetPeriod {
    type: ActionTypes.SET_PERIOD,
    payload: {
        startDate?: string,
        endDate?: string
    }
}
export type ActionType = ActionSetClients | 
                        ActionAddClient | 
                        ActionSetVisibleFilters | 
                        ActionSetPage | 
                        ActionSelectAll |
                        ActionSetPeriod |
                        ActionSetLoading |
                        ActionResetFilters |
                        ActionRemoveFilter |
                        ActionSetFilters |
                        ActionRemoveClient