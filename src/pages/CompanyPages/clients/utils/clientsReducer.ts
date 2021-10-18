
export interface IState {
    clients: any[],
    page: number,
    totalCount: number,
    visibleClients: any[],
    selectedClients: any[]
}

type setClientsAction = {
    type: "setClients",
    payload: any[]
}

type ActionTypes = setClientsAction

export const initialState = {
    loading: false,
    isFiltersVisible: false,
    clients: [],
    page: 1,
    period: {
        startDate: '',
        endDate: ''
    },
    totalCount: 0,
    visibleClients: [],
    selectedClients: [],
    totalPages: 0,
    // filters: {
    //    gender: '',
    //    regDate: {
    //         regDateFrom: '',
    //         regDateTo: ''
    //     },
    //    purchaseAmount: {
    //         purchaseCountFrom: 0,
    //         purchaseCountTo: 0
    //    },
    //    notless: 0,
    //    status: [],
    //    trafficProvider: ''

    // },
    selectedFilters: [],
    filters: {}
}






export const clientsReducer = (state = initialState, action: any): any => {
    const { type, payload } = action
    switch(type) {
        case "setClients": {
            const visibleClients = payload.clients.map((el: any) => {
                return (
                    {
                        id: el.id,
                        fullName: `${el.firstName} ${el.lastName}`,
                        discountSum: el.addInfo.discountSum || "-",
                        pointSum: el.addInfo.pointSum || "-",
                        cashbackSum: el.addInfo.cashbackSum || "-",
                        gender: el.addInfo.genderStr,
                        age: new Date().getFullYear() - new Date(el.dateOfBirth).getFullYear(),
                        amountOperation: el.addInfo.amountOperation || "-",
                        countRefer: el.addInfo.countRefer || "-",
                        sourceBy: el.addInfo.sourceBy,
                        status: el.addInfo.status,
                        lastPurchase: el.addInfo.lastPurchaseAmount || '-',
                    })
            })
            return {
                ...state,
                clients: [...payload.clients],
                visibleClients: [...visibleClients],
                totalCount: payload.totalCount,
                selectedClients: [],
                totalPages: Math.ceil(payload.totalCount / 5),
                loading: false

            }
        } 
        case "setPage": {
            return {
                ...state,
                page: payload
            }
        }
        case "selectAll": {
            return {
                ...state,
                selectedClients: payload ? [...state.clients] : []
            }
        }
        case "removeAll": {
            return {
                ...state,
                selectedClients: []
            }
        }
        case "addClient": {
            const client = state.clients.find((el: any) => el.id === payload)
            return {
                ...state,
                selectedClients: [...state.selectedClients, client]
            }
        }
        case "removeClient": {
            return {
                ...state,
                selectedClients: [...state.selectedClients.filter((el: any) => el.id !== payload)]
            }
        }
        case "setFilters": {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [payload.key]: payload.value
                },
                // selectedFilters: payload.sFilters  
            }
        }
        case "removeFilter": {
            const filters: any = state.filters;
            delete filters[payload]
            return {
                ...state,
                filters: {...filters}
            }
        }
        case "resetFilters": {
            return {
                ...state,
                filters: {},
                selectedFilters: [] 
            }
        }
        case "loading": {
            return {
                ...state,
                loading: true
            }
        }
        case "setPeriod": {
            return {
                ...state,
                period: payload
            }
        }
        default: {
            return state
        }
    }
}