import moment from 'moment';
import adminInterceptor from '../interceptors/adminInterceptor';
import partnerApi from '../interceptors/companyInterceptor';
import { URL } from '../constants/config';

export const fetchClientStatistics = async (
  section: string,
  gender?: 'male' | 'female' | '',
  purchaseFrom?: number,
  purchaseTo?: number,
  purchaseCost?: number,
  status?: string,
  traffic_provider?: string,
  endDate?: any,
  fromDate?: any,
  startDateUpper?: any,
  endDateUpper?: any
) => {
  const query = [];
  if (gender) {
    query.push(
      `genderTypeId=${gender === 'male' ? 1 : gender === 'female' ? 2 : null}`
    );
  }
  if (purchaseFrom) {
    query.push(`purchaseCountFrom=${purchaseFrom}`);
  }
  if (purchaseTo) {
    query.push(`purchaseCountTo=${purchaseTo}`);
  }
  if (purchaseCost) {
    query.push(`allPurchaseSum=${purchaseCost}`);
  }
  if (endDate) {
    query.push(`regDateTo=${moment(endDate).format('YYYY-MM-DD')}`);
  }
  if (fromDate) {
    query.push(`regDateFrom=${moment(fromDate).format('YYYY-MM-DD')}`);
  }
  if (startDateUpper) {
    query.push(`startDate=${moment(startDateUpper).format('YYYY-MM-DD')}`);
  }
  if (endDateUpper) {
    query.push(`endDate=${moment(endDateUpper).format('YYYY-MM-DD')}`);
  }

  const response = await partnerApi.get(
    `partner-stats/${section}${
      query.length === 1
        ? `?${query[0]}`
        : query.length > 1
        ? `?${query.join('&')}`
        : ''
    }`
  );
  return response;
};

export const fetchClients = async (page: number, start: any, end: any) => {
  const query = [];
  if (start) {
    query.push(`&startDate=${moment(start).format('YYYY-MM-DD')}`);
  }
  if (end) {
    query.push(`&endDate=${moment(end).format('YYYY-MM-DD')}`);
  }
  let combined = query.join('');
  const response = await partnerApi(
    `/core/client/by/company?page=${page}&perPage=6${combined}`
  );
  return response;
};

export const fetchFeedbacks = async (page: number) => {
  const response = await partnerApi.get(
    `core/cashier/rating-review/?perPage=4&page=${page}`
  );
  return response;
};

export const fetchRatings = async () => {
  const respose = await partnerApi.get('core/cashier/rating-review-avg-sum');
  return respose;
};

export const fetchChatItems = () => {
  const response = partnerApi.get('/core/chat/list-partner-clients');
  return response;
};
export const fetchSingleChatItem = (id: number) => {
  const response = partnerApi.get(
    `/core/chat/history?withUserType=1&withId=${id}&page=1&perPage=30&companyId=10`
  );
  return response;
};

export const fetchPartnerCompanies = () => {
  const response = adminInterceptor.get(`core/staff-companies`);
  return response;
};

interface companyProps {
  companyId: number;
  companyType: number;
}

export const enterCompany = async ({
  companyId,
  companyType,
}: companyProps) => {
  const response = await adminInterceptor.put(
    '/auth/update-token',
    {
      companyId: companyId,
      companyType: companyType,
    },
    {
      baseURL: URL,
    }
  );
  return response;
};

export const createCompany = async (
  companyId: any,
  companyName: any,
  companyType: any,
  countryId: any,
  email: any,
  firstName: any,
  lastName: any
) => {
  const response = await adminInterceptor.post(`/core/staffs/admin`, {
    companyId: companyId,
    companyName: companyName,
    companyType: companyType,
    countryId: countryId,
    email: email,
    firstName: firstName,
    lastName: lastName,
  });
  return response;
};

export const fetchInfo = () => {
  const response = partnerApi.get('directory/company/123');
  return response;
};

export const fetchBonusReferals = () => {
  const response = partnerApi.get('bonus/bonusreferals');
  return response;
};

export const fetchRewards = () => {
  const response = partnerApi.get('/bonus/rewards');
  return response;
};
export const fetchSafeties = () => {
  const response = partnerApi.get('/core/company-safeties');
  return response;
};
export const fetchQRCodes = () => {
  const response = partnerApi.get('/core/ref');
  return response;
};

export const fetchCashback = () => {
  const response = partnerApi.get('/bonus/cashbacks');
  return response;
};

export const fetchDiscount = () => {
  const response = partnerApi.get('/bonus/discounts');
  return response;
};

export const fetchBonusPoints = () => {
  const response = partnerApi.get('/bonus/bonuspoints');
  return response;
};
