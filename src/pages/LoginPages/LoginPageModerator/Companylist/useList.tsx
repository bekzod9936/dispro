import { useQuery } from "react-query";
import { fetchPartnerCompanies } from "services/queries/partnerQuery";

const useList = () => {
  const { data, isLoading, refetch, isFetching } = useQuery(
    "ListCompany",
    () => fetchPartnerCompanies(),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  return { data, isLoading, refetch, isFetching };
};

export default useList;
