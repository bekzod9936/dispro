import { useQuery } from "react-query";
import { fetchCoupons } from "services/queries/proposalQuery";
import { setDeferred } from "services/redux/Slices/proposals/proposals";

export const useDeferred = ({ dispatch, query }: any) => {
  const { isFetching, refetch } = useQuery(
    ["fetchDeferred", query],
    () => fetchCoupons(query, 8),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        dispatch(setDeferred(data.data.data));
      },
    }
  );
  return { isFetching, refetch };
};
