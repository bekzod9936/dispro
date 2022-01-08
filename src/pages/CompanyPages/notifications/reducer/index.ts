import { initialPropsReducer } from "../types";

export const initialState: initialPropsReducer = {
  open: false,
  info: {},
  data: [],
  page: 1,
  pages: 0,
  perPage: 6,
  totalCount: 0,
  between: "",
};

export const reducerNote = (state: initialPropsReducer, action: any) => {
  switch (action.type) {
    case "setOpen":
      return { ...state, open: action.payload };
    case "setInfo":
      return { ...state, info: action.payload };
    case "setId":
      return { ...state, id: action.payload };
    case "setData":
      return { ...state, data: action.payload };
    case "setTotalCount":
      return { ...state, totalCount: action.payload };
    case "setPage":
      return { ...state, page: action.payload };
    case "setPages":
      return { ...state, pages: action.payload };
    case "setBetween":
      return { ...state, between: action.payload };

    default:
      return state;
  }
};
