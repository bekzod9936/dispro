import { useQuery } from "react-query";
import { getManagers, searchManagers } from "services/queries/StaffQueries";
import { useAppDispatch } from "services/redux/hooks";
import { setAllManager, setManagers } from "services/redux/Slices/staffs";
import { numberWith } from "services/utils";

const useManagers = ({ page, query, period }: any) => {
  const dispatch = useAppDispatch();

  const response = useQuery(
    ["cashiers", page, query, period],
    () => {
      if (query !== "") {
        return searchManagers(query);
      }
      const url = Object.keys(period)
        .map((e: string) => `${e}=${period[e]}&`)
        .join("");
      return getManagers(page, url);
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      refetchIntervalInBackground: true,
      cacheTime: 50000,
      onSuccess: (data) => {
        dispatch(setManagers(data.data.data));
        dispatch(
          setAllManager(
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

  return {
    response,
  };
};

export default useManagers;
