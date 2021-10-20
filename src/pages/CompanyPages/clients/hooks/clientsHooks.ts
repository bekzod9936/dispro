import { useQuery } from "react-query";
import { fetchClients, searchClients } from "services/queries/ClientsQueries";
import { ActionType, ActionTypes, IFilters } from "../utils/reducerTypes";
interface IArgs {
  page: number;
  dispatch: (arg: ActionType) => void;
  query: string;
  filters?: IFilters;
  period: {
    startDate: string;
    endDate: string;
    [index: string]: string;
  };
}

export const useFetchClients = ({ page, dispatch, query, period }: IArgs) => {
  const response = useQuery(
    ["clients", page, query, period],
    () => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
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
        dispatch({
          type: ActionTypes.SET_CLIENTS,
          payload: {
            clients: data.data.data.clients,
            totalCount: data.data.data.totalCount,
          },
        });
      },
    }
  );
  return response;
};
