import { useQuery } from "react-query";
import { fetchClients, searchClients } from "services/queries/ClientsQueries";
interface IArgs {
  page: number, 
  dispatch: any,
  query: string,
  filters: any,
  period: {
    startDate: string,
    endDate: string
    [index: string]: string
  }
}

export const useFetchClients = ({
    page,
    dispatch,
    query,
    filters,
    period 
    }: IArgs) => {
  const response = useQuery(
    ["clients", page, query, filters, period],
    () => {
      dispatch({type: "loading"})
      if (query !== '') {
        return searchClients(query)
      }
      const url = Object.keys(period).map((e: string) => `${e}=${period[e]}&`).join('')
      return fetchClients(page, url)
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        dispatch({type: "setClients", payload: { clients: data.data.data.clients, totalCount: data.data.data.totalCount}})
        
      }
    }
  )
  return response
}




