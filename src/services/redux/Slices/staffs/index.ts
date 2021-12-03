import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { staffsState, ICashiers, IManagers, IPointHistories} from "./types";

const initialState: staffsState = {
  cashiers: [],
  managers: [],
  query: "",
  allCashiers: [],
  allManagers: [],
  selectedCashiers: [],
  selectedManagers: [],
  openFilter: false,
  openCash: false,
  openManager: false,
  summaOperations: 0,
  stepManager: 1,
  permissions: [],
  userId: 0,
  selectedRole: [],
  openEditManager: false,
  openEditCashier: false,
  cashierId: "",
  managerId: "",
  staffData: [],
  pointHistories: {
    data: [],
    totalCount: 0,
    between: '',
  },
  storeFilters: null
};

const staffsSlice = createSlice({
  name: "staffs",
  initialState: initialState,
  reducers: {
    setCashiers: (state, action: PayloadAction<ICashiers[]>) => {
      state.cashiers = action.payload;
    },
    setManagers: (state, action: PayloadAction<IManagers[]>) => {
      state.managers = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    selectAllCashier: (state, action: any) => {
      state.allCashiers = action.payload;
    },
    setAllManager: (state, action: any) => {
      state.allManagers = action.payload;
    },
    setSelectedCashiers: (state, action: any) => {
      state.selectedCashiers = action.payload;
    },
    setSelectedManagers: (state, action: any) => {
      state.selectedManagers = action.payload;
    },
    setOpenFilter: (state, action: any) => {
      state.openFilter = action.payload;
    },
    setOpenCash: (state, action: any) => {
      state.openCash = action.payload;
    },
    setOpenManager: (state, action: any) => {
      state.openManager = action.payload;
    },
    setSummaOperations: (state, action: any) => {
      state.summaOperations = action.payload;
    },
    setStepManager: (state, action: any) => {
      state.stepManager = action.payload;
    },
    setPermissions: (state, action: any) => {
      state.permissions = action.payload;
    },
    setManagerId: (state, action: any) => {
      state.managerId = action.payload;
    },
    setUserId: (state, action: any) => {
      state.userId = action.payload;
    },
    setSelectedRole: (state, action: any) => {
      state.selectedRole = action.payload;
    },
    setOpenEditManager: (state, action: any) => {
      state.openEditManager = action.payload;
    },
    setOpenEditCashier: (state, action: any) => {
      state.openEditCashier = action.payload;
    },
    setCashierId: (state, action: any) => {
      state.cashierId = action.payload;
    },
    setStaffData: (state, action: any) => {
      state.staffData = action.payload;
    },
	setPointHistoriesData: (state, action: PayloadAction<any[]>) => {
		state.pointHistories.data = action.payload;
	  },
	setPointHistoriesTotal: (state, action: PayloadAction<number>) => {
		state.pointHistories.totalCount = action.payload;
	  },
	setPointHistoriesBetween: (state, action: PayloadAction<string>) => {
		state.pointHistories.between = action.payload;
	  },
	  setStoreFilters: (state, {payload}: PayloadAction<any>) => {
		  let res = payload.reduce((acc: any, curr: any) => {
			acc[curr.value] = curr.label;
			return acc
		  }, {})
		  state.storeFilters = Object.keys(res).map(el => ({value: el, label: res[el]}))
	  }


  },
});

export const {
  setCashiers,
  setManagers,
  setQuery,
  selectAllCashier,
  setSelectedCashiers,
  setOpenFilter,
  setOpenCash,
  setOpenManager,
  setSelectedManagers,
  setAllManager,
  setSummaOperations,
  setStepManager,
  setPermissions,
  setUserId,
  setManagerId,
  setSelectedRole,
  setOpenEditManager,
  setOpenEditCashier,
  setCashierId,
  setStaffData,
  setPointHistoriesBetween,
  setPointHistoriesData,
  setPointHistoriesTotal,
  setStoreFilters
  } = staffsSlice.actions;
export default staffsSlice.reducer;
