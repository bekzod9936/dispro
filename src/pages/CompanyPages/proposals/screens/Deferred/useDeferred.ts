import { useQuery } from "react-query"
import { fetchDeferred } from "services/queries/ProposalsQueries"
import { setDeferred } from "services/redux/Slices/proposals/proposals"

export const useDeferred = ({dispatch, query}: any) => {
    const {isLoading} = useQuery(["fetchDeferred", query], () => fetchDeferred(query), {
        refetchOnWindowFocus: false,
        retry: 0,
        onSuccess: (data) => {
            dispatch(setDeferred(data.data.data))
            
        }
    })
    return { isLoading }
}