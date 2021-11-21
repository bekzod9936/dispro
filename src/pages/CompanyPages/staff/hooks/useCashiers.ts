import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import {useHistory} from "react-router-dom";
import {
  deleteSingleCashier,
  getCashiers,
  searchCashiers,
  createCashier,
  editStaff,
} from "services/queries/staffQuery";
import { useAppDispatch } from "services/redux/hooks";
import {
  selectAllCashier,
  setCashiers,
  setOpenCash,
  setSelectedCashiers,
  setSelectedManagers,
  setOpenEditCashier,
  setStaffData,
} from "services/redux/Slices/staffs";
import { numberWith } from "services/utils";

const useCashiers = ({ page, query, period }: any) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const dispatch = useAppDispatch();

    //edit
	const editCashier = useMutation((data: any) => editStaff(data), {
		onSuccess: () => {
		  setOpenEdit(false);
		  dispatch(setOpenEditCashier(false));
		  response.refetch();
		},
	  });

  const response = useQuery(
    ["cashiers", page, query, period],
    () => {
      if (query !== "") {
        return searchCashiers(query);
      }
      const url = Object.keys(period)
        .map((e: string) => `${e}=${period[e]}&`)
        .join("");
      return getCashiers(page, url);
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
      cacheTime: 5000,
      onSuccess: (data) => {
        dispatch(setCashiers(data.data.data.staffs));
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
