import partnerApi from "services/interceptors/companyInterceptor";

interface Props {
  section?: string;
}

export const fetchClientsData = ({ section }: Props) => {
  const response = partnerApi.get(`partner-stats/${section}`);
  return response;
};
export const fetchClientsChart = async () => {
  const response = await partnerApi.get(
    "/partner-stats/chart-clients?startDate=2021-01-01&endDate=2021-12-31&chartPeriod=1"
  );
  return response;
};
export const fetchPersonalInfo = async (data: any) => {
  const response = await partnerApi(`/core/client/personal-info?clientUserId=${data.clientUserId}&clientId=${data.clientId}&startDate=${data.startDate}&endDate=${data.endDate}`)
  return response
}
export const fetchClients = async (page: number, url: string) => {
  const response = await partnerApi(
    `/core/client/by/company?page=${page}&perPage=5&${url}`
  );
  return response;
};

export const searchClients = async (queryString: string) => {
  const response = await partnerApi(
    `/core/client/by/company?perPage=3&key=${queryString}`
  );
  return response;
};

export const changeVipPercent = async (data: any) => {
  const response = await partnerApi.put("/bonus/personals", data);
  return response;
};
