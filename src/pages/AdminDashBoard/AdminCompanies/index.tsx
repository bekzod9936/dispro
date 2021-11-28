import { useState } from "react";
import { useQuery } from "react-query";
import adminInterceptor from "services/interceptors/moderator_interceptor";
import {
  fetchCompanies,
  fetchCompanyStatus,
} from "services/queries/adminQueries";
import { URL } from "services/constants/config";
import useData from "./hooks/useData";
import { SpinnerDiv } from "pages/CompanyPages/news/style";
import Spinner from "components/Helpers/Spinner";
// const authInterceptor = axios.create({
//   baseURL: URL,
//   headers: {
//     Authorization: "Bearer " + localStorage.getItem("moderator_access_token"),
//     langId: 1,
//     vers: VERSION,
//   },
// });

export const AdminCompanies = () => {
  const { isLoading } = useData();
  const type = "2";
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
    localStorage.setItem("companyToken", response.data.data.accessToken);
  };

  const [proceed, setProceed] = useState(false);
  const response = useQuery(["companies"], () => fetchCompanies(type), {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      setProceed(true);
    },
  });
  const response1 = useQuery(["status"], fetchCompanyStatus, {
    refetchOnWindowFocus: false,
    retry: 0,
    enabled: !!proceed,
    onSuccess: (data) => {},
  });

  if (isLoading) {
    return (
      <SpinnerDiv>
        <Spinner />
      </SpinnerDiv>
    );
  }

  return (
    <div>
      Admin Companies Render
      <div onClick={handleCompanyClick}> Company </div>
    </div>
  );
};

export default AdminCompanies;
