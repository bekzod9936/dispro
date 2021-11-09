import { useQuery } from "react-query";
import { fetchClients, searchClients } from "services/queries/clientsQuery";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { setClients } from "services/redux/Slices/clients";
import { RootState } from "services/redux/store";
interface IArgs {
  query: string;
}

export const useFetchClients = ({ query }: IArgs) => {
  const dispatch = useAppDispatch();
  const { page, filters, period } = useAppSelector(
    (state: RootState) => state.clients
  );
  const response = useQuery(
    ["clients", page, query, period, filters],
    () => {
      if (query !== "") {
        return searchClients(query);
      }
      const url = Object.keys(period)
        .map((e: string) => `${e}=${period[e]}&`)
        .join("");
      return fetchClients(page, url);
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      refetchIntervalInBackground: true,
      cacheTime: 50000,
      onSuccess: (data) => {
        dispatch(
          setClients({
            clients: data.data.data.clients,
            totalCount: data.data.data.totalCount,
          })
        );
      },
    }
  );
  return response;
};
