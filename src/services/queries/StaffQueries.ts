import partnerApi from "services/interceptors/companyInterceptor";

//cashiers tab
export const getCashiers = async (page: number, url: string) => {
  const response = await partnerApi(
    `/core/staffs/get/cashiers?page=${page}&perPage=5&${url}`
  );
  return response;
};

export const searchCashiers = async (queryString: string) => {
  const response = await partnerApi(
    `/core/staffs/get/cashiers?perPage=10&key=${queryString}`
  );
  return response;
};

export const deleteSingleCashier = (data: any) => {
  const response = partnerApi.delete(`/core/staffs?ids=[${data}]`);

  return response;
};

export const createCashier = (data: any) => {
  const response = partnerApi.post("/core/staffs/other", data);

  return response;
};

//branches
export const getBranches = () => {
  const response = partnerApi.get(`/directory/stores/`);

  return response;
};

//managers tab

export const getManagers = async (page: number, url: string) => {
  const response = await partnerApi(
    `/core/staffs/get/managers?page=${page}&perPage=5&${url}`
  );
  return response;
};

export const searchManagers = async (queryString: string) => {
  const response = await partnerApi(
    `/core/staffs/get/managers?perPage=10&key=${queryString}`
  );
  return response;
};
