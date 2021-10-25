import { useQuery } from "react-query"
import { fetchCoupons } from "services/queries/ProposalsQueries"
import { setDrafts } from "services/redux/Slices/proposals/proposals"
interface IProps {
    query: string,
    dispatch: any
}
export const useDrafts = ({ query, dispatch }: IProps) => {
    const { isLoading, isFetching, refetch } = useQuery(["fetchDrafts", query], () => fetchCoupons(query, 1), {
        refetchOnWindowFocus: false,
        retry: 0,
        onSuccess: (data) => {
            dispatch(setDrafts(data.data.data))
        }
    })
    return { isLoading, refetch, isFetching }
}