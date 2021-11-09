import { useQuery } from "react-query";
import { fetchCoupons } from "services/queries/proposalQuery";
import { setCanceled } from "services/redux/Slices/proposals/proposals";

interface IProps {
  query: string;
  dispatch: any;
}
export const useCanceled = ({ query, dispatch }: IProps) => {
  const { refetch, isFetching } = useQuery(
    ["fetchCanceled", query],
    () => fetchCoupons(query, 7),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data: any) => {
        dispatch(setCanceled(data.data.data));
      },
    }
  );
  return { isFetching, refetch };
};
