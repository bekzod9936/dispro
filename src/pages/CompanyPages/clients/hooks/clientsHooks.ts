import { useQuery } from "react-query";
import { fetchClients, searchClients } from "services/queries/ClientsQueries";


export const useFetchClients = (
    page: number,
    dispatch: any,
    query: string,
    filters: any
    ) => {
  const response = useQuery(
    ["clients", page, query, filters],
    () => {
      dispatch({type: "loading"})
      if (query !== '') {
        return searchClients(query)
      }
      // const url = Object.keys(filters).map(e => `${e}=${filters[e]}&`).join('')
      const url = ''
      return fetchClients(page)
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




