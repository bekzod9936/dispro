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
    `/core/client/by/company?perPage=5&key=${queryString}`
  );
  return response;
};

export const changeVipPercent = async (data: any) => {
  const response = await partnerApi.put("/bonus/personals", data);
  return response;
};

export const blockClient = async (data: any) => {
  const response = await partnerApi.put("/core/client/blocked-pl", data);
  return response
}

export const fetchClientTableData = async (path: string, data: any) => {
  return await partnerApi(`/core/client/personal-info/${path}?clientId=${data.id}&startDate=${data.startDate}&endDate=${data.endDate}&page=${data.page}&perPage=10`);
}


export const fetchReferChilds = async (data: any) => {
  let url = "";
  if (data.startDate) {
    url += `&startDate=${data.startDate}`;
  }
  if (data.endDate) {
    url += `&endDate=${data.endDate}`;
  }
  if (data.regDateFrom) {
    url += `&regDateFrom=${data.regDateFrom}`;
  }
  if (data.refDateTo) {
    url += `&regDateTo=${data.regDateTo}`
  }
  if (data.levelNumbers.length) {
    url += `&levelNumbers=[${data.levelNumbers.join("")}]`;
  }
  return await partnerApi(`/core/client/personal-info/refer-childs?clientUserId=${data.id}${url}&perPage=10&page=${data.page}`)
}



export const sendNote = async (data: any) => {
  const response = await partnerApi.put(`/core/client/set-notes`, data)
}

export const fetchQrCode = async () => {
  const response = await partnerApi.post(`/core/ref`, {
    source: "Partner"
  })
  return response

}


export const fetchAllClients = async (url: string) => {
  const response = await partnerApi(`/core/client/by/company?${url}`);
  return response
}