import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { setCompaniesM } from "services/atoms/admin_companies";
import { URL } from "services/constants/config";
import adminInterceptor from "services/interceptors/moderator_interceptor";
import { PARTNER } from "services/interceptors/partner_interceptor/types";
import { fetchCompanyStatus } from "services/queries/adminQueries";
import { getCompanies } from "services/queries/moderatorCompanies";

const useData = () => {
  const setCompanies = useSetRecoilState(setCompaniesM);
  const { isLoading } = useQuery("adminCompanies", getCompanies, {
    onSuccess: (data) => {
      console.log(data.data, "data companies");
      setCompanies(data.data.data);
    },
  });

  const handleCompanyClick = async () => {
    const response = await adminInterceptor.put(
      "/auth/update-token",
      {
        companyId: 10,
        companyType: 1,
      },
      {
        baseURL: URL,
      }
    );
    localStorage.setItem(PARTNER.COMPANY_TOKEN, response.data.data.accessToken);
  };

  useQuery(["status"], fetchCompanyStatus, {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      console.log(data.data, "data statuses");
    },
  });
  return { isLoading };
};

export default useData;
