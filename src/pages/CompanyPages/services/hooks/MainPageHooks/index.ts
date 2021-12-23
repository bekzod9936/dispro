import { useQuery } from "react-query"
import { ApiServices } from "services/queries/servicesQueries"
import { GET_ITEMS } from "../../constants"

export const useGetItems = () => {

    return useQuery(GET_ITEMS, () => ApiServices.getItems(),
    {
        refetchOnWindowFocus: false,
        retry: 1
    })
}
