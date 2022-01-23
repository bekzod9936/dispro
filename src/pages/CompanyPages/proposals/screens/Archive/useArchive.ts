import { useQuery } from "react-query";
import { fetchCoupons } from "services/queries/proposalQuery";
import { setArchive } from "services/redux/Slices/proposals/proposals";

export const useArchive = ({ query, dispatch }: any) => {
  const { isFetching, refetch } = useQuery(
    ["fetchArchive", query],
    () => fetchCoupons(query, 6),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        dispatch(setArchive(data.data.data));
      },
    }
  );
  return { isFetching, refetch };
};
