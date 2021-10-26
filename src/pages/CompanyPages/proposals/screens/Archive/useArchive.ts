import { useQuery } from "react-query"
import { fetchCoupons } from "services/queries/ProposalsQueries"

export const useArchive = ({ query, dispatch }: any) => {
    const { isFetching } = useQuery(["fetchArchive", query], () => fetchCoupons(query, 6))
    return { isFetching }
}