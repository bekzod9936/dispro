import { useQuery } from "react-query";
import { fetchCoupons } from "services/queries/proposalQuery";
import { setOnSale } from "services/redux/Slices/proposals/proposals";
interface IParams {
  dispatch: any;
  query: string;
}
export const useOnSale = ({ dispatch, query }: IParams) => {
  const { isFetching, refetch } = useQuery(
    ["fetchOnSale", query],
    () => fetchCoupons(query, 5),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data: any) => {
        dispatch(setOnSale(data.data.data));
      },
    }
  );
  return { isFetching, refetch };
};
