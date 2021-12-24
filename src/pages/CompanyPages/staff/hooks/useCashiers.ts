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
  setCashiersTotal,
} from "services/redux/Slices/staffs";
import { store } from "services/redux/store";
import { numberWith } from "services/utils";

const handleCheckLabelFields = (arr: any[]) => {
	if(!arr) {
		return []
	}
	return arr.filter(e => e.label)
}


export const useSearchBranch = (query: string, arr: any[]) => {
	const branches = useMemo(() => {
		if(!query) return handleCheckLabelFields(arr);
		return handleCheckLabelFields(arr).filter(el =>  el.label.toLowerCase().includes(query.toLowerCase()) )
	}, [query, arr])
	return branches;
	
}




const useCashiers = ({ query, period, storeIdForFilter}: any) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const dispatch = useAppDispatch();
  const { storeFilters} = useAppSelector(state => state.staffs)
  const [page, setPage] = useState(1)
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
		dispatch(setCashiersTotal(data.data.data.totalCount))
		// console.log(data.data.data)
		let res = cashiers.map((el: any) => ([...el.stores.map((e: any) => ({value: e.id, label: e.address}))]))
		let temp = res.reduce((acc: any, curr: any) => {
			curr.forEach((el: any )=> {
				acc.push(el)
			})

			return acc
		}, [])

		!storeFilters && dispatch(setStoreFilters(temp))
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
	  history.push('/staff/cashiers');

      response.refetch();
    },
  });

  const createCash = useMutation((data: any) => createCashier(data), {
    onSuccess: (data) => {
	console.log(`data`, data)
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
	page,
	setPage
  };
};

export default useCashiers;
