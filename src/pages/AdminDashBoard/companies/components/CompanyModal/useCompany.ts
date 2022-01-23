import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { PARTNER } from "services/interceptors/partner_interceptor/types";
import { enterMCompany } from "services/queries/adminQueries";

const useCompany = () => {
  const history = useHistory();
  const enterCompany = useMutation((data: any) => enterMCompany(data), {
    onSuccess: (data) => {
      const accessToken = data.data.data.accessToken;
      history.push("/statistics/clients");
      localStorage.setItem(PARTNER.COMPANY_TOKEN, accessToken);
    },
  });

  return {
    enterCompany,
  };
};

export default useCompany;
