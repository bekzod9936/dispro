import { ActionType, ActionTypes, IClient, IState } from "./reducerTypes";

export const initialState: IState = {
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
};

export const clientsReducer = (
  state = initialState,
  action: ActionType
): IState => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.SET_CLIENTS: {
      const visibleClients = payload.clients.map((el: IClient) => {
        return {
          id: el.id,
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
      return {
        ...state,
        clients: [...payload.clients],
        visibleClients: [...visibleClients],
        totalCount: payload.totalCount,
        selectedClients: [],
        totalPages: Math.ceil(payload.totalCount / 5),
        loading: false,
      };
    }
    case ActionTypes.SET_VISIBLE_FILTERS: {
      return {
        ...state,
        isFiltersVisible: payload,
      };
    }
    case ActionTypes.SET_PAGE: {
      return {
        ...state,
        page: payload,
      };
    }
    case ActionTypes.SELECT_ALL: {
      console.log(state.clients, "clients");
      return {
        ...state,
        selectedClients: payload ? [...state.clients] : [],
      };
    }
    case ActionTypes.ADD_CLIENT: {
      const client = state.clients.find((el: IClient) => el.id === payload);
      return {
        ...state,
        selectedClients: client
          ? [...state.selectedClients, client]
          : [...state.selectedClients],
      };
    }
    case ActionTypes.REMOVE_CLIENT: {
      return {
        ...state,
        selectedClients: [
          ...state.selectedClients.filter((el: any) => el.id !== payload),
        ],
      };
    }
    case ActionTypes.SET_FILTERS: {
      return {
        ...state,
        filters: {
          ...state.filters,
          [payload.key]: payload.value,
        },
      };
    }
    case ActionTypes.REMOVE_FILTER: {
      const filters: any = state.filters;
      delete filters[payload];
      return {
        ...state,
        filters: { ...filters },
      };
    }
    case ActionTypes.RESET_FILTERS: {
      return {
        ...state,
        filters: {},
      };
    }
    case ActionTypes.SET_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case ActionTypes.SET_PERIOD: {
      return {
        ...state,
        period: payload,
      };
    }
    default: {
      return state;
    }
  }
};
