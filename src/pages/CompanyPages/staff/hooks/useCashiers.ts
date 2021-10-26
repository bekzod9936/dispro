import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import {
  deleteSingleCashier,
  getCashiers,
  searchCashiers,
  getBranches,
} from "services/queries/StaffQueries";
import { useAppDispatch } from "services/redux/hooks";
import {
  selectAllCashier,
  setCashiers,
  setSelectedCashiers,
} from "services/redux/Slices/staffs";
import { numberWith } from "services/utils";

const useCashiers = ({ page, query, period }: any) => {
  const [open, setOpen] = useState(false);
  const [branches, setBranches] = useState([]);
  const dispatch = useAppDispatch();

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
      keepPreviousData: true,
      refetchIntervalInBackground: true,
      cacheTime: 50000,
      onSuccess: (data) => {
        dispatch(setCashiers(data.data.data.staffs));
        dispatch(
          selectAllCashier(
            data.data.data.staffs.map((cashier: any) => {
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
      response.refetch();
      dispatch(setSelectedCashiers([]));
    },
  });

  //fetch branches
  useQuery(
    ["branchesStore"],
    () => {
      return getBranches();
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      refetchIntervalInBackground: true,
      cacheTime: 50000,
      onSuccess: (data) => {
        console.log(data.data.data, "branches");
        setBranches(
          data.data.data.map((v: any) => {
            return { value: v.id, label: v.name };
          })
        );
      },
    }
  );

  return {
    response,
    deleteCashier,
    open,
    setOpen,
    branches,
  };
};

export default useCashiers;
