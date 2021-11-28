import { useQuery } from "react-query";
import { getCompanies } from "services/queries/moderatorCompanies";

const useData = () => {
  const { isLoading } = useQuery("adminCompanies", getCompanies, {
    onSuccess: (data) => {
      console.log(data.data, "data companies");
    },
  });

  return { isLoading };
};

export default useData;
