import { useQuery } from "react-query";
import { fetchCilentsData } from "services/queries/statisticsQuery";
import { useAppDispatch } from "services/redux/hooks";
import { setOperations } from "services/redux/Slices/statistics/statistics";

interface Props {
  filterValues?: any;
}

const useOperationsHook = ({ filterValues }: Props) => {
  console.log(filterValues);
  const dispatch = useAppDispatch();
  const response = useQuery(
    "fetchOperationsInfo",
    () => {
      const url = Object.keys(filterValues)
        .map((v: any) => `${v}=${filterValues[v]}&`)
        .join("");
      return fetchCilentsData({ section: `operations?${url}` });
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: true,
      staleTime: 5000,
      retry: 0,
      onSuccess: (data) => {
        // dispatch()
        console.log(data.data.data, "operations");
        dispatch(setOperations(data.data.data));
      },
    }
  );
  const data = response?.data?.data?.data;

  return { response, data };
};

export default useOperationsHook;
