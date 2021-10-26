import { useQuery } from "react-query"
import { fetchCoupons } from "services/queries/ProposalsQueries"
import { setOnSale } from "services/redux/Slices/proposals/proposals"
interface IParams {
    dispatch: any,
    query: string
}
export const useOnSale = ({ dispatch, query }: IParams) => {
    const { isLoading, refetch } = useQuery(["fetchOnSale", query], () => fetchCoupons(query, 2), {
        refetchOnWindowFocus: false,
        retry: 0,
        onSuccess: (data: any) => {
            dispatch(setOnSale(data.data.data))
        }
    })
    return { isLoading, refetch }
}