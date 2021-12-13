import { useState, useMemo } from "react";
import { useQuery, useMutation } from "react-query";
import {useHistory} from "react-router-dom";

//helpers
import {
  deleteSingleCashier,
  getCashiers,
  searchCashiers,
  createCashier,
  editStaff,
} from "services/queries/staffQuery";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import {
  selectAllCashier,
  setCashiers,
  setOpenCash,
  setSelectedCashiers,
  setSelectedManagers,
  setOpenEditCashier,
  setStaffData,
  setStoreFilters,
} from "services/redux/Slices/staffs";
import { store } from "services/redux/store";
import { numberWith } from "services/utils";


export const useSearchBranch = (query: string, arr: any[]) => {
	const branches = useMemo(() => {
		if(!query) return arr;
		return arr.filter(el => el.label.toLowerCase().includes(query.toLowerCase()))
	}, [query, arr])
	return branches
}



const useCashiers = ({ page, query, period, storeIdForFilter}: any) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const dispatch = useAppDispatch();
  const { storeFilters} = useAppSelector(state => state.staffs)
  
    //edit
	const editCashier = useMutation((data: any) => editStaff(data), {
		onSuccess: () => {
		  setOpenEdit(false);
		  dispatch(setOpenEditCashier(false));
		  response.refetch();
		},
	  });

  const response = useQuery(
    ["cashiers", page, query, period, storeIdForFilter],
    () => {
      if (query !== "") {
        return searchCashiers(query);
      }
      const url = Object.keys(period)
        .map((e: string) => `${e}=${period[e]}&`)
        .join("");
	
      return getCashiers(page, url, storeIdForFilter);
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
      cacheTime: 5000,
      onSuccess: (data) => {
		  let cashiers = data?.data?.data?.staffs;
		
		
        dispatch(setCashiers(data.data.data.staffs));
		!storeFilters && dispatch(setStoreFilters(cashiers.map((el: any) => ({value: el.store?.id, label: el.store?.address}))))
        dispatch(
          selectAllCashier(
            data?.data?.data?.staffs?.map((cashier: any) => {
              return {
                ...cashier,
                firstName: cashier?.firstName + " " + cashier?.lastName,
                score: numberWith(cashier?.addInfo?.avgRating, " "),
                avgCheque: numberWith(cashier?.addInfo?.avgCheque, " "),
                clients: numberWith(cashier?.addInfo?.countClient, " "),
                operations: numberWith(cashier?.addInfo?.countOperation, " "),
                amountOperation: numberWith(
                  cashier?.addInfo?.amountOperation,
                  " "
                ),
                countRefer: numberWith(cashier?.addInfo?.countRefer, " "),
              };
            })
          )
        );
      },
    }
  );

  const deleteCashier = useMutation((data: any) => deleteSingleCashier(data), {
    onSuccess: () => {
      setOpen(false);
      dispatch(setSelectedCashiers([]));
      dispatch(setSelectedManagers([]));

	  dispatch(setStaffData([]));
								history.push('/staff');

      response.refetch();
    },
  });

  const createCash = useMutation((data: any) => createCashier(data), {
    onSuccess: (data) => {
      response.refetch();
      setOpen(false);
      dispatch(setSelectedCashiers([]));
      dispatch(setOpenCash(false));
    },
  });

  return {
    response,
    deleteCashier,
    open,
    setOpen,
    createCash,
	editCashier,
  };
};

export default useCashiers;
