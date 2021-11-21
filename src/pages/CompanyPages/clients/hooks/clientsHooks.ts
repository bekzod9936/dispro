import { useQuery } from "react-query";
import { useState, useEffect } from "react"
import { fetchClients, searchClients } from "services/queries/clientsQuery";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { setClients, setReferals } from "services/redux/Slices/clients";
import { RootState } from "services/redux/store";
import { getFiltersForQuery } from "../utils/getSelectedFilters";
interface IArgs {
  query: string;
}

export const useFetchClients = ({ query }: IArgs) => {
  const dispatch = useAppDispatch();
  const { page, filters, period, referals } = useAppSelector(
    (state: RootState) => state.clients
  );

  const response = useQuery(
    ["clients", page, query, period, filters],
    () => {
      if (query !== "") {
        return searchClients(query);
      }
      let url = Object.keys(period)
        .map((e: string) => `${e}=${period[e]}&`)
        .join("");
      let filter = getFiltersForQuery(filters, referals);
      url = url + filter
      return fetchClients(page, url);
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        dispatch(setClients({
          clients: data.data.data.clients,
          totalCount: data.data.data.totalCount,
        }));
        const refs = data.data.data.filter.referal.reduce((acc: any, cur: any, index: number) => {
          acc[index] = cur
          return acc
        }, {})
        dispatch(setReferals(data.data.data.filter.referal));
      },
    }
  );
  return response;
};


