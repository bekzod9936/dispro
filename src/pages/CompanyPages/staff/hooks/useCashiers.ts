import { useQuery } from "react-query";
import { getCashiers, searchCashiers } from "services/queries/StaffQueries";
import { useAppDispatch } from "services/redux/hooks";
import { setCashiers } from "services/redux/Slices/staffs";

const useCashiers = ({ page, query, period }: any) => {
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
      },
    }
  );

  return {
    response,
  };
};

export default useCashiers;
