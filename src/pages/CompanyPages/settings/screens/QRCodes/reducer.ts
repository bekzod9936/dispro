interface initialProps {
  filterType: string;
  inpuSearch: string;
  searchResRef: any[];
  searchResBranches: any[];
}

export const initialState: initialProps = {
  filterType: "",
  inpuSearch: "",
  searchResRef: [],
  searchResBranches: [],
};

export const reducerQr = (state: any, action: any) => {
  switch (action.type) {
    case "filter":
      return { ...state, filterType: action.payload };
    case "change":
      return { ...state, inpuSearch: action.payload };
    case "setRef":
      return { ...state, searchResRef: action.payload };
    case "setBranches":
      return { ...state, searchResBranches: action.payload };
    default:
      return state;
  }
};
