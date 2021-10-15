
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
    clients: [],
    page: 1,
    totalCount: 0,
    visibleClients: [],
    selectedClients: [],
    totalPages: 0,
    filters: {
       gender: '',
       registration_date: {
            regDateFrom: '',
            regDateTo: ''
        },
       purchuase_amount: {
            purchaseCountFrom: 0,
            purchaseCountTo: 0
       },
       purchase_cost: 0,
       status: [],
       traffic_provider: ''

    }
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
                        age: 15,
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
                totalPages: Math.ceil(payload.totalCount / 3),
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
                filters: payload 
            }
        }
        case "resetFilters": {
            return {
                ...state,
                filters: {}
            }
        }
        case "loading": {
            return {
                ...state,
                loading: true
            }
        }
        default: {
            return state
        }
    }
}