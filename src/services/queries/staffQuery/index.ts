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
  const response = await partnerApi.get(
    `/core/staffs/get/managers?page=${page}&perPage=5&${url}`
  );
  return response;
};

export const searchManagers = async (queryString: string) => {
  const response = await partnerApi.get(
    `/core/staffs/get/managers?perPage=10&key=${queryString}`
  );
  return response;
};

//change loyal
export const changeLoyal = async (data: any) => {
  const response = await partnerApi.post(`/bonus/rewards/cashier`, data);

  return response;
};

//role manager

export const getRoleManager = async (id: string | number) => {
  const response = await partnerApi.get(`/core/staffs/permissions/${id}`);

  return response;
};

export const setRoleManager = async (data: any) => {
  const response = await partnerApi.put(
    `/core/staffs/permissions/${data.userId}`,
    {
      permissions: data.permissions,
    }
  );

  return response;
};

export const getPermission = async (userId: any) => {
  const response = await partnerApi.get(
    `/core/staffs/permissions/new/${userId}`
  );

  return response;
};

export const editStaff = async (data: any) => {
  const response = await partnerApi.put(`/core/staffs/${data.id}`, {
    ...data,
  });

  return response;
};

//get staff data
export const getStaffData = async (id: any) => {
  const response = await partnerApi.get(`/core/staffs/get/cashiers/${id}`);

  return response;
};

//reset points

export const resetPoints = async (data: any) => {
  const response = await partnerApi.put("/core/cashier/reset-points", data);

  return response;
};

//point histories

interface Props {
  url: string;
  id: number;
}

export const getPointHistories = async ({ id, url }: Props) => {
  const response = await partnerApi.get(
    `/core/staffs/cashier/point-histories/${id}?${url}`
  );

  return response;
};
