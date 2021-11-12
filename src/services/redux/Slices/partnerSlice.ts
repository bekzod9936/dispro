import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface partnerState {
  currentPage: string;
  company: object;
  companyInfo: {
    annotation: string;
    description: string;
    email: string;
    images: any[];
    keyWords: string;
    logo: string;
    name: string;
    socialLinks: { value: string; name: string }[];
    telNumber: string;
    links: { address: string; enable: boolean; name: string; id: number }[];
    categories?: any;
  };
}
const initialState: partnerState = {
  currentPage: "statistics",
  company: {},
  companyInfo: {
    annotation: "",
    description: "",
    email: "",
    images: [""],
    keyWords: "",
    logo: "",
    name: "",
    socialLinks: [{ value: "", name: "" }],
    telNumber: "",
    links: [{ address: "", enable: false, name: "", id: 0 }],
    categories: [1, 2],
  },
};

const partnerSlice = createSlice({
  name: "partner",
  initialState: initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<any>) => {
      state.currentPage = action.payload;
    },
    setCompany: (state, action: PayloadAction<any>) => {
      state.company = { ...action.payload };
    },
    setCompanyInfo: (state, action: PayloadAction<any>) => {
      state.companyInfo = { ...action.payload };
    },
  },
});

export const { setCurrentPage, setCompany, setCompanyInfo } =
  partnerSlice.actions;
export default partnerSlice.reducer;
