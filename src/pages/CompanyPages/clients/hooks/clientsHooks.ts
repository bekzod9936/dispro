import { Dispatch } from "react";
import { useQuery } from "react-query";
import { fetchClients, searchClients } from "services/queries/ClientsQueries";
import { IClientState, setClients, setTotalClients } from "services/redux/Slices/clientSlice";


export const useFetchClients = (
    page: number,
    dispatch: Dispatch<any> 
    ) => {
  const response = useQuery(
    ["clients", page],
    () => {
      // const url = Object.keys(filters).map(e => `${e}=${filters[e]}&`).join('')
      const url = ''
      return fetchClients(page, url)
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        dispatch(setClients(data.data.data.clients))
        dispatch(setTotalClients(data.data.data.totalCount))
      }
    }
  )
  return response
}




export const useSearchClient = (clientState: any, queryString: string, setResponseData: any) => {
  const response = useQuery(
    ["clients", queryString],
    () => searchClients(clientState.startDate, clientState.endDate, queryString),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setResponseData(data.data.data.clients)
      }
    }
  )
  return response
}

