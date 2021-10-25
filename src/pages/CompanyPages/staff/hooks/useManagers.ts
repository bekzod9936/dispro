import { useQuery } from "react-query";
import { getManagers, searchManagers } from "services/queries/StaffQueries";
import { useAppDispatch } from "services/redux/hooks";
import { setManagers } from "services/redux/Slices/staffs";

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
      },
    }
  );

  return {
    response,
  };
};

export default useManagers;
