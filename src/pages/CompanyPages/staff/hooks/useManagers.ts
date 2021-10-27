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
            data?.data?.data?.map((manager: any) => {
              return {
                ...manager,
                firstName: manager?.firstName + " " + manager?.lastName,
                score: numberWith(manager?.addInfo?.avgRating, " "),
                avgCheque: numberWith(manager?.addInfo?.avgCheque, " "),
                clients: numberWith(manager?.addInfo?.countClient, " "),
                operations: numberWith(manager?.addInfo?.countOperation, " "),
                amountOperation: numberWith(
                  manager?.addInfo?.amountOperation,
                  " "
                ),
                countRefer: numberWith(manager?.addInfo?.countRefer, " "),
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
